import { Box, styled } from '@mui/material';
import theme, {
  ALT_BACKGROUND,
  BOLD_FONT_FAMILY,
  NUMBER_FONT_FAMILY,
  TEXT_SECONDARY,
} from '../theme';

const ChartsStyle = styled(Box)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 560px;
  background: ${ALT_BACKGROUND};
  .charts__controls {
    display: flex;
    align-items: center;
    padding: ${theme.spacing(2, 0)};
    min-height: ${theme.spacing(11)};
    background: #eef2f5;
  }
  .charts__controls .body__content {
    position: relative;
  }
  .charts__controls .select_bubble {
    vertical-align: middle;
  }
  .charts__controls .select_bubble .MuiInputBase-root {
    color: ${theme.palette.primary.main};
  }
  .charts__controls fieldset legend: {
    display: none;
  }
  .chart-controls__confidence-switch {
    display: inline-block;
  }
  .chart-controls__confidence-switch .MuiTypography-root {
    display: inline;
    text-transform: uppercase;
  }
  .charts__chart-wrapper {
    display: flex;
    gap: ${theme.spacing(2)};
    flex-direction: column;
    flex: 1;
    padding: ${theme.spacing(6, 3)};
  }
  .charts__line-chart-sizer {
    max-width: 760px;
  }
  .charts__line-chart {
    flex: 1;
    // background: rgba(0, 0, 0, 0.05);
  }
  .charts__line-chart .visx-axis-tick text {
    font-family: ${NUMBER_FONT_FAMILY};
    color: ${TEXT_SECONDARY};
  }
  .charts__line-chart .line-chart__y-label {
    font-family: ${BOLD_FONT_FAMILY};
    font-size: ${theme.typography.pxToRem(12)};
    text-transform: uppercase;
    // color: ${TEXT_SECONDARY};
  }
  .charts__legend {
    display: flex;
    gap: ${theme.spacing(2)};
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .charts__legend .location-header__wrapper {
    box-shadow: none;
    padding: 0;
    height: auto;
    align-items: flex-start;
  }
  .charts__legend .location-header__name-wrapper {
    flex: 1;
  }
  .charts__legend .location-header__name,
  .charts__legend .location-header__parent-name {
    padding-right: 32px;
  }
  .charts__legend .location-header__marker {
    width: 26px;
  }
  .charts__legend .charts__nat-avg-legend-item button {
    transition: ${theme.transitions.create('transform')};
  }
  .charts__legend .charts__nat-avg-legend-item:not(.active) button {
    transform: rotate(-45deg);
  }

  // CHART TOOLTIP
  .visx-tooltip {
    z-index: 100;
    padding: ${theme.spacing(2.5)} ${theme.spacing(1.5)} !important;
    background: black !important;
    color: white !important;
    width: 240px; // sync with ChartTooltip tooltipWidth
    // transition: transform linear 0.4s;
  }
  .charts__tooltip .location-details {
    &:not(:last-child) {
      margin-bottom: ${theme.spacing(1.5)};
    }
    .indicator {
      width: 15px;
      vertical-align: middle;
      margin-top: -6px;
      margin-right: ${theme.spacing(0.5)};
    }
    .name {
      display: inline;
    }
    .values {
      margin-top: ${theme.spacing(1)};
      .y-value {
        margin-top: auto;
        margin-bottom: auto;
      }
      .bounds {
        margin-left: ${theme.spacing(2)};
        .MuiTypography-root {
          font-size: ${theme.typography.pxToRem(10)};
        }
      }
    }
  }

  .charts__tooltip-line-year {
    font-family: ${NUMBER_FONT_FAMILY};
    font-size: 12px;
    font-weight: bold;
  }

  ${theme.breakpoints.up('sm')} {
    .chart-controls__confidence-switch {
      position: absolute;
      right: 0;
      top: -8px;
      padding-right: ${theme.spacing(3)};
    }
  }
  // 960+
  ${theme.breakpoints.up('md')} {
    .charts__chart-wrapper {
      flex-direction: row;
      gap: ${theme.spacing(3)};
    }
    .charts__line-chart-sizer {
      flex: 0.7;
      // background: rgba(0, 0, 0, 0.05);
    }
    .charts__legend {
      flex: 0.3;
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: stretch;
      gap: ${theme.spacing(5)};
      justify-content: flex-start;
    }
  }
`;

export default ChartsStyle;
