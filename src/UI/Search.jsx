import React, { useEffect, useMemo, useRef, useState } from "react";
import { csv } from "d3-fetch";
import { styled } from "@mui/material/styles";
import * as JsSearch from "js-search";
import { Search as SearchIcon } from "../Icons";
import {
  useAppConfig,
  useToggleLocation,
  useAddLocation,
} from "@hyperobjekt/react-dashboard";
import { useMapFlyToBounds, useMapFlyToFeature } from "@hyperobjekt/mapgl";
import { debounce, IconButton, InputAdornment, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import AutocompleteStyle from "./Search.style";
import clsx from "clsx";
import { Box } from "@mui/system";
import useDataMode from "../hooks/useDataMode";
import { getTileData } from "../Data";
// import useSearchData from "./useSearchData";

// minimum typed characters before search executed
const minSearchLength = 3;
// which geocoding location types to include in mapbox search
const geoTypes = "region,place,address";
// these map to:       state,   county,     city,   address
const geoPriority = ["region", "counties", "place", "address"];
const resultCount = 5;

// what geo level should be selected/flown to on search
const searchSelectMap = {
  raw: {
    region: "states",
    counties: "counties",
    place: "cities",
    address: "block-groups",
  },
  modeled: {
    region: "states",
    counties: "counties",
    place: "counties",
    address: "counties",
  },
};

const parseCounty = ({ GEOID, name, north, south, east, west, lon, lat }) => ({
  id: GEOID,
  geoid: GEOID,
  place_name: name,
  place_type: ["counties"],
  bbox: [Number(west), Number(south), Number(east), Number(north)],
  center: [Number(lon), Number(lat)],
});

/**
 * Takes the results from the mapbox geocode search and the county matches from
 * counties.csv and returns an array of the top n to be used as search results.
 *
 * @param geocodeResults array
 * @param countyResults array
 */
const getTopResults = ({ geocodeResults = [], countyResults = [] }) => {
  const results = [];
  let geoIdx = 0;
  while (results.length <= resultCount && geoIdx < geoPriority.length) {
    const emptySlots = resultCount - results.length;
    const geoType = geoPriority[geoIdx];

    const nextResults =
      geoType === "counties"
        ? countyResults
        : geocodeResults.filter(({ place_type }) =>
            place_type.includes(geoType)
          );
    const topResults = nextResults.slice(0, emptySlots);
    results.push(...topResults);

    geoIdx++;
  }
  // console.log({ results, geoIdx });
  return results;
};

// TODO: extract mbt
// could use proximity=ip or proximity=${viewport.longitude},${viewport.latitude}
const getPath = (inputValue) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${"pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw"}&cachebuster=${Math.floor(
    Date.now()
  )}&types=${geoTypes}&autocomplete=true&country=US`;

const StyledSearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5, 0, 2),
  color: theme.palette.primary.main,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  height: "100%",
  // "& .MuiInputBase-root": {
  //   color: "inherit",
  //   width: "100%",
  //   height: "100%",
  // },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 4, 1, 0),
    // vertical padding + font size from searchIcon
    marginLeft: theme.spacing(3),
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
  },
}));

/*
 * search input with autocomplete for results
 * finds matches through mapbox geocoding endpoint
 * as well as matches to our own counties.csv
 */
const Search = ({
  placeholder = "Search...",
  flyTo = true,
  icon = <SearchIcon />,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (e) => setInputValue(e.target.value);
  const handleClear = () => setInputValue("");

  const [results, setResults] = useState([]);
  // const [counties, setCounties] = useState([]);
  // indexed search fn to use to find county matches when user types
  const [countySearchFn, setCountySearchFn] = useState(null);

  const [dataMode] = useDataMode();
  const addLocation = useAddLocation();
  const flyToBounds = useMapFlyToBounds();
  const flyToFeature = useMapFlyToFeature();
  const countiesUrl = useAppConfig("counties_data");
  // get all county info on load, save as indexed search fn
  useEffect(() => {
    csv(countiesUrl, parseCounty).then((counties) => {
      const searchFn = new JsSearch.Search("id");
      // index all counties by place name
      searchFn.addIndex("place_name");
      searchFn.addDocuments(counties);
      setCountySearchFn(searchFn);
    });
  }, []);

  const validSearchTerm = inputValue.length >= minSearchLength;
  // execute geocode search, and integrate county results
  const executeSearch = () => {
    // console.log({ inputValue });
    if (!validSearchTerm) return setResults([]);
    const geocodeUrl = getPath(inputValue);
    // if (inputValue.length > 5) debugger;
    fetch(geocodeUrl)
      .then((r) => r.json())
      .then((json) => {
        // console.log("RESPONSE")
        const geocodeResults = json.features;
        // get county results as well
        const countyResults =
          (countySearchFn && countySearchFn.search(inputValue)) || [];
        // console.log({ geocodeResults, countyResults });
        // set results to a combination of the 2 sources
        setResults(getTopResults({ geocodeResults, countyResults }));
      });
  };
  const executeSearchDeb = debounce(executeSearch, 100);
  useEffect(executeSearchDeb, [inputValue]);

  const onSelect = (e, option) => {
    // clear input and results
    handleClear();
    setResults([]);

    const { geoid, center, place_type, place_name } = option;
    // NOTE: for states, need name to find a match in the tiles
    // Also needed for certain small towns where geocoding "center" not contained by tile geom bbox
    // TODO: remove when we add NESW to state tile features?
    const name = place_name.split(",")[0].toLowerCase();

    const forceRegion = searchSelectMap[dataMode][place_type[0]];
    // console.log("SELECTED", { name, option, geoid, center, place_type, forceRegion });
    getTileData({
      geoid,
      lngLat: { lng: center[0], lat: center[1] },
      dataMode,
      forceRegion,
      name,
    })
      .then((feature) => {
        if (!feature.type) {
          console.warn("No feature found in search");
          // TODO: display warning notification
          return;
        }
        feature && addLocation(feature);
        console.log({ feature });
        if (!flyTo) return;

        // TODO: remove when we add NESW to state tile features
        const bbox =
          feature?.bbox?.length === 4 && isFinite(feature.bbox[0])
            ? feature.bbox
            : option?.bbox?.length === 4 && isFinite(option.bbox[0])
            ? option.bbox
            : null;
        if (bbox) {
          if (option?.bbox?.length) console.log("?", option.bbox, { option, feature})
          const bounds = [
            [bbox[0], bbox[1]],
            [bbox[2], bbox[3]],
          ];
          return flyToBounds(bounds);
        } else flyToFeature(option);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  // const inputEl = useRef();
  // console.log({inputEl}, inputEl.current?.value)
  return (
    <AutocompleteStyle
      className={clsx(className, "search__root")}
      isOptionEqualToValue={() => false}
      autoHighlight={true}
      forcePopupIcon={false}
      value={inputValue ? { place_name: inputValue } : null}
      // value={inputValue}
      id="search-autocomplete"
      options={results}
      onChange={onSelect}
      // onSelect={onSelect}
      // ref={inputEl}
      open={validSearchTerm}
      // if we need to replicate the default rendering and add handlers:
      // renderOption={(props, option, state) => {
      //   console.log({ props, option, state });
      //   const {
      //     key,
      //     "data-option-index": idx,
      //     className,
      //     id,
      //     onMouseOver,
      //   } = props;
      //   return (
      //     <li
      //       onMouseOver={onMouseOver}
      //       id={id}
      //       onClick={e => console.log({e})}
      //       className={className}
      //       data-option-index={idx}
      //       key={key}
      //       tabIndex={-1}
      //       role="option"
      //     >
      //       {key}
      //     </li>
      //   );
      // }}
      getOptionLabel={(option) => option.place_name}
      renderInput={({ inputProps, InputProps, InputLabelProps, ...params }) => {
        const { ref, ...restInputProps } = InputProps;
        // console.log({ref, inputEl}, ref.current?.value, inputEl.current?.value)
        return (
          <StyledSearchInput ref={ref} className="search__input-wrapper">
            <SearchIconWrapper>{icon}</SearchIconWrapper>
            <StyledInput
              className="search__input"
              variant="outlined"
              placeholder={placeholder}
              onChange={onChange}
              onBlur={handleClear}
              // value={inputValue}
              inputProps={{
                ...inputProps,
                "aria-label": "search",
              }}
              InputLabelProps={InputLabelProps}
              InputProps={{
                ...restInputProps,
                endAdornment: !!inputValue.length && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={handleClear}
                    >
                      <Close style={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </StyledSearchInput>
        );
      }}
    />
  );
};

export default Search;
