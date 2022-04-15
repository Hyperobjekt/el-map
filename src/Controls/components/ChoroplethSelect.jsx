import React from "react";
import {
  useChoroplethOptions,
  useDashboardState,
  useLang,
} from "@hyperobjekt/react-dashboard";
import InlineSelect from "./InlineSelect";

const ChoroplethSelect = (props) => {
  const options = useChoroplethOptions();
  const value = useDashboardState("choroplethMetric");
  const setValue = useDashboardState("setChoroplethMetric");
  const label = useLang("SELECT_CHOROPLETH_LABEL");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <InlineSelect
      id="select_choropleth"
      label={label}
      value={value}
      options={options}
      onChange={handleChange}
      {...props}
    />
  );
};

export default ChoroplethSelect;
