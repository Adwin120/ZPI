

import mysql from "mysql2/promise";

import dotenv from 'dotenv'
import app from "./app";
dotenv.config();

const port = 3000;

const connection = await mysql.createConnection({
    host: process.env["DB_HOST"],
    user: process.env["DB_USER"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_NAME"],
    ssl: {
        ca: process.env["DB_SSL_CA"],
        cert: process.env["DB_SSL_CERT"],
        key: process.env["DB_SSL_KEY"],
        //TODO: dodatkowa konfiguracja serwera DB może być niezbędna żeby to usunąć
        rejectUnauthorized: false
    }
});
console.log("connected to DB")

const x = await connection.query("SELECT * FROM Auto");
console.log(x)



app.listen(port, () => {
    console.log(`express listening on port ${port}`);
});
