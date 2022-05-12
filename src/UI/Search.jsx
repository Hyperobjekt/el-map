import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Search as SearchIcon } from "../Icons";
import {
  debounce,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AutocompleteStyle from "./Search.style";
import clsx from "clsx";

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

// const SearchInput = ({
//   onChange,
//   handleClear,
//   value,
//   inputParams = {},
//   placeholder = "Search…",
//   icon = <SearchIcon />,
//   ...props
// }) => {
//   // const inputEl = useRef();
//   // const handleClear = (event) => {
//   //   inputEl.current.value = "";
//   //   onClear && onClear(event);
//   //   inputEl.current?.focus();
//   // };
//   // const { InputLabelProps, InputProps, ...rest } = inputParams;
//   return (
//     // <StyledSearchInput {...props}>
//     <StyledSearchInput>
//       <SearchIconWrapper>{icon}</SearchIconWrapper>
//       <StyledInput
//         variant="outlined"
//         placeholder={placeholder}
//         value={value}
//         inputProps={{ "aria-label": "search", ...inputParams }}
//         // InputLabelProps={InputLabelProps}
//         InputProps={{
//           // inputRef: inputEl,
//           // ...inputParams,
//           // ...InputLabelProps,
//           // ...InputProps,
//           // ...rest,
//           endAdornment: !value.length ? null : (
//             <InputAdornment position="end">
//               <IconButton size="small" sx={{ mr: 1 }} onClick={handleClear}>
//                 <Close style={{ fontSize: 16 }} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         onChange={onChange}
//         // {...inputParams}
//       />
//     </StyledSearchInput>
//   );
// };

const Search = ({
  placeholder = "Search...",
  icon = <SearchIcon />,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (e) => setInputValue(e.target.value);
  const handleClear = () => setInputValue("");
  const [results, setResults] = useState([]);

  const validSearchTerm = inputValue.length >= 3;
  const executeSearch = () => {
    // const inputValue = e.target.value
    console.log({ inputValue });
    if (!validSearchTerm) return setResults([]);
    const path = `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${"pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw"}&cachebuster=${Math.floor(
      Date.now()
    )}&types=region,place,address&autocomplete=true&country=US${
      // `&proximity=ip`
      ""
      // viewport.zoom > FULL_FUNCT_ZOOM_THRESHOLD
      //   ? `&proximity=${viewport.longitude},${viewport.latitude}`
      //   : ``
    }`;
    // Get request for autosuggest results.
    fetch(path)
      .then((r) => r.json())
      .then((json) => {
        setResults(json.features);
        console.log({ json });
      });
  }
  const executeSearchDeb = debounce(executeSearch, 200)
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
      value={inputValue ? { place_name: inputValue} : null}
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
                endAdornment:  (
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
