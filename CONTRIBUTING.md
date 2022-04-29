# Contributing to EL 2.0 Map

This app uses [Vite](https://vitejs.dev/) for front end tooling. To start the development environment:

- clone this repo
- run `yarn install`
- run `yarn dev`

## Terminology

The following terms are used within this app:

- **Data Mode**: The term data mode refers to one of two data views within the app, modeled data and raw data.
- **Modeled Data**: This is the default dataset (or data mode). It contains "Eviction Filings" and "Households Threatened" data metrics for States and Counties that are based on mathematical models.
- **Raw Data Mode**: This is the secondary dataset (or data mode). It contains "Eviction Filings" and "Eviction Judgments" data metrics for States, Counties, Cities, Tracts, and Block Groups.
- **Context**: Context within the app often refers to the current user selections in the app, including the current metric ID(s), region, and year.

## Practices

### Styling

- re-usable base component styles like buttons, typography, select menus, etc. should be styled in the theme file (`src/theme`) so they display consistently across the app.
  - see [theme.js](https://github.com/Hyperobjekt/el-map/blob/development/src/theme.js) for example of style overrides
- components requiring minor style adjustments can be styled using the [`sx` prop](https://mui.com/system/the-sx-prop/). this is not advised if there are several style adjustments required to prevent polluting the JSX with props. see the below option for these cases.
- components needing a higher degree of customization should use a separare `{{component}}.style.js` file. The file should contain a root element and child element styles via class name, following [BEM naming conventions](http://getbem.com/naming/).
  - see [MapLegend.jsx](https://github.com/Hyperobjekt/el-map/blob/development/src/Map/components/MapLegend.jsx) and [MapLegend.style.js](https://github.com/Hyperobjekt/el-map/blob/development/src/Map/components/MapLegend.style.js) for an example.

## App Configuration

The app uses @hyperobjekt/react-dashboard to handle configuration. You pass it some configuration JSON and it provides some hooks to help you build the app.

There are a few configuration JSON files in `src/Config`:

- `base.json`: this is the configuration that is common between "raw" and "modelled" data. It contains app-wide settings and default options as well as language configuration.
- `modeled.json`: this is the configuration for metrics, map sources, map layers, and data scales within the modeled data mode.
- `raw.json`: this is the configuration for metrics, map sources, map layers, and data scales within the raw data mode.

### App Data

All data for the app is managed through static assets, which include:

- Vector tilesets
  - Tilesets are generated via [ETL repo](https://github.com/EvictionLab/map-v2-etl) and hosted on S3 with CloudFront.
  - Data is split between tilesets for optimization. Each region is split into two tilesets, one for 2000-2009 data and one for 2010-2019 data. Total of 14 tilesets (5 raw regions + 2 modeled regions).
  - Each data point is represented by the metric id followed by a hyphen and the two digit year for the value (e.g. `ef-01` for eviction filings in 2001)
- Static CSV files
  - one file for national data for line chart and national average comparisons ([national.csv](https://s3.amazonaws.com/eviction-lab-tool-data/data/us/national.csv))
  - one file for each region for each dataset that contains metadata for each metric (min, max, lowest 1% value, top 99% value). these values are used to determine the low / high end of the scale and also to flag potential outliers. (example: [counties-extents.csv](https://evictionlab.org/data/v2/modeled/extents/counties-extents.csv))
  - a counties file containing metadata needed for search ([counties.csv](https://s3.amazonaws.com/eviction-lab-tool-data/data/search/counties.csv))

### @hyperobjekt/react-dashboard Hooks + Functions

There are several hooks provided by @hyperobjekt/react-dashboard. See the API documentation for the specific modules for more hook usage:

- [i18n](https://github.com/Hyperobjekt/react-dashboard/blob/development/src/i18n/API.md)
- [Formatters](https://github.com/Hyperobjekt/react-dashboard/blob/development/src/Formatters/API.md)
- [Locations](https://github.com/Hyperobjekt/react-dashboard/blob/development/src/Locations/API.md)
- [Router](https://github.com/Hyperobjekt/react-dashboard/blob/development/src/Router/API.md)
- [hooks](https://github.com/Hyperobjekt/react-dashboard/tree/development/src/hooks)

The most common you will use include:

#### [useLang()](https://github.com/Hyperobjekt/react-dashboard/blob/development/src/i18n/API.md#uselangkeys-context--string--arraystring)

Retrieves a single key or multiple keys from the language config (`base.json`). Any values passed as a secondary argument will be interpolated into the string.

```jsx
import { useLang } from "@hyperobjekt/react-dashboard";

// LANGUAGE CONFIG:
// {
//   "MY_STRING": "My string",
//   "FIRST_LABEL": "First label",
//   "SECOND_LABEL": "Second Label",
//   "DYNAMIC_STRING": "Hello {{value}}!"
// }

const MyComponent = () => {
  const myString = useLang("MY_STRING"); // "My string"
  const multipleStrings = useLang("FIRST_LABEL", "SECOND_LABEL"); // ["First label", "Second Label"]
  const dynamicString = useLang("DYNAMIC_STRING", { value: "world" }); // hello world!
};
```

#### `useBubbleContext()` / `useChoroplethContext()`

These hooks retrieve current selections in the app. The context is passed to additional hooks like `useAccessor`, `useChoroplethScale`, and `useBubbleScale`.

```jsx
import {
  useBubbleContext,
  useChoroplethContext,
} from "@hyperobjekt/react-dashboard";

const MyComponent = () => {
  const bubbleContext = useBubbleContext();
  // bubbleContext = { metric_id: "er", region_id: "counties", year: "2016" }
  const choroplethContext = useBubbleContext();
  // bubbleContext = { metric_id: "p", region_id: "counties", year: "2016" }
};
```

#### `useAccessor()`

Provides a function that takes a context and returns a variable name that reflects the given context.

```jsx
import { useAccessor } from "@hyperobjekt/react-dashboard";
const MyComponent = () => {
  const accessor = useAccessor();
  const varName = accessor({ metric_id: "er", year: "2016" });
  // varName = "er-16"
};
```
