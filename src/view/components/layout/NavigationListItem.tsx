import { ListItem, ListItemButton, ListItemText, SxProps, Theme } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { useLocation, useRoute } from "wouter";
interface Props extends PropsWithChildren {
    href: string;
}
const NavigationListItem: React.FC<Props> = ({ children, href }) => {
    const [_, navigate] = useLocation();
    const [isActive] = useRoute(href);
    const activeStyles: SxProps<Theme> = (t) => ({
        color: t.palette.secondary.dark,
        fontWeight: "bolder",
    });
    return (
        <ListItem disablePadding onClick={() => navigate(href)}>
            <ListItemButton>
                <ListItemText disableTypography sx={isActive ? activeStyles : {}}>
                    {children}
                </ListItemText>
            </ListItemButton>
        </ListItem>
    );
};

export default NavigationListItem;
