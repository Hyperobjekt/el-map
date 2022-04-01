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
 * @param layerId
 * @param lonLat
 * @param queryZoom
 * @param coords
 */
function getParser(geoid, layerId, queryZoom, coords) {
  return (res) => {
    const tile = new vt.VectorTile(new Protobuf(res));
    const layer = tile.layers[layerId];
    const centerLayer = tile.layers[`${layerId}-centers`];

    const features = [...Array(layer.length)].fill(null).map((d, i) => {
      return layer.feature(i).toGeoJSON(coords.x, coords.y, queryZoom);
    });
    const centerFeatures = [...Array(centerLayer.length)]
      .fill(null)
      .map((d, i) => {
        return centerLayer.feature(i);
      });

    const matchFeat = features.find((f) => f.properties["GEOID"] === geoid);
    const centerFeat = centerFeatures.find(
      (f) => f.properties["GEOID"] === geoid
    );

    if (matchFeat && centerFeat) {
      matchFeat.properties = {
        ...matchFeat.properties,
        ...centerFeat.properties,
      };
      return processMapFeature(matchFeat, layerId);
    }

    return {};
  };
}

/**
 * Processes the bounding box and properties of a feature returned
 * from the
 * @param layerId
 * @param feature
 */
function processMapFeature(feature, layerId) {
  // Add layer if specified or included on feature (usually on click)
  if (layerId) {
    feature.properties.layerId = layerId;
  } else if (feature["layer"]) {
    feature.properties.layerId = feature["layer"]["id"];
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
 * @param layerId
 * @param lonLat
 */
function getQueryZoom(layerId, lonLat) {
  // Special case for Alaska, which needs much lower zooms
  if (lonLat[1] > 50) {
    switch (layerId) {
      case "states":
        return 2;
      case "counties":
        return 2;
      case "cities":
        return 4;
      default:
        return 8;
    }
  }
  switch (layerId) {
    case "states":
      return 2;
    case "counties":
      return 7;
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
 * Requests a tile based on the provided layer, coordinates, and year
 * @param layerId
 * @param coords
 * @param queryZoom
 * @param year
 */
async function requestTile(layerId, coords, queryZoom, year = "10") {
  const tilesetUrl = year
    ? `${tileBase}/${layerId}-${year}`
    : `${tileBase}/${layerId}`;
  const url = `${tilesetUrl}/${queryZoom}/${coords.x}/${coords.y}.pbf`;
  return fetch(url).then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    return response.arrayBuffer();
  });
}

/**
 * Merges the properties in an array of features
 * @param features an array of features
 */
function mergeFeatureProperties(features) {
  const feat = features.find((f) => f.hasOwnProperty("geometry"));
  for (let i = 1; i < tilesetYears.length; ++i) {
    feat["properties"] = {
      ...feat["properties"],
      ...features[i]["properties"],
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
 * @param multiYear specifies whether to merge multiple year tiles
 */
export async function getTileData({
  geoid,
  lngLat: { lng, lat },
  multiYear = false,
}) {
  const lngLat = [lng, lat];
  const layerId = getLayerFromGEOID(geoid);
  const queryZoom = getQueryZoom(layerId, lngLat);
  const coords = getXYFromLonLat(lngLat, queryZoom);
  const parseTile = getParser(geoid, layerId, queryZoom, coords);
  if (multiYear) {
    const tileRequests = tilesetYears.map((y) => {
      return requestTile(layerId, coords, queryZoom, y).then(parseTile);
    });
    return Promise.all(tileRequests).then((features) => {
      return mergeFeatureProperties(features);
    });
  } else {
    return requestTile(layerId, coords, queryZoom).then(parseTile);
  }
}
