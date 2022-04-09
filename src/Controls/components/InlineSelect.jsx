import React from "react";
import { visuallyHidden } from "@mui/utils";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { BOLD_FONT_FAMILY } from "../../theme";

const StyledSelect = styled(Select)(({ theme }) => ({
  margin: 0,
  padding: 0,
  "&:before, &:after, &:hover:before, &:hover:after": {
    borderWidth: 0,
  },
  "& > .MuiSelect-select": {
    fontFamily: BOLD_FONT_FAMILY,
    padding: theme.spacing(0, 0, 0, 0),
    paddingRight: `${theme.spacing(2)}!important`,
  },
  "& .MuiSelect-icon": {
    right: 0,
    top: `calc(50% - 0.15em)`,
    width: 10,
  },
  "& > fieldset": { display: "none" },
}));

const InlineSelect = ({ id, label, options, value, onChange, ...props }) => {
  const availableOptions = options.filter((option) => !option.unavailable);
  return (
    <FormControl {...props}>
      <InputLabel sx={visuallyHidden} id={`${id}-label`}>
        {label}
      </InputLabel>
      <StyledSelect
        // className="select select--inline"
        // variant="standard"
        labelId={`${id}-label`}
        id={id}
        value={value}
        onChange={onChange}
      >
        {availableOptions.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default InlineSelect;
