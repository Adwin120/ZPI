import { createRoot } from "react-dom/client";
import MockForms from "./components/layout/MockForms";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./styles/theme";
import { Route, Router, Switch } from "wouter";
import { Login } from "./firebaseAuth";
import Klienci from "./components/pages/Klienci";
import NotFound from "./components/pages/NotFound";
import Zgloszenia from "./components/pages/Zgloszenia";
import MaterialToaster from "./components/MaterialToaster";
import Uprawnienia from "./components/pages/Uprawnienia";
import Pracownicy from "./components/pages/Pracownicy";
import Grafik from "./components/pages/Grafik";
import Auta from "./components/pages/Auta";
import Umowy from "./components/pages/Umowy";
import Uslugi from "./components/pages/Uslugi";

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
                    <Route path="/panel/auta" component={Auta}></Route>
                    <Route path="/panel/grafik" component={Grafik}></Route>
                    <Route path="/panel/klienci" component={Klienci}></Route>
                    <Route path="/panel/pracownicy" component={Pracownicy}></Route>
                    <Route path="/panel/umowy" component={Umowy}></Route>
                    <Route path="/panel/uslugi" component={Uslugi}></Route>
                    <Route path="/panel/zgloszenia" component={Zgloszenia}></Route>
                    <Route path="/panel/uprawnienia" component={Uprawnienia}></Route>
                    <Route path="/" component={MockForms}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </Router>
        </LocalizationProvider>
    </ThemeProvider>
);
