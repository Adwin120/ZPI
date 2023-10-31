import { createTheme } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";
import { plPL } from "@mui/material/locale";

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
    plPL
);

export default theme;
