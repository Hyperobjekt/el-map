import { createTheme } from "@mui/material";
import { ArrowDown } from "./Icons";

export const BODY_FONT_FAMILY = "'Akkurat-Regular', sans-serif";
export const BOLD_FONT_FAMILY = "'Akkurat-Bold', sans-serif";
export const HEADING_FONT_FAMILY = "GT-Eesti-Text-Bold, sans-serif";
export const NUMBER_FONT_FAMILY = '"Gotham A", "Gotham B", sans-serif';

const themeConfig = {
  palette: {
    primary: {
      main: "#e24000",
    },
    secondary: {
      main: "#434878",
    },
    text: {
      primary: "#050403",
      secondary: "#737373",
    },
  },
  typography: {
    fontFamily: BODY_FONT_FAMILY,
    h1: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${26 / 16}em`,
    },
    h2: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${21 / 16}em`,
    },
    h3: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${18 / 16}em`,
    },
    h4: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${16 / 16}em`,
    },
    h5: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${14 / 16}em`,
    },
    h6: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${12 / 16}em`,
    },
    button: {
      fontFamily: HEADING_FONT_FAMILY,
      letterSpacing: "0.05em",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 2,
    contentMaxWidth: "1248px",
  },
  shadows: [
    "none",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
    "0 3px 6px 0 rgb(145 145 145 / 23%)",
  ],
};

// create a base so we can use colors in overrides
const baseTheme = createTheme(themeConfig);

const theme = createTheme({
  ...themeConfig,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#efefef",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowDown,
      },
      styleOverrides: {
        icon: {
          width: 12,
          right: 16,
          top: `calc(50% - 0.225em)`,
          color: baseTheme.palette.primary.main,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {},
        containedPrimary: {
          fontFamily: HEADING_FONT_FAMILY,
          letterSpacing: "0.05em",
          fontWeight: 400,
        },
      },
      variants: [
        {
          props: { variant: "border" },
          style: {
            border: `5px solid #f4f7f9`,
            color: "#737373",
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "captionBold" },
          style: {
            ...baseTheme.typography.caption,
            fontFamily: BOLD_FONT_FAMILY,
          },
        },
      ],
    },
    MuiIconButton: {},
  },
});

export default theme;
