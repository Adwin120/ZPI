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

describe('Pobieranie danych Klienta - Testy', () => {
    it('powinno zwrócić dane klienta dla istniejącego ID', async () => {
     
        const IdKlient = 1; 
        const Adres = 'ul. Auto-Moto 1, 00-001 Warszawa'; 
        const Email = 'warszawa.auto@example.com'; 
        const Nazwa = 'Auto-Moto Warszawa'; 
        const NIP = "1234567890"; 
        const Telefon = "+48 123 456 789"; 
  
        const response = await request(app)
            .get(`/Klient/${IdKlient}`);
  
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('IdKlient', IdKlient);
        expect(response.body).toHaveProperty('Adres', Adres);
        expect(response.body).toHaveProperty('Email', Email);
        expect(response.body).toHaveProperty('Nazwa', Nazwa);
        expect(response.body).toHaveProperty('NIP', NIP);
        expect(response.body).toHaveProperty('Telefon', Telefon);
    });
  
    it('powinno zwrócić błąd 404 dla nieistniejącego ID klienta', async () => {
        const nieistniejaceID = 0; 
  
        const response = await request(app)
            .get(`/Klient/${nieistniejaceID}`);
  
        expect(response.status).toBe(404);
        expect(response.text).toBe('Klient nie został znaleziony');
    });
  
    it('powinno zwrócić dane klientów', async () => {
     
      const IdKlient1 = 1; 
      const Adres1 = 'ul. Auto-Moto 1, 00-001 Warszawa'; 
      const Email1 = 'warszawa.auto@example.com'; 
      const Nazwa1 = 'Auto-Moto Warszawa'; 
      const NIP1 = "1234567890"; 
      const Telefon1 = "+48 123 456 789"; 
  
      const response = await request(app)
          .get(`/Klient`);
  
      console.log(response.body)
      expect(response.body).toBeInstanceOf(Array);
  
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('IdKlient', IdKlient1);
      expect(response.body[0]).toHaveProperty('Adres', Adres1);
      expect(response.body[0]).toHaveProperty('Email', Email1);
      expect(response.body[0]).toHaveProperty('Nazwa', Nazwa1);
      expect(response.body[0]).toHaveProperty('NIP', NIP1);
      expect(response.body[0]).toHaveProperty('Telefon', Telefon1);
  
      const IdKlient10 = 10; 
      const Adres10 = 'ul. AutoSpeed 10, 99-010 Bydgoszcz'; 
      const Email10 = 'autospeed.bydgoszcz@example.com'; 
      const Nazwa10 = 'AutoSpeed Bydgoszcz'; 
      const NIP10 = "4567123456"; 
      const Telefon10 = "+48 456 712 345"; 
  
      expect(response.status).toBe(200);
      expect(response.body[9]).toHaveProperty('IdKlient', IdKlient10);
      expect(response.body[9]).toHaveProperty('Adres', Adres10);
      expect(response.body[9]).toHaveProperty('Email', Email10);
      expect(response.body[9]).toHaveProperty('Nazwa', Nazwa10);
      expect(response.body[9]).toHaveProperty('NIP', NIP10);
      expect(response.body[9]).toHaveProperty('Telefon', Telefon10);
  });
  
});

// describe('Usuwanie danych Klienta - Testy', () => {
    
//     it('powinno usunąć klienta o podanym id', async () => {
//         const IdKlient1 = 11;  
//         const response = await request(app).delete(`/Klient/${IdKlient1}`);

//         expect(response.statusCode).toBe(200);
//         expect(response.text).toBe("Klient został usunięty");
//     });

//     it('powinno zwrócić błąd 404 dla nieistniejącego ID klienta', async () => {
//         const nieistniejaceID = 0; 
//         const response = await request(app).delete(`/Klient/${nieistniejaceID}`);
  
//         expect(response.status).toBe(404);
//         expect(response.text).toBe('Klient nie został znaleziony');
//     });
// });

