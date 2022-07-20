import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#291555",
        lineHeight: "1.6em",
        color: "#d1c9e3",
      },
      a: {
        color: "#d1c9e3",
      },
    },
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1736px",
  },
  fonts: {
    heading: `"Space Mono", monospace`,
    body: `"Poppins", sans-serif`,
  },
  components: {
    Link: {
      baseStyle: {
        textDecoration: "underline",
        color: "#d1c9e3",
      },
    },
    Text: {
      baseStyle: {
        color: "#d1c9e3",
        fontSize: "1.1em",
        fontWeight: 400,
        lineHeight: "1.6em",
        fontFamily: `"Poppins", sans-serif`,
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "Space Mono, monospace",
        fontWeight: 500,
        fontSize: "2rem",
      },
    },
    Box: {
      baseStyle: {
        borderRadius: "6px",
        backgroundColor: "#321e5e",
      },
    },
    Button: {
      variants: {
        statement: {
          padding: "1.5rem 1.75rem",
          background: "#be59cf",
          color: "white",
          borderRadius: "0.5rem",
          opacity: 0.9,
          fontWeight: 800,
          fontSize: "1.2rem",
        },
        delegate: {
          padding: "1.5rem 1.75rem",
          background: "#42c8b0",
          color: "white",
          borderRadius: "0.5rem",
          opacity: 0.9,
          fontWeight: 800,
          fontSize: "1.2rem",
        },
      },
    },
  },
});
