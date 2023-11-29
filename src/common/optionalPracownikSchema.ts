import { z } from "zod";
import { numeric } from "./zodHelpers";

export const optionalPracownikSchema = z.object(
    {
        Email: z.string().email("Niepoprawny format adresu e-mail").default("").optional(),
        Telefon: z.string().regex(numeric).length(9, "Telefon musi mieć 9 cyfr").default("").optional(),
        Imie: z.string().optional(),
        Nazwisko: z.string().optional(),
    },
);

export type OptionalPracownikPayload = z.infer<typeof optionalPracownikSchema>;
