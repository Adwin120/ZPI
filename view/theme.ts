import { createTheme } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";
import { plPL } from "@mui/material/locale";
import { plPL as gridPlPL } from "@mui/x-data-grid";

const theme = createTheme(
    {
        palette: {
            // mode: 'dark',
            primary: {
                main: grey[600],
            },
            secondary: {
                main: lightGreen["A400"],
            },
            text: {
                primary: "rgba(0,0,0,0.97)",
            },
        },
    },
    plPL,
    gridPlPL
);

export default theme;
