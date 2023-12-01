import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import { KlientPayload, klientSchema } from "../../common/klientSchema";
import { authenticate, authorize, getUserData } from "../middleware/firebaseAuth";
import { roleGreaterOrEqual } from "../../common/userRoles";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";

const getErrorMessage = (error: unknown, defaultMessage: string) => {
    if (typeof error === "object" && error !== null && "message" in error) {
        return error.message as string
    }
    return defaultMessage
}

app.post(
    "/Klient",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "kierownik")),
    validateBody(klientSchema),
    async (req: Request, res: Response) => {
        const klientData = req.body as KlientPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Klient ( Adres, Email, Nazwa, NIP, Telefon) VALUES ( ?, ?, ?, ?, ?)", 
            [ klientData.Adres, klientData.Email, klientData.Nazwa, klientData.NIP , klientData.Telefon]);

            res.status(200).send("Pomyślnie zapisano dane klienta");
        } catch (error) {
            console.error(error);
            res.status(500).send(
                getErrorMessage(error, "Wystąpił błąd podczas zapisywania klienta")
            );
        }
    }
);

app.get('/Klient',authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "kierownik")), async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Klient");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono klientów');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych klientów');
    }
});

app.get('/Klient/:id', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "kierownik")), async (req: Request, res: Response) => {
    const klientId = req.params["id"];

    const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Klient WHERE IdKlient = ?", [klientId]);
   try {
      console.log(results);
       if (results.length === 0) {
           return res.status(404).send('Klient nie został znaleziony');
       }
      return res.json(results[0]);
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas pobierania danych klienta');
   }
});

app.delete('/Klient/:id', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "admin")), async (req: Request, res: Response) => {
    const klientId = req.params["id"];

    const [results] = await connection.query<ResultSetHeader>("DELETE FROM Klient WHERE IdKlient = ?", [klientId]);
   try {
      console.log(results);
       if (results.affectedRows === 0) {
           return res.status(404).send('Klient nie został znaleziony');
       }
       return res.status(200).send("Klient został usunięty");
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas usuwania danych klienta');
   }
});

app.patch(
    "/Klient/:id",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "kierownik")),
    validateBody(klientSchema.partial()), 
    async (req: Request, res: Response) => {
        const klientId = req.params["id"];
        const klientData = req.body as Partial<KlientPayload>; 

        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(klientData)) {
            if (value !== undefined) {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            return res.status(400).send("Brak danych do aktualizacji");
        }

        const query = `UPDATE Klient SET ${updates.join(", ")} WHERE IdKlient = ?`;
        values.push(klientId);

        try {
            const [results] = await connection.query<ResultSetHeader>(query, values);

            if (results.affectedRows === 0) {
                return res.status(404).send("Klient nie został znaleziony");
            }

            return res.status(200).send("Klient został zaktualizowany");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas aktualizacji klienta");
        }
    }
);
