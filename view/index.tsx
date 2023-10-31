import React from "react";
import { createRoot } from "react-dom/client";
import MockForms from "./components/MockForms";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

const reactContainer = document.getElementById("react-app")!;
const root = createRoot(reactContainer);
root.render(
    <ThemeProvider theme={theme}>
        <MockForms />
    </ThemeProvider>
);
