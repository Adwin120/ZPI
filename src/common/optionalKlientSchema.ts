import { z } from "zod";
import { numeric } from "./zodHelpers";

export const optionalKlientSchema = z.object(
    {
        Nazwa: z.string().optional(),
        Email: z.string().email("Niepoprawny format adresu e-mail").default("").optional(),
        Adres: z.string().optional(),
        NIP: z.string().regex(numeric).length(10, "NIP musi mieć 10 cyfr").default("").optional(),
        Telefon: z.string().regex(numeric).length(9, "Telefon musi mieć 9 cyfr").default("").optional(),
    }
);

export type OptionalKlientPayload = z.infer<typeof optionalKlientSchema>;
