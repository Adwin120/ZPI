import { z } from "zod";
import { defaultMessage } from "./zodHelpers";

export const auto_uslugaSchema = z.object(
    {
        Auto_IdAuto: z.number().min(1,"Auto jest wymagane"),
        Usluga_IdUsluga: z.number().min(1,"Usługa jest wymagana"),
    },
    defaultMessage("Niepoprawny format")
);

export type Auto_uslugaPayload = z.infer<typeof auto_uslugaSchema>;
export type Auto_usluga = {
    Auto_IdAuto: number,
    Usluga_IdUsluga: number
}