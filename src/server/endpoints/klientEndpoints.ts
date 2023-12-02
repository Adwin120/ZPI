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

app.get('/Klient/:email/auto', authenticate, async (req: Request, res: Response) => {
    const emailParam = req.params["email"];

    if (!emailParam) {
        return res.status(400).send("Email jest wymagany");
    }

    const email = decodeURIComponent(emailParam);
    const user = getUserData(res);

    if (!user || !user.email) {
        return res.status(403).send("Brak uprawnień lub błąd autentykacji");
    }

    if (user.email !== email) {
        return res.status(403).send("Brak uprawnień do przeglądania aut");
    }

    try {
        const [klientResults] = await connection.query<RowDataPacket[]>("SELECT IdKlient FROM Klient WHERE Email = ?", [email]);

        if (klientResults.length === 0 || !klientResults[0]) {
            return res.status(404).send('Klient o podanym emailu nie został znaleziony');
        }

        const pracownikID = klientResults[0]['IdKlient'];

        const [autoResults] = await connection.query<RowDataPacket[]>(
           `WITH A AS (
            SELECT A.IdAuto AS IdAuto,
                A.Klient_IdKlient AS IdKlient,
                A.Model_IdModel AS IdModel,
                A.Rejestracja AS Rejestracja,
                M.Marka AS Marka, 
                M.Model AS Model,
                A.Czas_rozpoczecia AS Czas_rozpoczecia,
                IFNULL(A.Czas_zakonczenia, 'W trakcie') AS Czas_zakonczenia,
                K.Nazwa AS Klient_nazwa
            FROM db_main.Auto A
            LEFT JOIN db_main.Klient K ON A.Klient_IdKlient = K.IdKlient
            LEFT JOIN db_main.Model M ON A.Model_IdModel = M.IdModel
            LEFT JOIN db_main.Auto_Pracownik AP ON A.IdAuto = AP.Auto_IdAuto
            LEFT JOIN db_main.Pracownik P ON AP.Pracownik_IdPracownik = P.IdPracownik
            WHERE A.Klient_IdKlient = ?
            GROUP BY A.IdAuto, A.Klient_IdKlient
        )
        SELECT DISTINCT A.IdAuto,
            A.IdKlient,
            A.IdModel,
            A.Rejestracja,
            A.Marka, 
            A.Model,
            A.Czas_rozpoczecia,
            A.Czas_zakonczenia,
            A.Klient_nazwa,
            GROUP_CONCAT(U.Nazwa SEPARATOR ', ') AS Uslugi,
            IFNULL(SUM(WU.Cena), 0) AS Cena
        FROM A
        LEFT JOIN db_main.Auto_Usluga AU ON A.IdAuto = AU.Auto_IdAuto
        LEFT JOIN db_main.Usluga U ON AU.Usluga_IdUsluga = U.IdUsluga
        LEFT JOIN db_main.Wersja_umowy WU ON U.IdUsluga = WU.Usluga_IdUsluga
        LEFT JOIN db_main.Umowa UM ON WU.Umowa_IdUmowa = UM.IdUmowa
        WHERE ((UM.Klient_IdKlient = A.IdKlient AND A.Czas_zakonczenia BETWEEN UM.Data_rozpoczecia AND UM.Data_zakonczenia)
            OR A.Czas_zakonczenia IS NULL AND A.Czas_rozpoczecia BETWEEN UM.Data_rozpoczecia AND UM.Data_zakonczenia AND UM.Klient_IdKlient = A.IdKlient)
            AND A.IdKlient = ?
        GROUP BY A.IdAuto, A.IdKlient;`, [pracownikID, pracownikID]
        );

        return res.json(autoResults);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania aut');
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
