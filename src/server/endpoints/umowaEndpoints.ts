import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import { UmowaPayload, umowaSchema } from "../../common/umowaSchema";
import { getUserData } from "../middleware/firebaseAuth";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";

app.post(
    "/Umowa",
    validateBody(umowaSchema),
    async (req: Request, res: Response) => {
        const umowaData = req.body as UmowaPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Umowa ( Klient_IdKlient, Data_rozpoczecia, Data_zakonczenia) VALUES ( ?, ?, ?)",
             [ umowaData.Klient_IdKlient, umowaData.Data_rozpoczecia , umowaData.Data_zakonczenia ]);

            res.status(200).send("Umowa została pomyślnie dodana");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania umowy");
        }
    }
);

app.get('/Umowa', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Umowa");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono umów');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych umów');
    }
});

app.get('/Umowa/:id', async (req: Request, res: Response) => {
    const umowaId = req.params["id"];

    const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Umowa WHERE IdUmowa = ?", [umowaId]);
   try {
      console.log(results);
       if (results.length === 0) {
           return res.status(404).send('Umowa nie została znaleziona');
       }
      return res.json(results[0]);
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas pobierania danych umowy');
   }
});

app.delete('/Umowa/:id', async (req: Request, res: Response) => {
    const umowaId = req.params["id"];

    const [results] = await connection.query<ResultSetHeader>("DELETE FROM Umowa WHERE IdUmowa = ?", [umowaId]);
   try {
      console.log(results);
       if (results.affectedRows === 0) {
           return res.status(404).send('Umowa nie został znaleziona');
       }
       return res.status(200).send("Umowa została usunięta");
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas usuwania danych umowy');
   }
});

app.patch(
    "/Umowa/:id",
    validateBody(umowaSchema.partial()), 
    async (req: Request, res: Response) => {
        const umowaId = req.params["id"];
        const umowaData = req.body as Partial<UmowaPayload>; 

        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(umowaData)) {
            if (value !== undefined) {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            return res.status(400).send("Brak danych do aktualizacji");
        }

        const query = `UPDATE Umowa SET ${updates.join(", ")} WHERE IdUmowa= ?`;
        values.push(umowaId);

        try {
            const [results] = await connection.query<ResultSetHeader>(query, values);

            if (results.affectedRows === 0) {
                return res.status(404).send("Umowa nie została znaleziona");
            }

            return res.status(200).send("Umowa została zaktualizowana");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas aktualizacji umowy");
        }
    }
);