import request from "supertest";

import app from "./app";

describe("Dodawanie Pracownika - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Pracownik')
      .send({ 
          haslo: 'TestoweHaslo1@', 
          imie: 'Jan',
          email: 'test@test.pl',
          nazwisko: 'Kowalski',
          telefon: '123456789'
        })

    expect(response.status).toBe(200);
    expect(response.text).toBe('Dane z formularza dla pracownika zostały odebrane');
  });

  it('powinien zwrócić błąd, gdy formularz jest pusty', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({})
    
      expect(response.status).toBe(400);

      const requiredFields = ['email', 'haslo','imie','nazwisko','telefon'];
      requiredFields.forEach(field => {
      const fieldError = response.body.errors.find((error: { path: string }) => error.path === field);
      expect(fieldError).toBeDefined(); 
    });
  });
  
    it('powinien zwrócić błąd, gdy hasło ma niepoprawna forme', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'zlehaslo', 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const passwordError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'haslo' && blad.msg === 'Hasło musi zawierać dużą literę i znak specjalny.');
      expect(passwordError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy hasło jest za krótkie', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'haslo', 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const passwordError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'haslo' && blad.msg === 'Hasło musi zawierać dużą literę i znak specjalny.');
      expect(passwordError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy telefon jest za krótki', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '12345678'
          })
  
      expect(response.status).toBe(400);
      const phoneError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'telefon' && blad.msg === 'Telefon musi mieć 9 cyfr.');
      expect(phoneError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy telefon jest za długi', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '1234567890'
          })
  
      expect(response.status).toBe(400);
      const phoneError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'telefon' && blad.msg === 'Telefon musi mieć 9 cyfr.');
      expect(phoneError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy imie nie zostalo podane', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: '',
            email: 'test@test.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const nameError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'imie' && blad.msg === 'Imie jest wymagane.');
      expect(nameError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy nazwisko nie zostalo podane', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: 'Jan',
            email: 'test@test.pl',
            nazwisko: '',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const surnameError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'nazwisko' && blad.msg === 'Nazwisko jest wymagane.');
      expect(surnameError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku @', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: 'Jan',
            email: 'testtest.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
      expect(emailError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku .', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: 'Jan',
            email: 'test@testpl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
      expect(emailError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku przed @', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: 'Jan',
            email: '@test.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
      expect(emailError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku miedzy @ a .', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: 'Jan',
            email: 'test@.pl',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
      expect(emailError.length).toBeGreaterThan(0);
    });

    it('powinien zwrócić błąd, gdy e-mail nie ma znaku po . ', async () => {
      const response = await request(app)
        .post('/Pracownik')
        .send({ 
            haslo: 'TestoweHaslo1@', 
            imie: 'Jan',
            email: 'test@test.',
            nazwisko: 'Kowalski',
            telefon: '123456789'
          })
  
      expect(response.status).toBe(400);
      const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
      expect(emailError.length).toBeGreaterThan(0);
    });

});
