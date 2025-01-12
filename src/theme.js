import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let themes = createTheme({
  palette: {
    action: {
      disabled: "#A0A0A0",
    },
    primary: {
      main: "#D1FF1A",
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    background: {
      default: "#F4F4F4",
    },
  },
  typography: {
    fontFamily: "Karla, Roboto, sans-serif",
    h1: {
      fontFamily: "Rubik",
      fontSize: "2.813rem",
    },
    h2: {
      fontFamily: "Rubik",
      fontSize: "2.1875rem",
    },
    h3: {
      fontFamily: "Rubik",
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: "Karla",
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    h5: {
      fontFamily: "Karla",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "Karla",
      fontSize: "1.375rem",
      fontWeight: "normal",
    },
    subtitle1: {
      fontFamily: "Karla",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    body1: {
      fontFamily: "Karla",
      fontSize: "1.125rem",
    },
    body2: {
      fontFamily: "Karla",
      fontSize: "1rem",
    },
  },
});

let theme = responsiveFontSizes(themes);
export default theme;
