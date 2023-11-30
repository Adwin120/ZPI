import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import { GrafikPayload, grafikSchema } from "../../common/grafikSchema";
import { getUserData } from "../middleware/firebaseAuth";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";

app.post(
    "/Grafik",
    validateBody(grafikSchema),
    async (req: Request, res: Response) => {
        const grafikData = req.body as GrafikPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Grafik ( Pracownik_IdPracownik, Klient_IdKlient, Czas_rozpoczecia, Czas_zakonczenia, Status) VALUES ( ?, ?, ?, ?, ?)",
             [ grafikData.Pracownik_IdPracownik, grafikData.Klient_IdKlient, grafikData.Czas_rozpoczecia , grafikData.Czas_zakonczenia, grafikData.Status]);

            res.status(200).send("Dane z formularza dla grafiku zostały odebrane");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania grafiku");
        }
    }
);

app.get('/Grafik', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Grafik");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono grafikow');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych grafikow');
    }
});

app.get('/Grafik/:id', async (req: Request, res: Response) => {
    const grafikId = req.params["id"];

    const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Grafik WHERE IdGrafik = ?", [grafikId]);
   try {
      console.log(results);
       if (results.length === 0) {
           return res.status(404).send('Grafik nie został znaleziony');
       }
      return res.json(results[0]);
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas pobierania danych grafiku');
   }
});

app.delete('/Grafik/:id', async (req: Request, res: Response) => {
    const grafikId = req.params["id"];

    const [results] = await connection.query<ResultSetHeader>("DELETE FROM Grafik WHERE IdGrafik = ?", [grafikId]);
   try {
      console.log(results);
       if (results.affectedRows === 0) {
           return res.status(404).send('Grafik nie został znaleziony');
       }
       return res.status(200).send("Grafik został usunięty");
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas usuwania danych grafiku');
   }
});

app.patch(
    "/Grafik/:id",
    validateBody(grafikSchema.partial()), 
    async (req: Request, res: Response) => {
        const grafikId = req.params["id"];
        const grafikData = req.body as Partial<GrafikPayload>; 

        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(grafikData)) {
            if (value !== undefined) {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            return res.status(400).send("Brak danych do aktualizacji");
        }

        const query = `UPDATE Grafik SET ${updates.join(", ")} WHERE IdGrafik = ?`;
        values.push(grafikId);

        try {
            const [results] = await connection.query<ResultSetHeader>(query, values);

            if (results.affectedRows === 0) {
                return res.status(404).send("Grafik nie został znaleziony");
            }

            return res.status(200).send("Grafik został zaktualizowany");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas aktualizacji grafiku");
        }
    }
);