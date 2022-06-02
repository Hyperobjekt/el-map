import { Autocomplete, styled } from "@mui/material";
import theme from "../theme";

const AutocompleteStyle = styled(Autocomplete)`
  width: 100%;
  .search__input-wrapper .MuiInputBase-root {
    padding-right: 0;
  }
`;

export default AutocompleteStyle;
