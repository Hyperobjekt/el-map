import React from "react";
import {
  useRegionOptions,
  useDashboardState,
  useLang,
} from "@hyperobjekt/react-dashboard";
import InlineSelect from "./InlineSelect";
import { Divider, MenuItem, Typography } from "@mui/material";

const RegionSelect = (props) => {
  const options = useRegionOptions();
  const value = useDashboardState("region");
  const setValue = useDashboardState("setRegion");
  const [label, unavailableText, unavailableLabel, unavailableHint] = useLang([
    "SELECT_REGION_LABEL",
    "SELECT_REGION_UNAVAILABLE",
    "UNAVAILABLE_LABEL",
    "UNAVAILABLE_REGION",
  ]);
  const availableOptions = options.filter((option) => !option.unavailable);
  const unavailableOptions = options.filter((option) => option.unavailable);
  const hasUnavailable = unavailableOptions.length > 0;
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const isUnavailable = unavailableOptions.find(
    (option) => option.id === value
  );

  return (
    <InlineSelect
      id="select_region"
      label={label}
      value={value}
      options={availableOptions}
      hint={isUnavailable ? unavailableHint : undefined}
      onChange={handleChange}
      {...props}
    >
      {hasUnavailable && (
        <>
          <Divider />
          <Typography variant="overline" color="textSecondary" sx={{ pl: 2 }}>
            {unavailableLabel}
          </Typography>
        </>
      )}
      {unavailableOptions.map(({ id, name }) => (
        <MenuItem key={id} value={id} disabled>
          {name}
        </MenuItem>
      ))}
      {unavailableText && (
        <Typography variant="selectHint" sx={{ p: 2 }}>
          {unavailableText}
        </Typography>
      )}
    </InlineSelect>
  );
};

export default RegionSelect;
