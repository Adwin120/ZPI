import { createTheme } from "@mui/material";
import { blue, deepPurple, green, grey, lightGreen } from "@mui/material/colors";
import { plPL } from "@mui/material/locale";

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
    },
    plPL
);

export default theme;
