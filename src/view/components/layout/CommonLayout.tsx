import {
    AppBar,
    Box,
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

interface Props extends PropsWithChildren {
    pageTitle: string;
}
const CommonLayout: React.FC<Props> = ({ children, pageTitle }) => {
    const isDesktop = useMediaQuery((t: Theme) => t.breakpoints.up("md"));
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(isDesktop);

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
                    <UserInfo />
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
                    <NavigationListItem>Klienci</NavigationListItem>
                    <NavigationListItem>Zlecenia</NavigationListItem>
                    <NavigationListItem>Figi z makiem</NavigationListItem>
                </List>
            </Drawer>
            <Box component="main" sx={[{ p: 2 }, contentMovedByDrawer(isDrawerOpen && isDesktop)]}>
                {children}
            </Box>
        </>
    );
};

function NavigationListItem({ children }: PropsWithChildren) {
    //TODO: highlight the selected element
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText>{children}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
}

export default CommonLayout;
