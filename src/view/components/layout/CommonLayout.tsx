import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import UserInfo from "./UserInfo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import contentMovedByDrawer from "../../styles/contentMovedByDrawer";
import { useUser } from "../../firebaseAuth";
import { useLocation } from "wouter";
import NavigationListItem from "./NavigationListItem";

interface Props extends PropsWithChildren {
    pageTitle: string;
}
const CommonLayout: React.FC<Props> = ({ children, pageTitle }) => {
    const isDesktop = useMediaQuery((t: Theme) => t.breakpoints.up("md"));
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(isDesktop);

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
                        onClick={() => setDrawerOpen(true)}
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
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: (t) => ({ width: t.dimensions["drawerWidth"] }) }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
                    <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List disablePadding>
                    <NavigationListItem href="/panel/klienci">Klienci</NavigationListItem>
                    <NavigationListItem href="/panel/zlecenia">Zlecenia</NavigationListItem>
                    <NavigationListItem href="/panel/figi">Figi z makiem</NavigationListItem>
                </List>
            </Drawer>
            <Box component="main" sx={[{ p: 2 }, contentMovedByDrawer(isDrawerOpen && isDesktop)]}>
                {children}
            </Box>
        </>
    );
};

export default CommonLayout;
