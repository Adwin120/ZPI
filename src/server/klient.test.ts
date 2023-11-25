import request from "supertest";

import app from "./app";
import { KlientPayload } from "../common/klientSchema";
import { FieldValidationError, ValidationErrorBody } from "./middleware/zodValidation";
import { getMockBearerTokenWithRole, setupAuthenticationService } from "./testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("pracownik");

describe("Dodawanie Klienta - Testy", () => {
    it("powinno przetworzyć poprawne dane", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "test@test.pl",
                nip: "1234567890",
                telefon: "123456789",
            } satisfies KlientPayload);

        expect(response.status).toBe(200);
        expect(response.text).toBe("Dane z formularza dla klienta zostały odebrane");
    });

    it("nie powinno przetworzyć danych z pustymi polami", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({});
        const body = response.body as ValidationErrorBody;
        const errorFields = body.errors.map((e) => e.path);

        const requiredFields = ["nazwa", "adres", "email", "nip", "telefon"];

        requiredFields.forEach((field) => {
            const fieldError = body.errors.find((error) => error.path === field);
            expect(fieldError).toBeDefined();
        });

        expect(errorFields).toEqual(expect.arrayContaining(requiredFields));
    });

    it("powinien zwrócić błąd, gdy e-mail nie ma znaku @", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "testtest.pl",
                nip: "1234567890",
                telefon: "123456789",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        const emailError = body.errors.filter(
            (blad) => blad.path === "email" && blad.type === "invalid_string"
        );
        expect(emailError.length).toBeGreaterThan(0);
    });

    it("powinien zwrócić błąd, gdy e-mail nie ma znaku .", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "test@testpl",
                nip: "1234567890",
                telefon: "123456789",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        const emailError = body.errors.filter(
            (blad) => blad.path === "email" && blad.type === "invalid_string"
        );
        expect(emailError.length).toBeGreaterThan(0);
    });

    it("powinien zwrócić błąd, gdy e-mail nie ma znaku przed @", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "@test.pl",
                nip: "1234567890",
                telefon: "123456789",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        expect(body.errors).toContainEqual({
            type: "invalid_string",
            path: "email",
            msg: expect.anything(),
        });
    });

    it("powinien zwrócić błąd, gdy e-mail nie ma znaku miedzy @ a .", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "test@.pl",
                nip: "1234567890",
                telefon: "123456789",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        const emailError = body.errors.filter(
            (blad) => blad.path === "email" && blad.type === "invalid_string"
        );
        expect(emailError.length).toBeGreaterThan(0);
    });

    it("powinien zwrócić błąd, gdy e-mail nie ma znaku po . ", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "test@test.",
                nip: "1234567890",
                telefon: "123456789",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        const emailError = body.errors.filter(
            (blad) => blad.path === "email" && blad.type === "invalid_string"
        );
        expect(emailError.length).toBeGreaterThan(0);
    });

    it("powinien zwrócić błąd, gdy telefon jest za krótki", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "test@test.",
                nip: "1234567890",
                telefon: "12345678",
            });

        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        const phoneError = body.errors.filter(
            (blad) => blad.path === "telefon" && blad.type === "too_small"
        );
        expect(phoneError.length).toBeGreaterThan(0);
    });

    it("powinien zwrócić błąd, gdy telefon jest za długi", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "test@test.",
                nip: "1234567890",
                telefon: "1234567890",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        const phoneError = body.errors.filter(
            (blad) => blad.path === "telefon" && blad.type === "too_big"
        );
        expect(phoneError.length).toBeGreaterThan(0);
    });

    it("powinien zwrócić błąd, gdy NIP jest za krótki", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "test@test.",
                nip: "123456789",
                telefon: "123456789",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        const nipError = body.errors.filter(
            (blad) => blad.path === "nip" && blad.type === "too_small"
        );
        expect(nipError.length).toBeGreaterThan(0);
    });

    it("powinien zwrócić błąd, gdy NIP jest za długi", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "Testowy Adres",
                email: "test@test.",
                nip: "12345678900",
                telefon: "123456789",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        const nipError = body.errors.filter(
            (blad) => blad.path === "nip" && blad.type === "too_big"
        );
        expect(nipError.length).toBeGreaterThan(0);
    });

    it("powinien zwrócić błąd, gdy adres jest pusty", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "Testowa Nazwa",
                adres: "",
                email: "test@test.",
                nip: "1234567890",
                telefon: "123456789",
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toContainEqual({
            path: "adres",
            type: "too_small",
            msg: expect.anything(),
        } satisfies FieldValidationError);
    });

    it("powinien zwrócić błąd, gdy nazwa jest pusta", async () => {
        const response = await request(app)
            .post("/Klient")
            .set({ authorization: "Bearer " + mockToken })
            .send({
                nazwa: "",
                adres: "Testowy Adres",
                email: "test@test.",
                nip: "1234567890",
                telefon: "123456789",
            });
        const body = response.body as ValidationErrorBody;

        expect(response.status).toBe(400);
        expect(body.errors).toContainEqual({
            path: "nazwa",
            type: "too_small",
            msg: expect.anything(),
        } satisfies FieldValidationError);
    });
});
