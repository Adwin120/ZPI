import { z } from "zod";

export const optionalZgloszenieSchema = z.object(
    {
        Pracownik_IdPracownik: z.number().min(1,"ID pracownika musi być większe od 0.").default(0).optional(),
        Klient_IdKlient: z.number().min(1,"ID klienta musi być większe od 0.").default(0).optional(),
        Opis: z.string().optional(),
        Status: z.string().optional(),
    },
);

export type OptionalZgloszeniePayload = z.infer<typeof optionalZgloszenieSchema>;
