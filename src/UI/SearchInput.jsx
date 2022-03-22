import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import { Search as SearchIcon } from "../Icons";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
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
  "& .MuiInputBase-root": {
    color: "inherit",
    width: "100%",
    height: "100%",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: theme.spacing(5.5),
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
  },
}));

export const SearchInput = ({
  onChange,
  onClear,
  InputProps = {},
  placeholder = "Search…",
  icon = <SearchIcon />,
  ...props
}) => {
  const inputEl = useRef();
  const handleClear = (event) => {
    inputEl.current.value = "";
    onClear && onClear(event);
    inputEl.current?.focus();
  };
  return (
    <Search {...props}>
      <SearchIconWrapper>{icon}</SearchIconWrapper>
      <StyledInput
        variant="outlined"
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        InputProps={{
          inputRef: inputEl,
          endAdornment: inputEl?.current?.value && (
            <InputAdornment position="end">
              <IconButton size="small" sx={{ mr: 1 }} onClick={handleClear}>
                <Close style={{ fontSize: 16 }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={onChange}
        {...InputProps}
      />
    </Search>
  );
};

export default SearchInput;
