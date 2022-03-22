import React from "react";
import {
  useBubbleOptions,
  useDashboardState,
} from "@hyperobjekt/react-dashboard";
import InlineSelect from "./InlineSelect";

const BubbleSelect = (props) => {
  const bubbleOptions = useBubbleOptions();
  const bubbleMetric = useDashboardState("bubbleMetric");
  const setBubbleMetric = useDashboardState("setBubbleMetric");
  const handleSelect = (e) => {
    setBubbleMetric(e.target.value);
  };
  return (
    <InlineSelect
      label="Eviction Metric"
      value={bubbleMetric}
      options={bubbleOptions}
      onChange={handleSelect}
    />
  );
};

export default BubbleSelect;
