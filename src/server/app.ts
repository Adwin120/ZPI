import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { validateBody } from "./middleware/zodValidation";
import { KlientPayload, klientSchema } from "../common/klientSchema";

import { authenticate, authorize, getUserData } from "./middleware/firebaseAuth";
import { roleGreaterOrEqual } from "../common/userRoles";
import {PracownikPayload, pracownikSchema } from "../common/pracownikSchema";
import {ZgloszeniePayload, zgloszenieSchema } from "../common/zgloszenieSchema";

import mysql, { RowDataPacket } from "mysql2/promise";


const app = express();

// serving the react app on "/"
app.use(express.static("dist/frontend"));
app.use("/panel/*",express.static("dist/frontend"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getErrorMessage = (error: unknown, defaultMessage: string) => {
    if (typeof error === "object" && error !== null && "message" in error) {
        return error.message as string
    }
    return defaultMessage
}

app.post(
    "/Klient",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "pracownik")),
    validateBody(klientSchema),
    async (req: Request, res: Response) => {
        const klientData = req.body as KlientPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Klient ( Adres, Email, Nazwa, NIP, Telefon) VALUES ( ?, ?, ?, ?, ?)", [ klientData.adres, klientData.email, klientData.nazwa, klientData.nip , klientData.telefon]);

            res.status(200).send("Pomyślnie zapisano dane klienta");
        } catch (error) {
            console.error(error);
            res.status(500).send(
                getErrorMessage(error, "Wystąpił błąd podczas zapisywania klienta")
            );
        }
    }
);

app.post(
    "/Pracownik",
    validateBody(pracownikSchema),
    async (req: Request, res: Response) => {
        const pracownikData = req.body as PracownikPayload;

        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Pracownik ( Email, Imie, Nazwisko, Telefon) VALUES ( ?, ?, ?, ?)", [ pracownikData.email, pracownikData.imie, pracownikData.nazwisko, pracownikData.telefon]);

            res.status(200).send("Dane z formularza dla pracownika zostały odebrane");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania pracownika");
        }
    }
);

app.post(
    "/Zgloszenie",
    validateBody(zgloszenieSchema),
    async (req: Request, res: Response) => {
        const zgloszenieData = req.body as ZgloszeniePayload;

        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Zgloszenie ( Pracownik_IdPracownik, Klient_IdKlient, Opis, Status) VALUES ( ?, ?, ?, ?)", [ zgloszenieData.pracownikID, zgloszenieData.klientID, zgloszenieData.opis, zgloszenieData.status]);

            res.status(200).send("Dane z formularza dla zgloszenia zostały odebrane");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania zgloszenia");
        }
    }
);


app.get('/Klient', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Klient");
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych klientow');
    }
});

app.get('/Klient/:id', async (req: Request, res: Response) => {
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


app.get('/Pracownik/:id', async (req: Request, res: Response) => {
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

app.get('/Pracownik', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Pracownik");
        if (results.length === 0) {
            return res.status(404).send('Nie znaleziono pracownikow');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych pracownika');
    }
});

app.get('/Zgloszenie/:id', async (req: Request, res: Response) => {
    const zgloszenieID = req.params["id"];

    const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Zgloszenie WHERE Pracownik_IdPracownik = ?", [zgloszenieID]);
   try {
      console.log(results);
       if (results.length === 0) {
           return res.status(404).send('Zgloszenie nie zostało znalezione');
       }
      return res.json(results[0]);
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas pobierania danych zgloszenia');
   }
});

app.get('/Zgloszenie', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Zgloszenie");
        if (results.length === 0) {
            return res.status(404).send('Nie znaleziono zgloszen');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych zgloszenia');
    }
});

const connection = await mysql.createConnection({
    host: process.env["DB_HOST"],
    user: process.env["DB_USER"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_NAME"],
    // ssl: {
    //     ca: process.env["DB_SSL_CA"],
    //     cert: process.env["DB_SSL_CERT"],
    //     key: process.env["DB_SSL_KEY"],
    //     rejectUnauthorized:false
    // },
});
console.log("connected to DB");

export default app;

