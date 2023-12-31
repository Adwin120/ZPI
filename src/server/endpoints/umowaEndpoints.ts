import app from "../app";
import {connection} from "../app";
import { Request, Response } from "express";
import { validateBody } from "../middleware/zodValidation";
import { UmowaPayload, umowaSchema } from "../../common/umowaSchema";
import { authenticate, authorize, getUserData } from "../middleware/firebaseAuth";
import {ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { roleGreaterOrEqual } from "../../common/userRoles";

app.post(
    "/Umowa",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "admin")),
    validateBody(umowaSchema),
    async (req: Request, res: Response) => {
        const umowaData = req.body as UmowaPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const partsData_rozpoczecia = umowaData.Data_rozpoczecia.split('-');
            const convertedData_rozpoczecia = `${partsData_rozpoczecia[2]}-${partsData_rozpoczecia[1]}-${partsData_rozpoczecia[0]}`;

            const partsData_zakonczenia = umowaData.Data_zakonczenia.split('-');
            const convertedData_zakonczenia = `${partsData_zakonczenia[2]}-${partsData_zakonczenia[1]}-${partsData_zakonczenia[0]}`;

            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Umowa ( Klient_IdKlient, Data_rozpoczecia, Data_zakonczenia) VALUES ( ?, ?, ?)",
             [ umowaData.Klient_IdKlient, convertedData_rozpoczecia , convertedData_zakonczenia]);

             return res.status(200).send("Umowa została pomyślnie dodana");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas zapisywania umowy");
        }
    }
);

app.get('/Umowa', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "kierownik")), async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>(`
        SELECT 
            U.IdUmowa,
            U.Klient_IdKlient,
            K.Nazwa,
            U.Data_rozpoczecia,
            U.Data_zakonczenia
        FROM db_main.Umowa U LEFT JOIN db_main.Klient K ON U.Klient_IdKlient = K.IdKlient;`);
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych umów');
    }
});

export const getUmowaById = async (id: number | string, res: Response) => {
    const [results] = await connection.query<RowDataPacket[]>(`
    SELECT U.IdUmowa,
        U.Klient_IdKlient,
        K.Nazwa,
        U.Data_rozpoczecia,
        U.Data_zakonczenia
    FROM db_main.Umowa U LEFT JOIN db_main.Klient K ON U.Klient_IdKlient = K.IdKlient
    WHERE U.IdUmowa = ?`, [id]);
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
}

app.get('/Umowa/:id', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "kierownik")), async (req: Request, res: Response) => {
    const umowaId = req.params["id"];
    return await getUmowaById(umowaId!, res);
    
});

export const getContractDetails = async (id: string|number, res: Response) => {
    try {
        const [wersjeUmowyResults] = await connection.query<RowDataPacket[]>(
            `SELECT 
                WU.Umowa_IdUmowa,
                WU.Usluga_IdUsluga,
                U.Nazwa AS NazwaUslugi,
                WU.Cena
            FROM db_main.Wersja_umowy WU
            LEFT JOIN db_main.Usluga U ON WU.Usluga_IdUsluga = U.IdUsluga
            WHERE WU.Umowa_IdUmowa = ?;`, [id]
        );

        return res.json(wersjeUmowyResults);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Wystąpił błąd podczas pobierania wersji umowy dla umowy o ID: ${id}`);
    }
}

app.get('/umowa/:id/wersja_umowy', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "pracownik")), async (req: Request, res: Response) => {
    const idUmowy = req.params["id"];

    return await getContractDetails(idUmowy!, res);
});

app.delete('/Umowa/:id', authenticate, authorize((user) => roleGreaterOrEqual(user["role"], "admin")), async (req: Request, res: Response) => {
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
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "admin")),
    validateBody(umowaSchema.innerType().partial()), 
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