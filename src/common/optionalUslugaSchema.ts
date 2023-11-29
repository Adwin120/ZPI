import { z } from "zod";

export const optionalUslugaSchema = z.object(
    {
        Opis: z.string().default("").optional(),
        Nazwa: z.string().default("").optional(),
    },
);

export type OptionalUslugaPayload = z.infer<typeof optionalUslugaSchema>;
