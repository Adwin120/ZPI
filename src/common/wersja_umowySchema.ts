import { z } from "zod";
import { defaultMessage } from "./zodHelpers";

export const wersja_umowySchema = z.object(
    {
        Usluga_IdUsluga: z.number().min(1,"Usługa jest wymagana"),
        Umowa_IdUmowa: z.number().min(1,"Umowa jest wymagana"),
        Cena: z.number().min(0.01,"Cena musi być większa od 0."),
    },
    defaultMessage("Niepoprawny format")
);

export type Wersja_umowyPayload = z.infer<typeof wersja_umowySchema>;
export type Wersja_umowy= {
    Usluga_IdUsluga: number,
    Umowa_IdUmowa: number,
    Cena: number,
}