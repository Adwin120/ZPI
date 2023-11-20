import React, { PropsWithChildren, useId } from "react";
import { Dialog, DialogTitle, DialogContent, Stack, Button } from "@mui/material";

interface Props extends PropsWithChildren {
    open: boolean;
    onClose: () => void;
    submitEndpoint: string;
    title: string;
}
const FormDialog: React.FC<Props> = ({ onClose, open, submitEndpoint, title, children }) => {
    const titleId = useId();
    return (
        <Dialog
            open={open}
            PaperProps={{ elevation: 18, sx: { minWidth: "50%", mx: 2 } }}
            onClose={onClose}
        >
            <DialogTitle variant="h5" component="h2" id={titleId}>
                {title}
            </DialogTitle>
            <DialogContent>
                <form action={submitEndpoint} method="POST" aria-labelledby={titleId}>
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
