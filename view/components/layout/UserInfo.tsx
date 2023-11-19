import { Avatar, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import pudzian from "../../pudzian.jpg";

interface Props {}
const UserInfo: React.FC<Props> = () => {
    //TODO: fetch data from authentication service
    const user = {
        displayName: "Pudzian",
        photoURL: pudzian,
    };

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5" noWrap component="div">
                {user.displayName}
            </Typography>
            <Avatar
                alt={user?.displayName ?? "user avatar"}
                src={user?.photoURL ?? undefined}
                sx={(theme) => ({ boxShadow: theme.shadows[10], bgcolor: blueGrey[200] })}
            />
        </Stack>
    );
};

export default UserInfo;
