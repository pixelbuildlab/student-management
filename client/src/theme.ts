import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#a1adb3",
    },
    secondary: {
      main: "#fff",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    // fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
