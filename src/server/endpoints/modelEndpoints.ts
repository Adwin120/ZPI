import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import { ModelPayload, modelSchema } from "../../common/modelSchema";
import { getUserData } from "../middleware/firebaseAuth";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";

app.post(
    "/Model",
    validateBody(modelSchema),
    async (req: Request, res: Response) => {
        const modelData = req.body as ModelPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Model ( Marka, Model) VALUES ( ?, ?)",
             [ modelData.Marka, modelData.Model ]);

            res.status(200).send("Dane z formularza dla modelu zostały odebrane");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania modelu");
        }
    }
);

app.get('/Model', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Model");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono modeli');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych modeli');
    }
});

app.get('/Model/:id', async (req: Request, res: Response) => {
    const modelId = req.params["id"];

    const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Model WHERE IdModel = ?", [modelId]);
   try {
      console.log(results);
       if (results.length === 0) {
           return res.status(404).send('Model nie został znaleziony');
       }
      return res.json(results[0]);
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas pobierania danych modelu');
   }
});

app.delete('/Model/:id', async (req: Request, res: Response) => {
    const modelId = req.params["id"];

    const [results] = await connection.query<ResultSetHeader>("DELETE FROM Model WHERE IdModel = ?", [modelId]);
   try {
      console.log(results);
       if (results.affectedRows === 0) {
           return res.status(404).send('Model nie został znaleziony');
       }
       return res.status(200).send("Model został usunięty");
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas usuwania danych modelu');
   }
});

app.patch(
    "/Model/:id",
    validateBody(modelSchema.partial()), 
    async (req: Request, res: Response) => {
        const modelId = req.params["id"];
        const modelData = req.body as Partial<ModelPayload>; 

        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(modelData)) {
            if (value !== undefined) {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            return res.status(400).send("Brak danych do aktualizacji");
        }

        const query = `UPDATE Model SET ${updates.join(", ")} WHERE IdModel= ?`;
        values.push(modelId);

        try {
            const [results] = await connection.query<ResultSetHeader>(query, values);

            if (results.affectedRows === 0) {
                return res.status(404).send("Model nie został znaleziony");
            }

            return res.status(200).send("Model został zaktualizowany");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas aktualizacji modelu");
        }
    }
);