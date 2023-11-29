import { z } from "zod"

const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

const datetimeSchema = z.string().refine((value) => {
    return datetimeRegex.test(value);
}, {
    message: "Nieprawidłowy format daty i czasu (oczekiwano 'RRRR-MM-DD GG:MM:SS')",
});

export const optionalGrafikSchema = z.object(
    {
        Pracownik_IdPracownik: z.number().min(1,"ID modelu musi być większe od 0.").default(0).optional(),
        Klient_IdKlient: z.number().min(1,"ID klienta musi być większe od 0.").default(0).optional(),
        Czas_rozpoczecia: datetimeSchema.optional(),
        Czas_zakonczenia: datetimeSchema.optional(),
        Status: z.string().optional(),
    },
);

export type OptionalGrafikPayload = z.infer<typeof optionalGrafikSchema>;
