import { createTheme } from "@mui/material";
import { ArrowDown } from "./Icons";

export const BODY_FONT_FAMILY = "'Akkurat-Regular', sans-serif";
export const BOLD_FONT_FAMILY = "'Akkurat-Bold', sans-serif";
export const HEADING_FONT_FAMILY = "GT-Eesti-Text-Bold, sans-serif";
export const NUMBER_FONT_FAMILY = '"Gotham A", "Gotham B", sans-serif';
export const TEXT_PRIMARY = "#050403";
export const TEXT_SECONDARY = "#737373";
export const PRIMARY_COLOR = "#e24000";
export const SECONDARY_COLOR = "#434878";
export const TERTIARY_COLOR = "#2c897f";
export const QUATERNARY_COLOR = "#94aabd";
export const ALT_BACKGROUND = "#F4F7F9";

const themeConfig = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1280,
      xl: 1536,
    },
  },
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
      letterSpacing: "0.04em",
    },
    h2: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${21 / 16}em`,
      letterSpacing: "0.04em",
    },
    h3: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${18 / 16}em`,
      letterSpacing: "0.04em",
    },
    h4: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${16 / 16}em`,
      letterSpacing: "0.04em",
      letterSpacing: "0.04em",
    },
    h5: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${14 / 16}em`,
      letterSpacing: "0.04em",
    },
    h6: {
      fontFamily: HEADING_FONT_FAMILY,
      fontSize: `${12 / 16}em`,
      letterSpacing: "0.04em",
    },
    button: {
      fontFamily: HEADING_FONT_FAMILY,
      letterSpacing: "0.05em",
      fontWeight: 400,
    },
    overline: {
      color: TEXT_SECONDARY,
      fontSize: "0.875rem",
      letterSpacing: "0.04em",
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
    MuiBackdrop: {
      styleOverrides: {
        root: {
          "&:not(.MuiBackdrop-invisible)": {
            backdropFilter: "blur(4px)",
            background: "rgba(255,255,255,0.666)",
          },
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
        containedGrey: {
          border: `1px solid ${baseTheme.palette.grey[300]}`,
        },
      },
      variants: [
        {
          props: { variant: "bordered" },
          style: {
            border: `5px solid ${ALT_BACKGROUND}`,
            color: TEXT_SECONDARY,
            "&:hover": {
              color: TEXT_PRIMARY,
              backgroundColor: ALT_BACKGROUND,
            },
          },
        },
      ],
    },
    MuiIconButton: {
      variants: [
        {
          props: { variant: "bordered" },
          style: {
            borderRadius: 0,
            border: `5px solid ${ALT_BACKGROUND}`,
            color: TEXT_SECONDARY,
            height: 56,
            width: 56,
            "&:hover": {
              color: TEXT_PRIMARY,
            },
          },
        },
      ],
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: BOLD_FONT_FAMILY,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: TEXT_SECONDARY,
          textAlign: "center",
        },
      },
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
        {
          props: { variant: "parentName" },
          style: {
            ...baseTheme.typography.body2,
            fontFamily: BOLD_FONT_FAMILY,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
          },
        },
        {
          props: { variant: "number" },
          style: {
            fontFamily: NUMBER_FONT_FAMILY,
          },
        },
        {
          props: { variant: "selectHint" },
          style: {
            ...baseTheme.typography.caption,
            display: "block",
            padding: baseTheme.spacing(2, 2, 0, 2),
            maxWidth: baseTheme.spacing(35),
            color: TEXT_SECONDARY,
          },
        },
      ],
    },
  },
});

export default theme;
