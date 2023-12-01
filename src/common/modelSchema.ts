import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

export const modelSchema = z.object(
    {
        Marka: z.string().min(1, "Marka jest wymagana.").default(""),
        Model: z.string().min(1, "Model jest wymagany.").default(""),
    },
    defaultMessage("Niepoprawny format")
);

export type ModelPayload = z.infer<typeof modelSchema>;