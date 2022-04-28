import { Tooltip, Typography } from "@mui/material";
import React from "react";
import { Info } from "../Icons";

const ICON_PROPS = {
  style: { width: "1em", height: "1em", color: "#999" },
};

const TOOLTIP_PROPS = {
  arrow: true,
  placement: "top",
};

/**
 * This is the Mui Typography component, wrapped in an optional tooltip hint.
 */
const HintTypography = ({
  hint,
  TooltipProps = TOOLTIP_PROPS,
  IconProps = ICON_PROPS,
  Icon = Info,
  children,
  ...props
}) => {
  if (!hint) {
    return <Typography {...props}>{children}</Typography>;
  }
  return (
    <Tooltip title={hint} {...TooltipProps}>
      <Typography
        sx={{ display: "flex", gap: "0.5em", alignItems: "center" }}
        {...props}
      >
        <span>{children}</span> <Icon {...IconProps} />
      </Typography>
    </Tooltip>
  );
};

export default HintTypography;
