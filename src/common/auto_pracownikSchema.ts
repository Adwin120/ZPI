import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

export const auto_pracownikSchema = z.object(
    {
        Auto_IdAuto: z.number().min(1,"ID auta musi być większe od 0."),
        Pracownik_IdPracownik: z.number().min(1,"ID pracownika musi być większe od 0."),
    },
    defaultMessage("Niepoprawny format")
);

export type Auto_pracownikPayload = z.infer<typeof auto_pracownikSchema>;