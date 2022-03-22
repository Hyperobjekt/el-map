import React from "react";
import {
  useRegionOptions,
  useDashboardState,
} from "@hyperobjekt/react-dashboard";
import InlineSelect from "./InlineSelect";

const RegionSelect = (props) => {
  const options = useRegionOptions();
  const value = useDashboardState("region");
  const setValue = useDashboardState("setRegion");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <InlineSelect
      label="Region"
      value={value}
      options={options}
      onChange={handleChange}
      {...props}
    />
  );
};

export default RegionSelect;
