import { RequestHandler, Response } from "express";
import { credential, auth } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

//TODO: add credentials
initializeApp({
    credential: credential.cert({}),
});

export const authenticate: RequestHandler = async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
        res.status(401).send("Brak tokenu uwierzytelniajacego");
        return;
    }

    const headerParts = headerToken.split(" ");
    if (headerParts.length < 2 || headerParts[0] !== "Bearer" || !headerParts[1]) {
        res.status(401).send("Nieprawidlowy format tokenu uwierzytelniajacego");
        return;
    }

    const token = headerParts[1];

    try {
        const userData = await auth().verifyIdToken(token);
        res.locals["user"] = userData;
        next();
    } catch (e) {
        res.status(401).send("Blad uwierzytelnienia: Brak dostępu do serwisu");
    }
};

//TODO: add authorize middleware for checking roles, sending 403 on error

export const getUserData = (res: Response) => res.locals["user"];
