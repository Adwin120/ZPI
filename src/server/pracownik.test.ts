import request from "supertest";

import app from "./app";
import { PracownikPayload } from "../common/pracownikSchema";
import { FieldValidationError, ValidationErrorBody } from "../common/zodHelpers";

describe("Dodawanie Pracownika - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Pracownik')
      .send({  
          imie: 'Jan',
          email: 'test@test.pl',
          nazwisko: 'Kowalski',
          telefon: '123456789'
        }satisfies PracownikPayload)

    expect(response.status).toBe(200);
    expect(response.text).toBe('Dane z formularza dla pracownika zostały odebrane');
  });

  it('powinien zwrócić błąd, gdy formularz jest pusty', async () => {
      const response = await request(app).post('/Pracownik').send({})
      const body = response.body as ValidationErrorBody;
      const errorFields = body.errors.map((e) => e.path);

      const requiredFields = ["telefon", "email", "imie", "nazwisko"];

        requiredFields.forEach((field) => {
            const fieldError = body.errors.find((error) => error.path === field);
            expect(fieldError).toBeDefined();
        });

        expect(errorFields).toEqual(expect.arrayContaining(requiredFields));
  });
  
    it('powinien zwrócić błąd, gdy telefon jest za krótki', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '12345678'
          })
          const body = response.body as ValidationErrorBody;
  
      expect(response.status).toBe(400);
      const phoneError = body.errors.filter(
        (blad) => blad.path === "telefon" && blad.type === "too_small"
    );
      expect(phoneError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy telefon jest za długi', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '1234567890'
          })
          const body = response.body as ValidationErrorBody;
  
          expect(response.status).toBe(400);
          const phoneError = body.errors.filter(
            (blad) => blad.path === "telefon" && blad.type === "too_big"
        );
          expect(phoneError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy imie nie zostalo podane', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            imie: '',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
          const body = response.body as ValidationErrorBody;
  
          expect(response.status).toBe(400);
          const nameError = body.errors.filter(
            (blad) => blad.path === "imie" && blad.type === "too_small"
        );
          expect(nameError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy nazwisko nie zostalo podane', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: '',
            telefon: '123456789'
          })
          const body = response.body as ValidationErrorBody;
  
          expect(response.status).toBe(400);
          const surnamenameError = body.errors.filter(
            (blad) => blad.path === "nazwisko" && blad.type === "too_small"
        );
          expect(surnamenameError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku @', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            imie: 'Jan',
            email: 'testtest.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
          const body = response.body as ValidationErrorBody;
  
          expect(response.status).toBe(400);
          const emailError = body.errors.filter(
              (blad) => blad.path === "email" && blad.type === "invalid_string"
          );
          expect(emailError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku .', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            imie: 'Jan',
            email: 'test@testpl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
          const body = response.body as ValidationErrorBody;
  
          expect(response.status).toBe(400);
          const emailError = body.errors.filter(
              (blad) => blad.path === "email" && blad.type === "invalid_string"
          );
          expect(emailError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku przed @', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            imie: 'Jan',
            email: '@test.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
          const body = response.body as ValidationErrorBody;
  
          expect(response.status).toBe(400);
          const emailError = body.errors.filter(
              (blad) => blad.path === "email" && blad.type === "invalid_string"
          );
          expect(emailError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku miedzy @ a .', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            imie: 'Jan',
            email: 'test@.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
          const body = response.body as ValidationErrorBody;
  
          expect(response.status).toBe(400);
          const emailError = body.errors.filter(
              (blad) => blad.path === "email" && blad.type === "invalid_string"
          );
          expect(emailError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku po . ', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({
            imie: 'Jan',
            email: 'test@test.',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
          const body = response.body as ValidationErrorBody;
  
          expect(response.status).toBe(400);
          const emailError = body.errors.filter(
              (blad) => blad.path === "email" && blad.type === "invalid_string"
          );
          expect(emailError.length).toBeGreaterThan(0);
    });

});

describe('Pobieranie danych Pracownika - Testy', () => {
  it('powinno zwrócić dane pracownika dla istniejącego ID', async () => {
   
      const IdPracownik = 1; 
      const Imie = 'Jan'; 
      const Email = 'jan.kowalski@example.com'; 
      const Nazwisko = 'Kowalski'; 
      const Telefon = "+48 123 456 789"; 

      const response = await request(app)
          .get(`/Pracownik/${IdPracownik}`);

      console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('IdPracownik', IdPracownik);
      expect(response.body).toHaveProperty('Imie', Imie);
      expect(response.body).toHaveProperty('Nazwisko', Nazwisko);
      expect(response.body).toHaveProperty('Email', Email);
      expect(response.body).toHaveProperty('Telefon', Telefon);
  });

  it('powinno zwrócić błąd 404 dla nieistniejącego ID klienta', async () => {
      const nieistniejaceID = 0; 

      const response = await request(app)
          .get(`/Pracownik/${nieistniejaceID}`);

      expect(response.status).toBe(404);
      expect(response.text).toBe('Pracownik nie został znaleziony');
  });

  it('powinno zwrócić dane pracownikow', async () => {
   
    const IdPracownik = 1; 
    const Imie = 'Jan'; 
    const Email = 'jan.kowalski@example.com'; 
    const Nazwisko = 'Kowalski'; 
    const Telefon = "+48 123 456 789";

    const response = await request(app)
        .get(`/Pracownik`);

    console.log(response.body)
    expect(response.body).toBeInstanceOf(Array);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('IdPracownik', IdPracownik);
    expect(response.body[0]).toHaveProperty('Imie', Imie);
    expect(response.body[0]).toHaveProperty('Nazwisko', Nazwisko);
    expect(response.body[0]).toHaveProperty('Email', Email);
    expect(response.body[0]).toHaveProperty('Telefon', Telefon);

    const IdPracownik_20 = 20; 
    const Imie_20 = 'Marta'; 
    const Email_20 = 'marta.kowalska@example.com'; 
    const Nazwisko_20 = 'Kowalska'; 
    const Telefon_20 = "+48 123 901 234";

    expect(response.status).toBe(200);
    expect(response.body[19]).toHaveProperty('IdPracownik', IdPracownik_20);
    expect(response.body[19]).toHaveProperty('Imie', Imie_20);
    expect(response.body[19]).toHaveProperty('Nazwisko', Nazwisko_20);
    expect(response.body[19]).toHaveProperty('Email', Email_20);
    expect(response.body[19]).toHaveProperty('Telefon', Telefon_20);
});

});