import SphericalMercator from "@mapbox/sphericalmercator";
import * as vt from "@mapbox/vector-tile";
import Protobuf from "pbf";
import pointInPolygon from "@turf/boolean-point-in-polygon";

const mercator = new SphericalMercator({ size: 256 });
const tilesetYears = ["00", "10"];

const featureContainsPoint = ({ feature, point }) => {
  const polygon = feature?.geometry;
  // console.log({ feature, polygon, point });
  if (!polygon || !point) return false;
  const contains = pointInPolygon(point, polygon);
  // console.log({ contains, polygon });
  return contains;
};

const boxContainsPoint = ({ north, east, south, west, lng, lat }) =>
  lng >= west && lng <= east && lat <= north && lat >= south;

/**
 * Get the X/Y coords based on lonLat
 * @param lonLat
 * @param queryZoom
 */
function getXYFromLonLat(lonLat, queryZoom) {
  const xyzCoords = mercator.xyz(
    [lonLat[0], lonLat[1], lonLat[0], lonLat[1]],
    queryZoom
  );
  return {
    x: Math.floor((xyzCoords.maxX + xyzCoords.minX) / 2),
    y: Math.floor((xyzCoords.maxY + xyzCoords.minY) / 2),
  };
}

/**
 * Returns a function to parse the tile response from the tile HTTP request
 * @param geoid optional - if not provided (geosearch), find based on lng/lat
 * @param region
 * @param z
 * @param x
 * @param y
 * @param lng optional
 * @param lat optional
 */
function getParser({ geoid, region, z, x, y, lng, lat }) {
  return (res) => {
    // process the vector tile response
    const tile = new vt.VectorTile(new Protobuf(res));

    // get the choropleth feature
    const layer = tile.layers[region];

    if (!layer) {
      console.log("No layer found for ", geoid);
      return {};
    }

    // convert to array
    const features = [...Array(layer.length)].fill(null).map((d, i) => {
      return layer.feature(i).toGeoJSON(x, y, z);
    });

    const matchFeat =
      // try to find by geoid if we have it
      (!!geoid && features.find((f) => f.properties["GEOID"] === geoid)) ||
      // if not, find feature that contains the point
      features.find((feature) =>
        featureContainsPoint({ feature, point: [lng, lat] })
      ) ||
      // if geometries don't quite align, last resort find f whose bbox contains point
      features.find((f) => boxContainsPoint({ ...f.properties, lng, lat }));

    if (!matchFeat) return {};

    // console.log({ geoid, region, z, x, y, lng, lat });
    // now that we've found the matching feature, use its geoid
    geoid = geoid || matchFeat.properties.GEOID;
    // console.log({ geoid, matchFeat });

    // get the center point feature
    const centerLayer = tile.layers[`${region}-centers`];
    let centerFeat = {};
    if (centerLayer) {
      const centerFeatures = [...Array(centerLayer.length)]
        .fill(null)
        .map((d, i) => {
          return centerLayer.feature(i);
        });
      centerFeat =
        centerFeatures.find((f) => f.properties["GEOID"] === geoid) || {};
    } else {
      console.log("no center feat found for ", geoid);
    }
    // merge the properties of the center feature and choropleth feature
    if (matchFeat && centerFeat) {
      // TODO: do we need the centerFeat at all? causes bug if center not visible
      // if (matchFeat) {
      matchFeat.properties = {
        ...matchFeat.properties,
        ...centerFeat.properties,
      };
      return processMapFeature(matchFeat, region);
    }

    return {};
  };
}

/**
 * Processes the bounding box and properties of a feature returned
 * from the
 * @param region
 * @param feature
 */
function processMapFeature(feature, region) {
  // Add layer if specified or included on feature (usually on click)
  if (region) {
    feature.properties.region = region;
  } else if (feature["layer"]) {
    feature.properties.region = feature["layer"]["id"];
  }
  // Add bounding box
  feature.bbox = [
    +feature.properties["west"],
    +feature.properties["south"],
    +feature.properties["east"],
    +feature.properties["north"],
  ];
  // Add evictions-per-day property
  Object.keys(feature.properties)
    .filter((p) => p.startsWith("e-"))
    .forEach((p) => {
      const evictions = +feature.properties[p];
      const yearSuffix = p.split("-").slice(1)[0];
      const daysInYear = +yearSuffix % 4 === 0 ? 366 : 365;
      const evictionsPerDay =
        evictions > 0 ? +(evictions / daysInYear).toFixed(2) : -1;
      feature.properties[`epd-${yearSuffix}`] = evictionsPerDay;
    });
  return feature;
}

/**
 * Get the query zoom level depending on the layer and location
 * @param region
 * @param lonLat
 */
function getQueryZoom(region, lonLat) {
  // Special case for Alaska, which needs much lower zooms
  if (lonLat[1] > 50) {
    switch (region) {
      case "states":
        return 2;
      case "counties":
        return 4;
      case "cities":
        return 5;
      default:
        return 8;
    }
  }
  switch (region) {
    case "states":
      return 2;
    case "counties":
      return 5;
    case "cities":
      return 7;
    default:
      return 9;
  }
}

/** Gets the layer name based on the GEOID length */
export function getLayerFromGEOID(geoid) {
  const geoidLayerMap = {
    2: "states",
    5: "counties",
    7: "cities",
    11: "tracts",
    12: "block-groups",
  };
  return geoidLayerMap[geoid.length];
}

/**
 * fetches a tile from a URL and returns a promise
 * @param url
 */
async function fetchTile(url) {
  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    return response.arrayBuffer();
  });
}

/**
 * Gets the tile URL based on the provided params
 * @returns {string}
 */
function getTileUrl({
  baseUrl = "https://tiles.evictionlab.org/v2",
  region,
  x,
  y,
  z,
  year,
  dataMode = "raw",
}) {
  return `${baseUrl}/${dataMode}/${region}-${year}/${z}/${x}/${y}.pbf`;
}

/**
 * Merges the properties in an array of features
 * @param features an array of features
 */
function mergeFeatureProperties(features) {
  const feat = features.find((f) => f.hasOwnProperty("geometry"));
  if (!feat) {
    console.warn("no features returned from tile query");
    return { properties: {} };
  }
  for (let i = 1; i < tilesetYears.length; ++i) {
    const mergeProps = features[i]?.properties;
    feat["properties"] = {
      ...feat["properties"],
      ...mergeProps,
    };
  }
  // console.log({ feat });
  return feat;
}

/**
 * Takes the GEOID and coordinates for an object, determines which
 * tile to request, parses it, and then returns the first feature
 * with the given GEOID
 *
 * @param geoid of the feature to query (optional - otherwise use forceRegion)
 * @param lonLat array of [lon, lat]
 * @param dataMode either "raw" or "modeled"
 * @param forceRegion optional, for modeled data we select parent region
 */
export async function getTileData({
  geoid,
  lngLat: { lng, lat },
  dataMode = "raw",
  forceRegion,
}) {
  // TODO: use consistent spelling of "modeled"
  // sorry, i used the canadian spelling in some cases 😬
  if (dataMode === "modelled") dataMode = "modeled";
  const lngLat = [lng, lat];
  const region = forceRegion || getLayerFromGEOID(geoid);
  const z = getQueryZoom(region, lngLat);
  const { x, y } = getXYFromLonLat(lngLat, z);
  // console.log({ x, y, z, region, lngLat });
  const parseTile = getParser({
    geoid,
    region,
    z,
    x,
    y,
    lng,
    lat,
  });
  const tileRequests = tilesetYears.map((year) => {
    const url = getTileUrl({ region, x, y, z, year, dataMode });
    return fetchTile(url).then(parseTile);
  });
  return Promise.all(tileRequests).then((features) => {
    return mergeFeatureProperties(features);
  });
}

// TODO: delete
// // keep in sync with flagConfigs in map-v2-etl flagHelpers.js
// const flagConfigs = [];

// function mergeFlags({ parsedTile, countyTile, z, x, y }) {
//   // const years = useAppConfig("years");
//   console.log("SUHHH", { countyTile });
//   if (!parsedTile?.properties?.GEOID) {
//     console.log("NOPE");
//     return parsedTile;
//   }
//   const parseCountyTile = getParser({
//     // interested in containing county
//     region: "counties",
//     // first 5 digits of tract/bg GEOID is the county
//     geoid: parsedTile.properties.GEOID.slice(0, 5),
//     z,
//     x,
//     y,
//   });
//   const parsedCountyTile = parseCountyTile(countyTile);
//   const flagConfigs = getConfigSetting("flagConfigs");
//   console.log({ parsedCountyTile, flagConfigs });

//   return parsedTile;
// }

// /**
//  * Takes the GEOID and coordinates for an object, determines which
//  * tile to request, parses it, and then returns the first feature
//  * with the given GEOID
//  *
//  * @param geoid of the feature to query (optional - otherwise use forceRegion)
//  * @param lonLat array of [lon, lat]
//  * @param dataMode either "raw" or "modeled"
//  * @param forceRegion optional, for modeled data we select parent region
//  * TODO: add east,west,south,north to state tiles
//  * @param name optional last resort to find matching feature for states
//  */
// export async function getTileData({
//   geoid,
//   lngLat: { lng, lat },
//   dataMode = "raw",
//   forceRegion,
//   includeFlags = true,
//   name,
// }) {
//   // TODO: use consistent spelling of "modeled"
//   // sorry, i used the canadian spelling in some cases 😬
//   if (dataMode === "modelled") dataMode = "modeled";
//   const lngLat = [lng, lat];
//   const region = forceRegion || getLayerFromGEOID(geoid);
//   const z = getQueryZoom(region, lngLat);
//   const { x, y } = getXYFromLonLat(lngLat, z);
//   // console.log({ x, y, z, region, lngLat });
//   const parseTile = getParser({
//     geoid,
//     region,
//     z,
//     x,
//     y,
//     lng,
//     lat,
//     name,
//   });
//   const tileRequests = tilesetYears.map((year) => {
//     const url = getTileUrl({ region, x, y, z, year, dataMode });
//     return fetchTile(url).then((fetchedTile) => {
//       console.log({ fetchedTile });
//       const parsedTile = parseTile(fetchedTile);
//       // all flags are stored on county tiles, needed also by contained:
//       const needsParentFlags = ["block-groups", "tracts"].includes(region);
//       console.log({ parsedTile, region, needsParentFlags });
//       if (!includeFlags || !needsParentFlags) return parsedTile;

//       const countyUrl = getTileUrl({
//         region: "counties",
//         x,
//         y,
//         z,
//         year,
//         dataMode,
//       });
//       return fetchTile(countyUrl).then((fetchedCountyTile) => {
//         console.log({ fetchedCountyTile });
//         return mergeFlags({
//           countyTile: fetchedCountyTile,
//           parsedTile,
//           z,
//           x,
//           y,
//         });
//       });
//     });
//   });
//   // const countyRequests = !includeFlags ? [] : tilesetYears.map((year) => {
//   //   const url = getTileUrl({ region: "counties", x, y, z, year, dataMode });
//   //   return fetchTile(url).then(parseTile);
//   // });
//   return Promise.all(tileRequests).then((features) => {
//     return mergeFeatureProperties(features);
//   });
// }
