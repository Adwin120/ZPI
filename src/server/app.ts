import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bodyParser from "body-parser";
import { validateBody } from "./middleware/zodValidation";
import { KlientPayload, klientSchema } from "../common/klientSchema";

import { authenticate, authorize, getUserData } from "./middleware/firebaseAuth";
import { roleGreaterOrEqual } from "../common/userRoles";
import {PracownikPayload, pracownikSchema } from "../common/pracownikSchema";
import {ZgloszeniePayload, zgloszenieSchema } from "../common/zgloszenieSchema";
import {OptionalZgloszeniePayload, optionalZgloszenieSchema } from "../common/optionalZgloszenieSchema";
import {OptionalPracownikPayload, optionalPracownikSchema } from "../common/optionalPracownikSchema";
import {OptionalKlientPayload, optionalKlientSchema } from "../common/optionalKlientSchema";
import {OptionalAutoPayload, optionalAutoSchema } from "../common/optionalAutoSchema";
import {AutoPayload, autoSchema } from "../common/autoSchema";
import {GrafikPayload, grafikSchema } from "../common/grafikSchema";
import {OptionalGrafikPayload, optionalGrafikSchema } from "../common/optionalGrafikSchema";
import {UmowaPayload, umowaSchema } from "../common/umowaSchema";
import {OptionalUmowaPayload, optionalUmowaSchema } from "../common/optionalUmowaSchema";
import {ModelPayload, modelSchema } from "../common/modelSchema";
import {OptionalModelPayload, optionalModelSchema } from "../common/optionalModelSchema";
import {UslugaPayload, uslugaSchema } from "../common/uslugaSchema";
import {OptionalUslugaPayload, optionalUslugaSchema } from "../common/optionalUslugaSchema"

import mysql, {ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";


const app = express();

// serving the react app on "/"
app.use(express.static("dist/frontend"));
app.use("/panel/*",express.static("dist/frontend"));
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
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono klientow');
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

app.delete('/Klient/:id', async (req: Request, res: Response) => {
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

app.delete('/Pracownik/:id', async (req: Request, res: Response) => {
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

app.get('/Pracownik', async (req: Request, res: Response) => {
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

app.delete('/Zgloszenie/:id', async (req: Request, res: Response) => {
    const zgloszenieID = req.params["id"];

    const [results] = await connection.query<ResultSetHeader>("DELETE FROM Zgloszenie WHERE IdZgloszenie = ?", [zgloszenieID]);
   try {
      console.log(results);
       if (results.affectedRows === 0) {
           return res.status(404).send('Zgloszenie nie zostało znalezione');
       }
       return res.status(200).send("Zgloszenie zostało usunięte");
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas usuwania danych zgloszenia');
   }
});

app.get('/Zgloszenie', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Zgloszenie");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono zgloszen');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych zgloszenia');
    }
});

app.patch(
    "/Zgloszenie/:id",
    validateBody(optionalZgloszenieSchema), 
    async (req: Request, res: Response) => {
        const zgloszenieId = req.params["id"];
        const zgloszenieData = req.body as OptionalZgloszeniePayload; 

        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(zgloszenieData)) {
            if (value !== undefined) {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            return res.status(400).send("Brak danych do aktualizacji");
        }

        const query = `UPDATE Zgloszenie SET ${updates.join(", ")} WHERE IdZgloszenie = ?`;
        values.push(zgloszenieId);

        try {
            const [results] = await connection.query<ResultSetHeader>(query, values);

            if (results.affectedRows === 0) {
                return res.status(404).send("Zgłoszenie nie zostało znalezione");
            }

            return res.status(200).send("Zgłoszenie zostało zaktualizowane");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas aktualizacji zgłoszenia");
        }
    }
);

app.patch(
    "/Pracownik/:id",
    validateBody(optionalPracownikSchema), 
    async (req: Request, res: Response) => {
        const pracownikId = req.params["id"];
        const pracownikData = req.body as OptionalPracownikPayload; 

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

app.patch(
    "/Klient/:id",
    validateBody(optionalKlientSchema), 
    async (req: Request, res: Response) => {
        const klientId = req.params["id"];
        const klientData = req.body as OptionalKlientPayload; 

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

app.post(
    "/Auto",
    validateBody(autoSchema),
    async (req: Request, res: Response) => {
        const autoData = req.body as AutoPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Auto ( Model_IdModel, Klient_IdKlient, Rejestracja, Czas_rozpoczecia, Czas_zakonczenia, Dodatkowe_informacje) VALUES ( ?, ?, ?, ?, ?, ?)",
             [ autoData.Model_IdModel, autoData.Klient_IdKlient, autoData.Rejestracja, autoData.Czas_rozpoczecia , autoData.Czas_zakonczenia, autoData.Dodatkowe_informacje]);

            res.status(200).send("Dane z formularza dla auta zostały odebrane");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania auta");
        }
    }
);

app.get('/Auto', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Auto");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono aut');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych aut');
    }
});

app.get('/Auto/:id', async (req: Request, res: Response) => {
    const autoId = req.params["id"];

    const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Auto WHERE IdAuto = ?", [autoId]);
   try {
      console.log(results);
       if (results.length === 0) {
           return res.status(404).send('Auto nie został znalezione');
       }
      return res.json(results[0]);
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas pobierania danych auta');
   }
});

app.delete('/Auto/:id', async (req: Request, res: Response) => {
    const autoId = req.params["id"];

    const [results] = await connection.query<ResultSetHeader>("DELETE FROM Auto WHERE IdAuto = ?", [autoId]);
   try {
      console.log(results);
       if (results.affectedRows === 0) {
           return res.status(404).send('Auto nie został znalezione');
       }
       return res.status(200).send("Auto zostało usunięte");
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas usuwania danych auta');
   }
});

app.patch(
    "/Auto/:id",
    validateBody(optionalAutoSchema), 
    async (req: Request, res: Response) => {
        const autoId = req.params["id"];
        const autoData = req.body as OptionalAutoPayload; 

        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(autoData)) {
            if (value !== undefined) {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            return res.status(400).send("Brak danych do aktualizacji");
        }

        const query = `UPDATE Auto SET ${updates.join(", ")} WHERE IdAuto = ?`;
        values.push(autoId);

        try {
            const [results] = await connection.query<ResultSetHeader>(query, values);

            if (results.affectedRows === 0) {
                return res.status(404).send("Auto nie został znalezione");
            }

            return res.status(200).send("Auto zostało zaktualizowane");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas aktualizacji auta");
        }
    }
);

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
    validateBody(optionalGrafikSchema), 
    async (req: Request, res: Response) => {
        const grafikId = req.params["id"];
        const grafikData = req.body as OptionalGrafikPayload; 

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

            res.status(200).send("Dane z formularza dla umowy zostały odebrane");
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
    validateBody(optionalUmowaSchema), 
    async (req: Request, res: Response) => {
        const umowaId = req.params["id"];
        const umowaData = req.body as OptionalUmowaPayload; 

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
    validateBody(optionalModelSchema), 
    async (req: Request, res: Response) => {
        const modelId = req.params["id"];
        const modelData = req.body as OptionalModelPayload; 

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

app.post(
    "Usluga",
    validateBody(uslugaSchema),
    async (req: Request, res: Response) => {
        const uslugaData = req.body as UslugaPayload;
        const user = getUserData(res);
        console.log("user:", user);
        try {
            const dbConnection = await connection;
            await dbConnection.query("INSERT INTO Usluga ( Opis, Nazwa) VALUES ( ?, ?)",
             [ uslugaData.Opis, uslugaData.Nazwa ]);

            res.status(200).send("Dane z formularza dla uslugi zostały odebrane");
        } catch (error) {
            console.error(error);
            res.status(500).send("Wystąpił błąd podczas zapisywania uslugi");
        }
    }
);

app.get('Usluga', async (req: Request, res: Response) => {
    try {
        const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Usluga");
        if (results.length === 0) {
            return res.status(200).send('Nie znaleziono uslug');
        }
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Wystąpił błąd podczas pobierania danych uslug');
    }
});

app.get('Usluga/:id', async (req: Request, res: Response) => {
    const uslugaId = req.params["id"];

    const [results] = await connection.query<RowDataPacket[]>("SELECT * FROM Usluga WHERE IdUsluga = ?", [uslugaId]);
   try {
      console.log(results);
       if (results.length === 0) {
           return res.status(404).send('Usluga nie została znaleziona');
       }
      return res.json(results[0]);
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas pobierania danych uslugi');
   }
});

app.delete('Usluga/:id', async (req: Request, res: Response) => {
    const uslugaId = req.params["id"];

    const [results] = await connection.query<ResultSetHeader>("DELETE FROM Usluga WHERE IdUsluga = ?", [uslugaId]);
   try {
      console.log(results);
       if (results.affectedRows === 0) {
           return res.status(404).send('Usluga nie została znaleziona');
       }
       return res.status(200).send("Usluga została usunięta");
   } catch (error) {
       console.error(error);
       return res.status(500).send('Wystąpił błąd podczas usuwania danych uslugi');
   }
});

app.patch(
    "Usluga/:id",
    validateBody(optionalUslugaSchema), 
    async (req: Request, res: Response) => {
        const uslugaId = req.params["id"];
        const uslugaData = req.body as OptionalUslugaPayload; 

        const updates = [];
        const values = [];
        for (const [key, value] of Object.entries(uslugaData)) {
            if (value !== undefined) {
                updates.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (updates.length === 0) {
            return res.status(400).send("Brak danych do aktualizacji");
        }

        const query = `UPDATE Usluga SET ${updates.join(", ")} WHERE IdUsluga= ?`;
        values.push(uslugaId);

        try {
            const [results] = await connection.query<ResultSetHeader>(query, values);

            if (results.affectedRows === 0) {
                return res.status(404).send("Usluga nie została znaleziona");
            }

            return res.status(200).send("Usluga została zaktualizowana");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Wystąpił błąd podczas aktualizacji uslugi");
        }
    }
);

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

