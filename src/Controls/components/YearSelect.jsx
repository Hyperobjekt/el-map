import React from "react";
import {
  useYearOptions,
  useDashboardState,
} from "@hyperobjekt/react-dashboard";
import InlineSelect from "./InlineSelect";

const YearSelect = (props) => {
  const options = useYearOptions();
  const value = useDashboardState("year");
  const setValue = useDashboardState("setYear");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <InlineSelect
      label="Year"
      value={value}
      options={options}
      onChange={handleChange}
      {...props}
    />
  );
};

export default YearSelect;
