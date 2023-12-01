import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

const datetimeSchema = z.string().refine((value) => {
    return datetimeRegex.test(value);
}, {
    message: "Nieprawidłowy format daty i czasu (oczekiwano 'RRRR-MM-DD GG:MM:SS')",
});

export const grafikSchema = z.object(
    {
        Pracownik_IdPracownik: z.number().min(1,"ID modelu musi być większe od 0."),
        Klient_IdKlient: z.number().min(1,"ID klienta musi być większe od 0."),
        Czas_rozpoczecia: datetimeSchema,
        Czas_zakonczenia: datetimeSchema,
        Status: z.string().min(1, "Status jest wymagany.").default(""),
    },
    defaultMessage("Niepoprawny format")
);

export type GrafikPayload = z.infer<typeof grafikSchema>;