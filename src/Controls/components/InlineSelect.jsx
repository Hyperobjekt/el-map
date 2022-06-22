import React from 'react';
import { visuallyHidden } from '@mui/utils';
import { FormControl, InputLabel, MenuItem, Select, styled, Tooltip } from '@mui/material';
import { BOLD_FONT_FAMILY } from '../../theme';

const StyledSelect = styled(Select)(({ theme }) => ({
  margin: 0,
  padding: 0,
  '&:before, &:after, &:hover:before, &:hover:after': {
    borderWidth: 0,
  },
  '& > .MuiSelect-select': {
    fontFamily: BOLD_FONT_FAMILY,
    padding: theme.spacing(0, 0, 0, 0),
    paddingRight: `${theme.spacing(2)}!important`,
  },
  '& .MuiSelect-icon': {
    right: 0,
    top: `calc(50% - 0.15em)`,
    width: 10,
  },
  '& > fieldset': { display: 'none' },
}));

const InlineSelect = ({
  id,
  label,
  showLabel,
  options,
  hint,
  value,
  onChange,
  children,
  SelectComponent = StyledSelect,
  className,
  ...props
}) => {
  return (
    <FormControl {...props} className={className}>
      <InputLabel sx={showLabel ? undefined : visuallyHidden} id={`${id}-label`}>
        {label}
      </InputLabel>
      <Tooltip open={Boolean(hint)} title={hint || ''} arrow placement="bottom">
        <SelectComponent
          id={id}
          labelId={`${id}-label`}
          label={label}
          value={value}
          MenuProps={{ PopoverClasses: { root: 'map-controls__menu' } }}
          onChange={onChange}
        >
          {options.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
          {children}
        </SelectComponent>
      </Tooltip>
    </FormControl>
  );
};

export default InlineSelect;
