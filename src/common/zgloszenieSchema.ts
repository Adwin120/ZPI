import { z } from "zod";
import { defaultMessage } from "./zodHelpers";
import { statusSchema } from "./AcceptanceStatus";

export const zgloszenieSchema = z.object(
    {
        Pracownik_IdPracownik: z.number().min(1,"ID pracownika musi być większe od 0."),
        Klient_IdKlient: z.number().min(1,"ID klienta musi być większe od 0."),
        Opis: z.string().min(1, "Opis jest wymagany.").default(""),
        Status: statusSchema.default("przesłane"),
    },
    defaultMessage("Niepoprawny format")
);

export type ZgloszeniePayload = z.infer<typeof zgloszenieSchema>;

export type Zgloszenie = {
    IdZgloszenie: number,
    Opis: string,
    Status: ZgloszeniePayload["Status"]
    Pracownik_IdPracownik: number,
    Klient_IdKlient: number,
}
