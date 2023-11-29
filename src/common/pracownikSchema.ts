import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

export const pracownikSchema = z.object(
    {
        email: z.string().email("Niepoprawny format adresu e-mail").default(""),
        telefon: z.string().regex(numeric).length(9, "Telefon musi mieć 9 cyfr").default(""),
        imie: z.string().min(1, "Imie jest wymagane.").default(""),
        nazwisko: z.string().min(1, "Nazwisko jest wymagane.").default(""),
    },
    defaultMessage("Niepoprawny format")
);

export type PracownikPayload = z.infer<typeof pracownikSchema>;
export type Pracownik = {
    Imie: string;
    Nazwisko: string;
    Telefon: string;
    Email: string;
    IdPracownik: number
}