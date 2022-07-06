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
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "Space Mono, monospace",
        fontWeight: 500,
        fontSize: "180%"
      }
    }
  },
});
