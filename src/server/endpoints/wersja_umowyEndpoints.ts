import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import { Wersja_umowyPayload, wersja_umowySchema } from "../../common/wersja_umowySchema";
import { authenticate, authorize, getUserData } from "../middleware/firebaseAuth";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { roleGreaterOrEqual } from "../../common/userRoles";

app.post(
    "/Wersja_umowy",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "admin")),
    validateBody(wersja_umowySchema),
    async (req: Request, res: Response) => {
        const wersja_umowyData = req.body as Wersja_umowyPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Wersja_umowy ( Usluga_IdUsluga, Umowa_IdUmowa, Cena) VALUES ( ?, ?, ?)",
             [ wersja_umowyData.Usluga_IdUsluga, wersja_umowyData.Umowa_IdUmowa , wersja_umowyData.Cena ]);

            res.status(200).send("Wersja umowy została pomyślnie dodana");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania wersji umowy");
        }
    }
);

app.get(
    '/Wersja_umowy',
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "kierownik")),
    async (req: Request, res: Response) => {
        try {
            const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Wersja_umowy");
            if (results.length === 0) {
                return res.status(200).send('Nie znaleziono wersji umowy');
            }
            return res.json(results);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Wystąpił błąd podczas pobierania danych wersji umowy');
        }
    }
);
