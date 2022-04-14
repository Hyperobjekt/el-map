import { Box, styled } from "@mui/material";
import theme from "../../theme";

/** map section styles */
export const MapTooltipWrapper = styled(Box)`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  pointer-events: none;
  .map__tooltip {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(1)};
    background: rgba(0, 0, 0, 0.87);
    padding: ${theme.spacing(1)};
    pointer-events: none;
    color: #fff;
    position: relative;
    width: 200px;
    transform: translate3d(-50%, -100%, 0);
    margin-top: -16px;
    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid rgba(0, 0, 0, 0.87);
    }
  }
  .map__tooltip-name,
  .map__tooltip-parent {
    margin: 0;
    line-height: 1;
    display: block;
  }
  .map__tooltip-description {
    line-height: 1.3333;
    display: block;
    font-style: italic;
  }
  .MuiDivider-root {
    border-color: #444;
    border-style: dotted;
  }
  .map__tooltip-hint {
    color: rgba(255, 255, 255, 0.66);
    font-style: italic;
  }
`;
