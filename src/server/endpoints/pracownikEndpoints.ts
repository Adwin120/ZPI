import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import {PracownikPayload, pracownikSchema } from "../../common/pracownikSchema";
import { authenticate, authorize, getUserData } from "../middleware/firebaseAuth";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { roleGreaterOrEqual } from "../../common/userRoles";

app.post(
    "/Pracownik",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "kierownik")),
    validateBody(pracownikSchema),
    async (req: Request, res: Response) => {
        const pracownikData = req.body as PracownikPayload;

        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Pracownik ( Email, Imie, Nazwisko, Telefon) VALUES ( ?, ?, ?, ?)", 
            [ pracownikData.Email, pracownikData.Imie, pracownikData.Nazwisko, pracownikData.Telefon]);

            res.status(200).send("Pracownik został pomyślnie dodany");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania pracownika");
        }
    }
);

app.get('/Pracownik/:id', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "pracownik")), async (req: Request, res: Response) => {
    const pracownikID = req.params["id"];

    const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Pracownik WHERE IdPracownik = ?", [pracownikID]);
   try {
      console.log(results);
       if (results.length === 0) {
           return res.status(404).send('Pracownik nie został znaleziony');
       }
      return res.json(results[0]);
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas pobierania danych pracownika');
   }
});

app.delete('/Pracownik/:id', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "admin")), async (req: Request, res: Response) => {
    const pracownikID = req.params["id"];

    const [results] = await connection.query<ResultSetHeader>("DELETE FROM Pracownik WHERE IdPracownik = ?", [pracownikID]);
   try {
      console.log(results);
       if (results.affectedRows === 0) {
           return res.status(404).send('Pracownik nie został znaleziony');
       }
       return res.status(200).send("Pracownik został usunięty");
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas usuwania danych pracownika');
   }
});

app.get('/Pracownik', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "pracownik")), async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Pracownik");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono pracownikow');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych pracownika');
    }
});

app.patch(
    "/Pracownik/:id",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "pracownik")),
    validateBody(pracownikSchema.partial()), 
    async (req: Request, res: Response) => {
        const pracownikId = req.params["id"];
        const pracownikData = req.body as Partial<PracownikPayload>; 

        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(pracownikData)) {
            if (value !== undefined) {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            return res.status(400).send("Brak danych do aktualizacji");
        }

        const query = `UPDATE Pracownik SET ${updates.join(", ")} WHERE IdPracownik = ?`;
        values.push(pracownikId);

        try {
            const [results] = await connection.query<ResultSetHeader>(query, values);

            if (results.affectedRows === 0) {
                return res.status(404).send("Pracownik nie został znaleziony");
            }

            return res.status(200).send("Pracownik został zaktualizowany");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas aktualizacji pracownika");
        }
    }
);