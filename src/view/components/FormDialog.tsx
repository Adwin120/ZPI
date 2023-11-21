import React, { PropsWithChildren, createContext, useId } from "react";
import { Dialog, DialogTitle, DialogContent, Stack, Button } from "@mui/material";
import { ZodIssueOptionalMessage, ZodType, z } from "zod";
import { Control, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Consumer<T> = (arg: T) => void;
export const formContext = createContext<Control<FieldValues> | null>(null);

interface Props<T> extends PropsWithChildren {
    open: boolean;
    onClose: () => void;
    title: string;
    schema: ZodType<T>;
    onSubmit: Consumer<T>;
}
const FormDialog = <T extends FieldValues>({
    onClose,
    open,
    onSubmit,
    title,
    children,
    schema,
}: Props<T>) => {
    const titleId = useId();
    const { handleSubmit, control } = useForm<T>({ resolver: zodResolver(schema), mode: "onBlur" });

    const formSubmit = handleSubmit((data) => {
        onSubmit(data);
        onClose();
    });

    return (
        <Dialog
            open={open}
            PaperProps={{ elevation: 18, sx: { minWidth: "50%" } }}
            onClose={onClose}
        >
            <DialogTitle variant="h5" component="h2" id={titleId}>
                {title}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={formSubmit} aria-labelledby={titleId}>
                    <Stack direction="column" gap={1} py={2}>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <formContext.Provider value={control as any}>
                            {children}
                        </formContext.Provider>
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