import React from "react";
import { createRoot } from "react-dom/client";
import MockForms from "./components/layout/MockForms";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import CommonLayout from "./components/layout/CommonLayout";
import { Redirect, Route, Router, Switch } from "wouter";
import { Login } from "./firebaseAuth";
import Figi from "./components/pages/Figi";
import Klienci from "./components/pages/Klienci";
import NotFound from "./components/pages/NotFound";
import Zlecenia from "./components/pages/Zlecenia";

const reactContainer = document.getElementById("react-app")!;
const root = createRoot(reactContainer);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/klienci" component={Klienci}></Route>
                <Route path="/zlecenia" component={Zlecenia}></Route>
                <Route path="/figi" component={Figi}></Route>
                <Route path="/" component={MockForms}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </Router>
    </ThemeProvider>
);
