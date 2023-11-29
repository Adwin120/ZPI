import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import UserInfo from "./UserInfo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import contentMovedByDrawer from "../../styles/contentMovedByDrawer";
import { useUser } from "../../firebaseAuth";
import { useLocation } from "wouter";
import NavigationListItem from "./NavigationListItem";
import { useSessionStorage } from "../../hooks/useSessionStorage";

interface Props extends PropsWithChildren {
    pageTitle?: string;
}
const CommonLayout: React.FC<Props> = ({ children, pageTitle = "MOXLY" }) => {
    const isDesktop = useMediaQuery((t: Theme) => t.breakpoints.up("md"));
    const [_isDrawerOpen, setDrawerOpen] = useSessionStorage<"true" | "false">("isDrawerOpen", isDesktop ? "true" : "false");
    const isDrawerOpen = _isDrawerOpen === "true"

    const user = useUser();
    const [_, navigate] = useLocation();
    const loggedIn = Boolean(user);
    const SignIn = (
        <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>
            Zaloguj
        </Button>
    );

    return (
        <>
            <AppBar position="sticky">
                <Toolbar
                    sx={[
                        { display: "flex", justifyContent: "space-between" },
                        contentMovedByDrawer(isDrawerOpen && isDesktop),
                    ]}
                >
                    <IconButton
                        aria-label="Open menu"
                        color="inherit"
                        hidden={isDrawerOpen}
                        sx={{ visibility: isDrawerOpen ? "hidden" : "visible" }}
                        onClick={() => setDrawerOpen("true")}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h4" component="h1">
                        {pageTitle}
                    </Typography>
                    {loggedIn ? <UserInfo /> : SignIn}
                </Toolbar>
            </AppBar>
            <Drawer
                open={isDrawerOpen}
                variant={isDesktop ? "persistent" : "temporary"}
                anchor="left"
                onClose={() => setDrawerOpen("false")}
                PaperProps={{ sx: (t) => ({ width: t.dimensions["drawerWidth"] }) }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
                    <IconButton aria-label="Close menu" onClick={() => setDrawerOpen("false")}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List disablePadding>
                    <NavigationListItem href="/panel/klienci">Klienci</NavigationListItem>
                    <NavigationListItem href="/panel/zlecenia">Zlecenia</NavigationListItem>
                    <NavigationListItem href="/panel/figi">Figi z makiem</NavigationListItem>
                    <NavigationListItem href="/panel/uprawnienia">Uprawnienia</NavigationListItem>
                </List>
            </Drawer>
            <Box component="main" sx={[{ p: 2 }, contentMovedByDrawer(isDrawerOpen && isDesktop)]}>
                {children}
            </Box>
        </>
    );
};

export default CommonLayout;
