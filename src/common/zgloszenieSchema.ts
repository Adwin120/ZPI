import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

export const zgloszenieSchema = z.object(
    {
        Pracownik_IdPracownik: z.number().min(1,"ID pracownika musi być większe od 0.").default(0),
        Klient_IdKlient: z.number().min(1,"ID klienta musi być większe od 0.").default(0),
        Opis: z.string().min(1, "Opis jest wymagany.").default(""),
        Status: z.string().min(1, "Status jest wymagany.").default(""),
    },
    defaultMessage("Niepoprawny format")
);

export type ZgloszeniePayload = z.infer<typeof zgloszenieSchema>;
