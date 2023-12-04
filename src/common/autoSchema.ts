import { z } from "zod";

import { defaultMessage } from "./zodHelpers";
import dayjs from "dayjs";
import { DateTimeFormFormat } from "./DateTime";

const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

const datetimeSchema = z.string().refine(
    (value) => {
        return datetimeRegex.test(value);
    },
    {
        message: "Nieprawidłowy format daty i czasu (oczekiwano 'RRRR-MM-DD GG:MM:SS')",
    }
);

export const autoSchema = z
    .object(
        {
            Model_IdModel: z.number().min(1, "Model jest wymagany"),
            Klient_IdKlient: z.number().min(1, "Klient jest wymagany"),
            Rejestracja: z.string().min(1, "Rejestracja jest wymagana.").default(""),
            Czas_rozpoczecia: datetimeSchema,
            Czas_zakonczenia: datetimeSchema.optional(),
            Dodatkowe_informacje: z.string().default(""),
        },
        defaultMessage("Niepoprawny format")
    )
    .refine(
        (obj) => {
            const pred = dayjs(obj.Czas_rozpoczecia, DateTimeFormFormat).isBefore(
                dayjs(obj.Czas_zakonczenia, DateTimeFormFormat)
            );
            console.log("refinement", pred)
            return pred;
        },
        {
            message: "Czas zakończenia nie może być przed czasem rozpoczęcia",
            path: ["Czas_zakonczenia"],
        }
    );

export type AutoPayload = z.infer<typeof autoSchema>;
export type Auto = {
    IdAuto: number;
    Model_IdModel: number;
    Marka: string;
    Model: string;
    Klient_IdKlient: number;
    Klient_nazwa: string;
    Rejestracja: string;
    Czas_rozpoczecia: string;
    Czas_zakonczenia: string;
    Dodatkowe_informacje: string;
    Pracownicy: string;
    Uslugi: string;
};
