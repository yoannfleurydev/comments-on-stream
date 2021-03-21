import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#E1EEFA",
    100: "#BAD3F3",
    200: "#8BB9F2",
    300: "#68A2E4",
    400: "#418EDE",
    500: "#247BCE",
    600: "#0066B3",
    700: "#004081",
    800: "#082348",
    900: "#050C1B",
  },
};

export const ces = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        backgroundColor: "brand.50",
      },
      a: {
        boxShadow: "none",
      },
    },
  },
});
