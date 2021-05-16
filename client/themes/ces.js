import { extendTheme } from "@chakra-ui/react";
import foundations from "./foundations";

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
  gray: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
};

export const ces = extendTheme({
  colors,
  ...foundations,
  styles: {
    global: {
      body: {
        backgroundColor: "gray.50",
      },
      a: {
        boxShadow: "none",
      },
    },
  },
});
