import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bodyParser from "body-parser";
import { validateBody } from "./middleware/zodValidation";
import { KlientPayload, klientSchema } from "../common/klientSchema";

import { authenticate, authorize, getUserData } from "./middleware/firebaseAuth";
import { roleGreaterOrEqual } from "../common/userRoles";

import mysql, { RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";


const app = express();

// serving the react app on "/"
app.use(express.static("dist/frontend"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

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

            res.status(200).send("Dane z formularza dla klienta zostały odebrane");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania klienta");
        }
    }
);

app.post(
    "/Pracownik",
    [
        body("email")
            .matches(/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/)
            .withMessage("Niepoprawny format adresu e-mail."),
        body("haslo")
            .isLength({ min: 8 })
            .withMessage("Hasło musi mieć przynajmniej 8 znaków.")
            .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/)
            .withMessage("Hasło musi zawierać dużą literę i znak specjalny."),
        body("telefon")
            .matches(/^\d{9}$/)
            .withMessage("Telefon musi mieć 9 cyfr."),
        body("imie").notEmpty().withMessage("Imie jest wymagane."),
        body("nazwisko").notEmpty().withMessage("Nazwisko jest wymagane."),
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            res.status(400).json({ errors: errors.array() });
        }
        console.log("Dane z formularza dla pracownika:", req.body);
        res.send("Dane z formularza dla pracownika zostały odebrane");
    }
);

app.post(
    "/Zadanie",
    [
        body("pracownikID").isInt({ gt: 0 }).withMessage("ID pracownika musi być większe od 0."),
        body("klientID").isInt({ gt: 0 }).withMessage("ID klienta musi być większe od 0."),
        body("opis").notEmpty().withMessage("Opis jest wymagany."),
        body("status").notEmpty().withMessage("Status jest wymagany."),
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        console.log("Dane z formularza dla żądania:", req.body);
        res.send("Dane z formularza dla żądania zostały odebrane");
    }
);


app.get('/Klient', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Klient");
        if (results.length === 0) {
            return res.status(404).send('Nie znaleziono klientow');
        }
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

