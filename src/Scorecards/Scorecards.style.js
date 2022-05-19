import { Box, styled } from "@mui/material";
import theme, { ALT_BACKGROUND } from "../theme";

export const ScorecardStyle = styled(Box)`
  min-width: 290px;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: stretch;
  .location-header__close {
    // top: auto;
    // bottom: ${theme.spacing(4)};
    top: 0;
    bottom: 0;
    height: fit-content;
    margin: auto;
  }
  .scorecard__list {
    border: 1px solid #efefef;
    padding-top: 0;
  }
  .scorecard__subheader span {
    font-weight: bold;
  }
  .scorecard__list-item {
    display: flex;
    gap: ${theme.spacing(1)};
    justify-content: space-between;
    &:nth-of-type(odd) {
      background: #f4f7f9;
    }
    .MuiTypography-root {
      font-size: ${theme.typography.pxToRem(14)};
    }
    .MuiTypography-number {
      color: ${theme.palette.secondary.main};
      font-weight: 500;
      min-width: 25%;
    }

    .scorecard__value-wrapper {
      display: flex;
      .extremes {
        display: flex;
        flex-direction: column;
        margin-top: ${theme.typography.pxToRem(-4)};
        padding-left: ${theme.spacing(0.75)};
        .MuiTypography-caption {
          line-height: 1.2;
          // color: #737373;
          font-size: ${theme.typography.pxToRem(11)};
          // font-weight: lighter;
          white-space: nowrap;
        }
      }
    }
  }
  .scorecard__list-item.prominent-item {
    background: unset;
    display: inline-flex;
    flex-flow: column-reverse;
    justify-content: center;
    align-items: baseline;
    // text-align: center;
    width: 50%;
    height: 112px;

    &.scorecard__metric {
      border-right: 1px solid #efefef;
    }
    .scorecard__item-name {
      font-size: ${theme.typography.pxToRem(11)};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: bold;
    }
    .scorecard__item-value {
      font-size: ${theme.typography.pxToRem(21)};
      line-height: 1;
    }
    .prominent-note.MuiTypography-root {
      position: absolute;
      bottom: ${theme.spacing(1.5)};
      font-size: ${theme.typography.pxToRem(11)};
      color: #737373;
      &.worseThan {
        color: red;
      }
    }
  }

  // 960+
  ${theme.breakpoints.up("md")} {
    .scorecard__list-item {
      .MuiTypography-root {
        font-size: ${theme.typography.pxToRem(16)};
      }
    }
  }

  // 1280+
  ${theme.breakpoints.up("lg")} {
    .scorecard__list-item {
      .MuiTypography-root {
        font-size: ${theme.typography.pxToRem(18)};
      }
    }
  }
`;

const ScorecardsStyle = styled(Box)`
  position: relative;
  z-index: 2;
  background: ${theme.palette.background.paper};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${theme.spacing(8, 0)};
  min-height: 100vh;
  border-top: 1px solid #efefef;
  overflow: auto;
  .body__content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    flex: 1;
  }
  .scorecards__heading {
    position: sticky;
    left: 0;
    text-align: center;
  }
  .scorecards__cards {
    display: flex;
    flex: 1;
    margin: ${theme.spacing(0)};
    gap: ${theme.spacing(3)};
    align-items: stretch;
    justify-content: stretch;
  }
  ${theme.breakpoints.up("lg")} {
    .scorecards__cards {
      gap: ${theme.spacing(6)};
    }
  }
  .search-card__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: ${theme.spacing(3)};
    flex: 1;
    width: 100%;
    margin-top: 130px;
    padding: ${theme.spacing(6, 3)};
    background: ${ALT_BACKGROUND};
  }
  .search-card__text {
    text-transform: uppercase;
  }
  .search-card__search {
    height: ${theme.spacing(7)};
    background: #fff;
  }
`;

export default ScorecardsStyle;
