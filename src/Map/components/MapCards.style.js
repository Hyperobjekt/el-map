import { Box, styled } from "@mui/material";
import theme from "../../theme";

/** styles for map cards */
export const MapCardsStyles = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .map-cards__card {
    position: absolute;
    width: 216px;
  }
  .location-header__name-wrapper {
    padding-left: ${theme.spacing(2)};
    padding-right: ${theme.spacing(2)};
  }
  .location-header__close {
    position: absolute;
    top: ${theme.spacing(1)};
    right: ${theme.spacing(1)};
  }
  .map-card__metrics {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(1)};
    padding: ${theme.spacing(2)};
  }
  .map-card__metric {
    display: flex;
    flex-direction: column;
  }
  .map-card__metric-value {
    font-size: ${theme.typography.pxToRem(24)};
    font-weight: 500;
  }
`;
