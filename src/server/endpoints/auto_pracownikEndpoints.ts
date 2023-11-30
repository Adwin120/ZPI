import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import { Auto_pracownikPayload, auto_pracownikSchema } from "../../common/auto_pracownikSchema";
import { getUserData } from "../middleware/firebaseAuth";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";

app.post(
    "/Auto_pracownik",
    validateBody(auto_pracownikSchema),
    async (req: Request, res: Response) => {
        const auto_pracownikData = req.body as Auto_pracownikPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Auto_Pracownik ( Auto_IdAuto, Pracownik_IdPracownik) VALUES ( ?, ? )",
             [ auto_pracownikData.Auto_IdAuto, auto_pracownikData.Pracownik_IdPracownik ]);

            res.status(200).send("Dane z formularza dla auto_pracownik zostały odebrane");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania auto_pracownik");
        }
    }
);

app.get('/Auto_pracownik', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Auto_Pracownik");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono auto_pracownik');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych auto_pracownik');
    }
});
