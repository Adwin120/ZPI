import type { Theme } from "@mui/material";

const contentMovedByDrawer = (isOpen: boolean) => (theme: Theme) =>
    ({
        flexGrow: 1,
        transition: isOpen
            ? theme.transitions.create(["margin", "width"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
              })
            : theme.transitions.create(["margin", "width"], {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
              }),
        width: isOpen ? `calc(100% - ${theme.dimensions["drawerWidth"]})` : "100%",
        marginLeft: isOpen ? theme.dimensions["drawerWidth"] : 0,
    } as const);

export default contentMovedByDrawer;
