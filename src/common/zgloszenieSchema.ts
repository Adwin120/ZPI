import { z } from "zod";
import { defaultMessage } from "./zodHelpers";
import { AcceptanceStatus } from "./AcceptanceStatus";

export const zgloszenieSchema = z.object(
    {
        Pracownik_IdPracownik: z.number().min(1,"Pracownik jest wymagany"),
        Klient_IdKlient: z.number().min(1,"Klient jest wymagany"),
        Opis: z.string().min(1, "Opis jest wymagany.").default(""),
        // Status: statusSchema.optional().default("przesłane"),
    },
    defaultMessage("Niepoprawny format")
);

export type ZgloszeniePayload = z.infer<typeof zgloszenieSchema>;

export type Zgloszenie = {
    IdZgloszenie: number;
    Opis: string;
    Status: AcceptanceStatus;
    Pracownik_IdPracownik: number;
    Imie: string;
    Nazwisko: string;
    Klient_IdKlient: number;
    NazwaKlienta: string;
}
