import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

export const zgloszenieSchema = z.object(
    {
        pracownikID: z.number().min(1,"ID pracownika musi być większe od 0.").default(0),
        klientID: z.number().min(1,"ID klienta musi być większe od 0.").default(0),
        opis: z.string().min(1, "Opis jest wymagany.").default(""),
        status: z.string().min(1, "Status jest wymagany.").default(""),
    },
    defaultMessage("Niepoprawny format")
);

export type ZgloszeniePayload = z.infer<typeof zgloszenieSchema>;
