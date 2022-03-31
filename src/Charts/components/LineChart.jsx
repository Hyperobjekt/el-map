import clsx from "clsx";
import React from "react";

const LineChart = ({ locations, onHover, className, ...props }) => {
  return (
    <div className={clsx("line-chart__root", className)} {...props}>
      LineChart
    </div>
  );
};

export default LineChart;
