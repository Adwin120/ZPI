import React from "react";
import { createRoot } from "react-dom/client";
import MockForms from "./components/layout/MockForms";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import CommonLayout from "./components/layout/CommonLayout";

const reactContainer = document.getElementById("react-app")!;
const root = createRoot(reactContainer);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <CommonLayout pageTitle="MOXLY">
            <MockForms />
        </CommonLayout>
    </ThemeProvider>
);
