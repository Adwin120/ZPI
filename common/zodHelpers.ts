import { RequestHandler } from "express";
import type { ZodIssueOptionalMessage, ZodSchema } from "zod";

export const numeric = /^\d+$/;
export const defaultMessage = (message: string) => ({
    errorMap: (i: ZodIssueOptionalMessage) => ({
        message: i.message ?? message,
    }),
});

export const validateBody =
    (schema: ZodSchema): RequestHandler =>
    (req, res, next) => {
        console.log("body", req.body)
        const parsed = schema.safeParse(req.body)
        if (parsed.success) {
            next();
        } else {
            console.error("blad walidacji", req.path, parsed.error.message)
            const errorObject = parsed.error.errors.map(error => ({
                type: error.code,
                msg: error.message,
                path: error.path
            }))
            res.status(400).json(errorObject)
        }
    };
