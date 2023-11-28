import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

export const klientSchema = z.object(
    {
        nazwa: z.string().min(1, "nazwa jest wymagana").default(""),
        email: z.string().email("Niepoprawny format adresu e-mail").default(""),
        adres: z.string().min(1, "Adres jest wymagany").default(""),
        nip: z.string().regex(numeric).length(10, "NIP musi mieć 10 cyfr").default(""),
        telefon: z.string().regex(numeric).length(9, "Telefon musi mieć 9 cyfr").default(""),
    },
    defaultMessage("Niepoprawny format")
);

export type KlientPayload = z.infer<typeof klientSchema>;
export type Klient = {
    IdKlient: number,
    Adres: string,
    Email: string,
    NIP: string,
    Nazwa: string,
    Telefon: string
}
