import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bodyParser from "body-parser";
import { validateBody } from "./middleware/zodValidation";
import { KlientPayload, klientSchema } from "../common/klientSchema";
import { authenticate, authorize, getUserData } from "./middleware/firebaseAuth";
import { roleGreaterOrEqual } from "../common/userRoles";

const app = express();

// serving the react app on "/"
app.use(express.static("dist/frontend"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post(
    "/Klient",
    authenticate,
    authorize((user) => roleGreaterOrEqual(user["role"], "pracownik")),
    validateBody(klientSchema),
    (req: Request, res: Response) => {
        const body = req.body as KlientPayload;
        console.log("Dane z formularza dla klienta:", body);

        const user = getUserData(res);
        console.log("user:", user);

        res.status(200).send("Dane z formularza dla klienta zostały odebrane");
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

export default app;
