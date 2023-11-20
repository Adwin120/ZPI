import { createTheme } from "@mui/material";
import { blue, deepPurple, green, grey, lightGreen } from "@mui/material/colors";
import { plPL } from "@mui/material/locale";

declare module "@mui/material/styles" {
    interface Theme {
        dimensions: Record<string, string | number>;
    }
    interface ThemeOptions {
        dimensions: Record<string, string | number>;
    }
}

const theme = createTheme(
    {
        palette: {
            // mode: 'dark',
            primary: {
                main: green[800],
            },
            secondary: {
                main: deepPurple[400],
            },
            text: {
                primary: "rgba(0,0,0,0.97)",
            },
        },
        dimensions: {
            drawerWidth: "230px",
        },
    },
    plPL
);

export default theme;
