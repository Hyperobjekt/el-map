import React from "react";
import {
  useChoroplethOptions,
  useDashboardState,
} from "@hyperobjekt/react-dashboard";
import InlineSelect from "./InlineSelect";

const ChoroplethSelect = (props) => {
  const options = useChoroplethOptions();
  const value = useDashboardState("choroplethMetric");
  const setValue = useDashboardState("setChoroplethMetric");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <InlineSelect
      label="Demographic Metric"
      value={value}
      options={options}
      onChange={handleChange}
    />
  );
};

export default ChoroplethSelect;
