import { createRoot } from "react-dom/client";
import MockForms from "./components/layout/MockForms";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./styles/theme";
import { Route, Router, Switch } from "wouter";
import { Login } from "./firebaseAuth";
import Figi from "./components/pages/Figi";
import Klienci from "./components/pages/Klienci";
import NotFound from "./components/pages/NotFound";
import Zgloszenia from "./components/pages/Zgloszenia";
import MaterialToaster from "./components/MaterialToaster";
import Uprawnienia from "./components/pages/Uprawnienia";
import Pracownicy from "./components/pages/Pracownicy";

const reactContainer = document.getElementById("react-app")!;

const root = createRoot(reactContainer);
root.render(
    <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <CssBaseline />
            <MaterialToaster />
            <Router>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/panel/klienci" component={Klienci}></Route>
                    <Route path="/panel/pracownicy" component={Pracownicy}></Route>
                    <Route path="/panel/zgloszenia" component={Zgloszenia}></Route>
                    <Route path="/panel/figi" component={Figi}></Route>
                    <Route path="/panel/uprawnienia" component={Uprawnienia}></Route>
                    <Route path="/" component={MockForms}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </Router>
        </LocalizationProvider>
    </ThemeProvider>
);
