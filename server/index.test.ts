import { describe, test, expect } from "@jest/globals";
import request from "supertest";

import app from "./index";

describe("Dodawanie Klienta - Testy", () => {

    it('powinno zwrócić błąd dla pustych pól', async () => {
      const response = await request(app)
        .post('/submit-form')
        .send({ formId: 'form1' });  
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Wszystkie pola muszą być wypełnione!');
    });

    it('powinno zwrócić błąd dla pustych pól', async () => {
        const response = await request(app)
          .post('/submit-form')
          .send({ 
            formId: 'form1', 
            nazwa: 'Testowa Nazwa', 
            adres: 'Testowy Adres',
            nip: '1234567890',
            telefon: '123456789'
          });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('Wszystkie pola muszą być wypełnione!');
      });
  
    it('powinno zwrócić błąd dla nieprawidłowego e-maila', async () => {
      const response = await request(app)
        .post('/submit-form')
        .send({ 
          formId: 'form1', 
          nazwa: 'Testowa Nazwa', 
          adres: 'Testowy Adres',
          email: 'niepoprawnyEmail',
          nip: '1234567890',
          telefon: '123456789'
        });
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Uwzględnij znak "@" w adresie e-mail.');
    });

    it('powinno zwrócić błąd dla nieprawidłowego e-maila', async () => {
        const response = await request(app)
          .post('/submit-form')
          .send({ 
            formId: 'form1', 
            nazwa: 'Testowa Nazwa', 
            adres: 'Testowy Adres',
            email: 'test@testpl',
            nip: '1234567890',
            telefon: '123456789'
          });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('Uwzględnij znak "." w adresie e-mail.');
      });

      it('powinno zwrócić błąd dla nieprawidłowego numeru telefonu', async () => {
        const response = await request(app)
          .post('/submit-form')
          .send({ 
            formId: 'form1', 
            nazwa: 'Testowa Nazwa', 
            adres: 'Testowy Adres',
            email: 'test@test.pl',
            nip: '1234567890',
            telefon: '12345678'
          });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('Nieprawidłowy numer telefonu, telefon musi zawierać 9 cyfr w tym same liczby!');
      });
  
    it('powinno przetworzyć poprawne dane', async () => {
      const response = await request(app)
        .post('/submit-form')
        .send({ 
          formId: 'form1', 
          nazwa: 'Testowa Nazwa', 
          adres: 'Testowy Adres',
          email: 'test@test.pl',
          nip: '1234567890',
          telefon: '123456789'
        });
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Dane przetworzone poprawnie!');
    });
  
  });

describe("Dodawanie Pracownika - Testy", () => {

    it('powinno zwrócić błąd dla pustych pól', async () => {
      const response = await request(app)
        .post('/submit-form')
        .send({ formId: 'form2' });  
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Wszystkie pola muszą być wypełnione!');
    });

    it('powinno zwrócić błąd dla pustych pól', async () => {
        const response = await request(app)
          .post('/submit-form')
          .send({ 
            formId: 'form2', 
            haslo: 'Testowe haslo', 
            imie: 'Jan',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('Wszystkie pola muszą być wypełnione!');
      });
  
    it('powinno zwrócić błąd dla nieprawidłowego e-maila', async () => {
      const response = await request(app)
        .post('/submit-form')
        .send({ 
            formId: 'form2', 
            haslo: 'Testowe haslo', 
            imie: 'Jan',
            email: 'niepoprawnyEmail',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          });
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Uwzględnij znak "@" w adresie e-mail.');
    });

    it('powinno zwrócić błąd dla nieprawidłowego e-maila', async () => {
        const response = await request(app)
          .post('/submit-form')
          .send({ 
            formId: 'form2', 
            haslo: 'Testowe haslo', 
            imie: 'Jan',
            email: 'test@testpl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('Uwzględnij znak "." w adresie e-mail.');
      });

      it('powinno zwrócić błąd dla nieprawidłowego numeru telefonu', async () => {
        const response = await request(app)
          .post('/submit-form')
          .send({ 
            formId: 'form2', 
            haslo: 'Testowe haslo', 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '12345678'
          });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('Nieprawidłowy numer telefonu, telefon musi zawierać 9 cyfr w tym same liczby!');
      });
  
    it('powinno przetworzyć poprawne dane', async () => {
      const response = await request(app)
        .post('/submit-form')
        .send({ 
            formId: 'form2', 
            haslo: 'Testowe haslo', 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Dane przetworzone poprawnie!');
    });
  
  });

describe("Dodawanie Żądania - Testy", () => {

    it('powinno zwrócić błąd dla pustych pól', async () => {
      const response = await request(app)
        .post('/submit-form')
        .send({ formId: 'form3' });
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Wszystkie pola muszą być wypełnione!');
    });

    it('powinno zwrócić błąd dla pustych pól', async () => {
        const response = await request(app)
          .post('/submit-form')
          .send({ 
            formId: 'form3', 
            pracownikID: '12345', 
            klientID: '67890', 
            opis: 'Opis zlecenia'
          });
    
        expect(response.status).toBe(200);
        expect(response.text).toBe('Wszystkie pola muszą być wypełnione!');
      });
  
    it('powinno przetworzyć poprawne dane', async () => {
      const response = await request(app)
        .post('/submit-form')
        .send({ 
          formId: 'form3', 
          pracownikID: '12345', 
          klientID: '67890', 
          opis: 'Opis zlecenia', 
          status: 'Nowe' 
        });
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Dane przetworzone poprawnie!');
    });
  
  });