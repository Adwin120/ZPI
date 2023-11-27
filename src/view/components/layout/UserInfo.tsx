import { Avatar, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { useUser } from "../../firebaseAuth";

interface Props {}
const UserInfo: React.FC<Props> = () => {
    const user = useUser();
    const name = user?.displayName?.split(" ")[0]
    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h5" noWrap component="div" sx={{display: ["none", "block"]}}>
                {name ?? "Gość"}
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
