import { RequestHandler, Response } from "express";
import firebaseAdmin from "firebase-admin";
import { ServiceAccount, initializeApp } from "firebase-admin/app";

import adminCredentials from "../../../firebase-admin.private.json"

initializeApp({
    credential: firebaseAdmin.credential.cert(adminCredentials as ServiceAccount),
});

export const authenticate: RequestHandler = async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
        res.status(401).send("Brak tokenu uwierzytelniajacego");
        console.log("brak tokenu")
        return;
    }

    const headerParts = headerToken.split(" ");
    if (headerParts.length < 2 || headerParts[0] !== "Bearer" || !headerParts[1]) {
        res.status(401).send("Nieprawidlowy format tokenu uwierzytelniajacego");
        console.log("nieprawidłowy token")
        return;
    }

    const token = headerParts[1];

    try {
        const userData = await firebaseAdmin.auth().verifyIdToken(token);
        res.locals["user"] = userData;
        next();
    } catch (e) {
        console.log("nieuwierzytelniony token")
        res.status(401).send("Blad uwierzytelnienia: Brak dostępu do serwisu");
    }
};

//TODO: add authorize middleware for checking roles, sending 403 on error

export const getUserData = (res: Response) => res.locals["user"];
