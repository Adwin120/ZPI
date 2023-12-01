import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import { Auto_uslugaPayload, auto_uslugaSchema } from "../../common/auto_uslugaSchema";
import { authenticate, authorize, getUserData } from "../middleware/firebaseAuth";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { roleGreaterOrEqual } from "../../common/userRoles";

app.post(
    "/Auto_usluga",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "pracownik")),
    validateBody(auto_uslugaSchema),
    async (req: Request, res: Response) => {
        const auto_uslugaData = req.body as Auto_uslugaPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Auto_Usluga ( Auto_IdAuto, Usluga_IdUsluga) VALUES ( ?, ? )",
             [ auto_uslugaData.Auto_IdAuto, auto_uslugaData.Usluga_IdUsluga ]);

            res.status(200).send("Dane dla Auto_usluga zostały dodane pomyślnie");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania danych dla Auto_usluga");
        }
    }
);

app.get('/Auto_usluga',authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "pracownik")), async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Auto_Usluga");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono danych dla Auto_usluga');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych dla Auto_usluga');
    }
});
