import React, { PropsWithChildren } from "react";
import { Dialog, DialogTitle, DialogContent, Stack, Button } from "@mui/material";

interface Props extends PropsWithChildren {
    open: boolean;
    onClose: () => void;
    submitEndpoint: string;
    title: string;
}
const FormDialog: React.FC<Props> = ({ onClose, open, submitEndpoint, title, children }) => {
    return (
        <Dialog
            open={open}
            PaperProps={{ elevation: 18, sx: { minWidth: "50%" } }}
            onClose={onClose}
        >
            <DialogTitle variant="h5" component="h2">
                {title}
            </DialogTitle>
            <DialogContent>
                <form action={submitEndpoint} method="POST">
                    <Stack direction="column" gap={1} py={2}>
                        {children}
                    </Stack>
                    <Button type="submit" variant="contained" fullWidth>
                        Zapisz
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;
