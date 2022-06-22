import React from 'react';
import { Layer, Source } from 'react-map-gl';

const STATE_SOURCE = {
  id: 'us-states-10',
  type: 'vector',
  maxzoom: 10,
  tiles: ['https://tiles.evictionlab.org/2018-12-14/evictions-states-10/{z}/{x}/{y}.pbf'],
  attribution: '',
};

// Outline of states
const STATE_OUTLINE = {
  id: 'boundary_state',
  type: 'line',
  source: 'us-states-10',
  'source-layer': 'states',
  layout: {
    'line-cap': 'round',
    'line-join': 'bevel',
    visibility: 'visible',
  },
  paint: {
    'line-color': 'rgba(248, 153, 156, 1)',
    'line-width': {
      stops: [
        [3, 1],
        [7, 2],
      ],
    },
    'line-blur': 0.4,
    'line-opacity': 0.8,
  },
};

/**
 * Renders the city labels layer on the map
 * @returns
 */
const StateOutlineLayer = () => {
  return (
    <Source {...STATE_SOURCE}>
      <Layer {...STATE_OUTLINE} beforeId="settlement-subdivision-label" />
    </Source>
  );
};

export default StateOutlineLayer;
