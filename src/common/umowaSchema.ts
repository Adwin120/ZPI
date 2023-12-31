import { z } from "zod";
import { defaultMessage } from "./zodHelpers";
import { DateTimeFormFormat } from "./DateTime";
import dayjs from "dayjs";

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

const dateSchema = z.string(defaultMessage("Podanie daty jest wymagane.")).refine((value) => {
    console.log("date", value)
    return dateRegex.test(value);
}, {
    message: "Nieprawidłowy format daty (oczekiwano 'DD-MM-RRRR').",
});

export const umowaSchema = z.object(
    {
        Klient_IdKlient: z.number(defaultMessage("Klient jest wymagany.")).min(1,"ID klienta musi być większe od 0."),
        Data_rozpoczecia: dateSchema,
        Data_zakonczenia: dateSchema,
    },
    defaultMessage("Niepoprawny format")
).refine(
    (obj) => {
        const pred = dayjs(obj.Data_rozpoczecia, "DD-MM-YYYY").isBefore(
            dayjs(obj.Data_zakonczenia, "DD-MM-YYYY")
        );
        // console.log("refinement", obj.Data_rozpoczecia, obj.Data_zakonczenia, dayjs(obj.Data_rozpoczecia, "DD-MM-YYYY").format("DD-MM-YYYY"), dayjs(obj.Data_zakonczenia, "DD-MM-YYYY").format())
        return pred;
    },
    {
        message: "Czas zakończenia nie może być przed czasem rozpoczęcia",
        path: ["Czas_zakonczenia"],
    }
);

export type UmowaPayload = z.infer<typeof umowaSchema>;
export type Umowa = {
    IdUmowa: number;
    Klient_IdKlient: number;
    Data_rozpoczecia: string;
    Data_zakonczenia: string;
    Nazwa: string;
}