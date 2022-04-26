import React from "react";
import {
  useRegionOptions,
  useDashboardState,
  useLang,
} from "@hyperobjekt/react-dashboard";
import InlineSelect from "./InlineSelect";
import { Divider, MenuItem, Switch, Typography } from "@mui/material";
import { useAutoSwitch } from "../../hooks";

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
    if (!e.target?.value) return;
    setValue(e.target.value);
    if (autoSwitch) setAutoSwitch(false);
  };
  const isUnavailable = unavailableOptions.find(
    (option) => option.id === value
  );
  const [autoSwitch, setAutoSwitch] = useAutoSwitch();

  // toggles auto switch region behaviour
  const handleToggleAutoSwitch = (event) => {
    setAutoSwitch(!autoSwitch);
    // don't close the menu if toggling the switch
    const isSwitchClick = event.target.type === "checkbox";
    if (isSwitchClick) event.stopPropagation();
  };

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
      <MenuItem
        sx={{ justifyContent: "space-between" }}
        onClick={handleToggleAutoSwitch}
      >
        <Typography variant="body2">Auto-switch on zoom</Typography>
        <Switch checked={autoSwitch} onClick={handleToggleAutoSwitch} />
      </MenuItem>
      {hasUnavailable && <Divider />}
      {hasUnavailable && (
        <Typography variant="overline" color="textSecondary" sx={{ pl: 2 }}>
          {unavailableLabel}
        </Typography>
      )}
      {unavailableOptions.map(({ id, name }) => (
        <MenuItem key={id} value={id} disabled>
          {name}
        </MenuItem>
      ))}
      {hasUnavailable && unavailableText && (
        <Typography variant="selectHint" sx={{ p: 2 }}>
          {unavailableText}
        </Typography>
      )}
    </InlineSelect>
  );
};

export default RegionSelect;
