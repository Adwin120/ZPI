import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const dateSchema = z.string().refine((value) => {
    return dateRegex.test(value);
}, {
    message: "Nieprawidłowy format daty (oczekiwano 'RRRR-MM-DD')",
});

export const optionalUmowaSchema = z.object(
    {
        Klient_IdKlient: z.number().min(1,"ID klienta musi być większe od 0.").default(0).optional(),
        Data_rozpoczecia: dateSchema.optional(),
        Data_zakonczenia: dateSchema.optional(),
    },
);

export type OptionalUmowaPayload = z.infer<typeof optionalUmowaSchema>;
