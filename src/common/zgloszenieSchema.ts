import { z } from "zod";
import { defaultMessage, numeric } from "./zodHelpers";

export const zgloszenieSchema = z.object(
    {
        pracownikID: z.number().min(1,"ID pracownika musi być większe od 0.").default(0),
        klientID: z.number().min(1,"ID klienta musi być większe od 0.").default(0),
        opis: z.string().min(1, "Opis jest wymagany.").default(""),
        status: z.enum(["przesłane", "zaakceptowane", "odrzucone"]).default("przesłane"),
    },
    defaultMessage("Niepoprawny format")
);

export type ZgloszeniePayload = z.infer<typeof zgloszenieSchema>;

//TODO: add missing properties
export type Zgloszenie = {
    IdZgloszenie: number,
    Opis: string,
    Status: ZgloszeniePayload["status"]
}
