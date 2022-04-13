import { Box, styled } from "@mui/material";
import theme from "../../theme";

/** styles for map cards */
export const MapCardsStyles = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  .map-cards__card {
    flex-shrink: 0;
  }
  .location-header__name-wrapper {
    padding-left: ${theme.spacing(2)};
    padding-right: ${theme.spacing(2)};
  }
  .location-header__close {
    position: absolute;
  }
  .map-card__metrics {
    display: flex;
    gap: ${theme.spacing(3)};
    padding: ${theme.spacing(1, 2)};
  }
  .map-card__metric {
    display: flex;
    flex-direction: column;
  }
  .map-card__metric-value {
    font-size: ${theme.typography.pxToRem(28)};
    font-weight: 500;
  }
  .map-card__ci {
    .MuiTypography-root {
      display: flex;
      line-height: 1;
      gap: ${theme.spacing(0.5)};
      span {
        display: block;
        min-width: 32px;
      }
    }
  }
  ${theme.breakpoints.down("md")} {
    overflow: auto;
    justify-content: stretch;
    .map-cards__card {
      height: 136px;
      flex: 1;
      .location-header__wrapper {
        height: ${theme.spacing(8)};
        padding-bottom: ${theme.spacing(1)};
        box-shadow: inset 0 4px 0 0 currentColor;
      }
      .location-header__name {
        font-size: 16px;
        max-width: 240px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .location-header__close {
        top: ${theme.spacing(2.5)};
        right: ${theme.spacing(1)};
      }
      .location-header__parent-name {
        font-size: 12px;
      }
      .map-card__metric-value {
        font-size: ${theme.typography.pxToRem(18)};
        font-weight: 500;
      }
      .map-card__metric-label {
        max-width: 124px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .map-card__metric {
        height: ${theme.spacing(7)};
      }
      .map-card__metric:nth-of-type(2) {
        display: none;
      }
      .map-card__ci {
        margin-top: ${theme.spacing(0.5)};
      }
    }
  }
  ${theme.breakpoints.up("sm")} {
  }
  ${theme.breakpoints.up("md")} {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: auto;
    align-items: center;
    .map-cards__card {
      position: absolute;
      width: 216px;
      .map-card__metrics {
        flex-direction: column;
        gap: ${theme.spacing(1)};
        padding: ${theme.spacing(2)};
      }
      .location-header__close {
        top: ${theme.spacing(1)};
        right: ${theme.spacing(1)};
      }
    }
  }
`;
