import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "Inter, system-ui, sans-serif",
  body: "Inter, system-ui, sans-serif",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, fonts });

export default theme;
