import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

const datetimeSchema = z.string().refine((value) => {
    return datetimeRegex.test(value);
}, {
    message: "Nieprawidłowy format daty i czasu (oczekiwano 'RRRR-MM-DD GG:MM:SS')",
});

export const autoSchema = z.object(
    {
        Model_IdModel: z.number().min(1,"ID modelu musi być większe od 0."),
        Klient_IdKlient: z.number().min(1,"ID klienta musi być większe od 0."),
        Rejestracja: z.string().min(1, "Rejestracja jest wymagana.").default(""),
        Czas_rozpoczecia: datetimeSchema,
        Czas_zakonczenia: datetimeSchema,
        Dodatkowe_informacje: z.string().default(""),
    },
    defaultMessage("Niepoprawny format")
);

export type AutoPayload = z.infer<typeof autoSchema>;
