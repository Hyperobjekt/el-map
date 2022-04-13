import React from "react";
import { visuallyHidden } from "@mui/utils";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Tooltip,
  Typography,
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

const InlineSelect = ({
  id,
  label,
  options,
  hint,
  value,
  onChange,
  children,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <InputLabel sx={visuallyHidden} id={`${id}-label`}>
        {label}
      </InputLabel>
      <Tooltip open={Boolean(hint)} title={hint || ""} arrow placement="top">
        <StyledSelect
          id={id}
          labelId={`${id}-label`}
          label={label}
          value={value}
          onChange={onChange}
        >
          {options.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
          {children}
        </StyledSelect>
      </Tooltip>
    </FormControl>
  );
};

export default InlineSelect;
