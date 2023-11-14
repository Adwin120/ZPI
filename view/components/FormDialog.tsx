import React, { PropsWithChildren, createContext, useId } from "react";
import { Dialog, DialogTitle, DialogContent, Stack, Button } from "@mui/material";
import { ZodIssueOptionalMessage, ZodType, z } from "zod";
import { Control, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const numeric = /^\d+$/;
const defaultMessage = (message: string) => ({
    errorMap: (i: ZodIssueOptionalMessage) => ({
        message: i.message ?? message,
    }),
});
const schema = z.object(
    {
        nazwa: z.string().min(1, "nazwa jest wymagana"),
        email: z.string().email("Niepoprawny format adresu e-mail"),
        adres: z.string().min(1, "Adres jest wymagany"),
        nip: z.string().regex(numeric).length(10, "NIP musi mieć 10 cyfr"),
        telefon: z.string().regex(numeric).length(9, "Telefon musi mieć 9 cyfr"),
    },
    defaultMessage("Niepoprawny format")
);

//TODO: add authentication
const postToEndpoint = (endpoint: string) => (payload: BodyInit) =>
    fetch(endpoint, {
        body: payload,
        method: "POST",
    });

type Schema = z.infer<typeof schema>;
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
    const { handleSubmit, control } = useForm<T>({ resolver: zodResolver(schema) });
    
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
                <form onSubmit={handleSubmit(onSubmit)} aria-labelledby={titleId}>
                    <Stack direction="column" gap={1} py={2}>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <formContext.Provider value={control as any}>{children}</formContext.Provider>
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
