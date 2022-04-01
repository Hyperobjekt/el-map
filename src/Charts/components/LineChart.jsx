import clsx from "clsx";
import React from "react";
import useLineData from "../hooks/useLineData";
import { useBubbleContext } from "@hyperobjekt/react-dashboard";

const LineChart = ({ locations, onHover, className, ...props }) => {
  const { metric_id } = useBubbleContext();
  const lines = useLineData(metric_id);
  return (
    <div
      style={{ maxHeight: 400, overflow: "auto" }}
      className={clsx("line-chart__root", className)}
      {...props}
    >
      <pre>{JSON.stringify(lines, null, 2)}</pre>
    </div>
  );
};

export default LineChart;
