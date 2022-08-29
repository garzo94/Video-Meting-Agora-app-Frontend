import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#1E1E1E",
    },
    secondary: {
      main: "#3347B0",
    },
  },

  typography: {
    fontFamily: ["DM Sans"],
    h1: {
      fontWeight: 600,
    },
  },
});
