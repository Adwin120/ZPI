import { z } from "zod";

export const optionalModelSchema = z.object(
    {
        Marka: z.string().default("").optional(),
        Model: z.string().default("").optional(),
    },
);

export type OptionalModelPayload = z.infer<typeof optionalModelSchema>;
