import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

export const uslugaSchema = z.object(
    {
        Opis: z.string().min(1, "Opis jest wymagany.").default(""),
        Nazwa: z.string().min(1, "Nazwa jest wymagana.").default(""),
    },
    defaultMessage("Niepoprawny format")
);

export type UslugaPayload = z.infer<typeof uslugaSchema>;