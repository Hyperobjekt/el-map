import SphericalMercator from "@mapbox/sphericalmercator";
import * as vt from "@mapbox/vector-tile";
import Protobuf from "pbf";

const mercator = new SphericalMercator({ size: 256 });
const tileBase = "https://tiles.evictionlab.org/v2/modelled";
const tilePrefix = "evictions-";
const tilesetYears = ["00", "10"];

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
 * @param geoid
 * @param region
 * @param z
 * @param x
 * @param y
 */
function getParser(geoid, region, z, x, y) {
  return (res) => {
    // process the vector tile response
    const tile = new vt.VectorTile(new Protobuf(res));

    // get the choropleth feature
    const layer = tile.layers[region];
    const features = [...Array(layer.length)].fill(null).map((d, i) => {
      return layer.feature(i).toGeoJSON(x, y, z);
    });
    const matchFeat = features.find((f) => f.properties["GEOID"] === geoid);

    // get the center point feature
    const centerLayer = tile.layers[`${region}-centers`];
    const centerFeatures = [...Array(centerLayer.length)]
      .fill(null)
      .map((d, i) => {
        return centerLayer.feature(i);
      });
    const centerFeat = centerFeatures.find(
      (f) => f.properties["GEOID"] === geoid
    );
    // merge the properties of the center feature and choropleth feature
    if (matchFeat && centerFeat) {
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
function getLayerFromGEOID(geoid) {
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
  return feat;
}

/**
 * Takes the GEOID and coordinates for an object, determines which
 * tile to request, parses it, and then returns the first feature
 * with the given GEOID
 *
 * @param geoid of the feature to query
 * @param lonLat array of [lon, lat]
 * @param dataMode either "raw" or "modelled"
 */
export async function getTileData({
  geoid,
  lngLat: { lng, lat },
  dataMode = "raw",
}) {
  const lngLat = [lng, lat];
  const region = getLayerFromGEOID(geoid);
  const z = getQueryZoom(region, lngLat);
  const { x, y } = getXYFromLonLat(lngLat, z);
  const parseTile = getParser(geoid, region, z, x, y);
  const tileRequests = tilesetYears.map((year) => {
    const url = getTileUrl({ region, x, y, z, year, dataMode });
    return fetchTile(url).then(parseTile);
  });
  return Promise.all(tileRequests).then((features) => {
    return mergeFeatureProperties(features);
  });
}
