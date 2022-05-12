import React, { useEffect, useMemo, useRef, useState } from "react";
import { csv } from "d3-fetch";
import { styled } from "@mui/material/styles";
import * as JsSearch from "js-search";
import { Search as SearchIcon } from "../Icons";
import { useAppConfig } from "@hyperobjekt/react-dashboard";
import { debounce, IconButton, InputAdornment, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import AutocompleteStyle from "./Search.style";
import clsx from "clsx";
// import useSearchData from "./useSearchData";

const geoTypes = "region,place,address";
// state, county, city, address
const geoPriority = ["region", "county", "place", "address"];
const resultCount = 5;

const parseCounty = ({ GEOID, name, north, south, east, west, lon, lat }) => ({
  id: GEOID,
  place_name: name,
  bbox: [Number(west), Number(south), Number(east), Number(north)],
  center: [Number(lon), Number(lat)],
});

const getTopResults = ({ geocodeResults = [], countyResults = [] }) => {
  const results = [];
  let geoIdx = 0;
  while (results.length <= resultCount && geoIdx < geoPriority.length) {
    const emptySlots = resultCount - results.length;
    const geoType = geoPriority[geoIdx];
    console.log({ results, geoType });
    if (geoType === "county") {
      const topCounties = countyResults.slice(0, emptySlots);
      results.push(...topCounties);
    } else {
      const resultsOfGeotype = geocodeResults.filter(({ place_type }) =>
        place_type.includes(geoType)
      );
      const topResults = resultsOfGeotype.slice(0, emptySlots);
      results.push(...topResults);
    }

    geoIdx++;
  }
  console.log({ results, geoIdx });
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

const Search = ({
  placeholder = "Search...",
  icon = <SearchIcon />,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (e) => setInputValue(e.target.value);
  const handleClear = () => setInputValue("");
  const [results, setResults] = useState([]);
  // const [counties, setCounties] = useState([]);
  const [countySearch, setCountySearch] = useState(null);

  const countiesUrl = useAppConfig("counties_data");
  useEffect(() => {
    csv(countiesUrl, parseCounty).then((counties) => {
      // setCounties(d)

      const searchFn = new JsSearch.Search("id");
      searchFn.addIndex("place_name");
      searchFn.addDocuments(counties);
      setCountySearch(searchFn);
    });
  }, []);
  // console.log({counties })

  const validSearchTerm = inputValue.length >= 3;
  const executeSearch = () => {
    // const inputValue = e.target.value
    console.log({ inputValue });
    if (!validSearchTerm) return setResults([]);
    const path = getPath(inputValue);
    fetch(path)
      .then((r) => r.json())
      .then((json) => {
        // console.log("RESPONSE")
        const geocodeResults = json.features;
        const countyResults =
          (countySearch && countySearch.search(inputValue)) || [];
        // console.log({ geocodeResults, countyResults });
        setResults(getTopResults({ geocodeResults, countyResults }));
      });
  };
  const executeSearchDeb = debounce(executeSearch, 100);
  useEffect(executeSearchDeb, [inputValue]);

  const onSelect = (e) => {
    console.log({ e }, e.target.value);
    // go to
    // select
    // clear results
    // clear input
  };

  // const inputEl = useRef();
  // console.log({inputEl}, inputEl.current?.value)
  return (
    <AutocompleteStyle
      className={clsx(className, "search__root")}
      forcePopupIcon={false}
      value={inputValue ? { place_name: inputValue } : null}
      id="search-autocomplete"
      options={results}
      onSelect={onSelect}
      // ref={inputEl}
      open={validSearchTerm}
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
