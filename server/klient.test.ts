import request from "supertest";

import app from "./index";

describe("Dodawanie Klienta - Testy", () => {

    it('powinno przetworzyć poprawne dane', async () => {
      const response = await request(app)
        .post('/Klient')
        .send({ 
          nazwa: 'Testowa Nazwa', 
          adres: 'Testowy Adres',
          email: 'test@test.pl',
          nip: '1234567890',
          telefon: '123456789'
        });
  
      expect(response.status).toBe(200);
      expect(response.text).toBe('Dane z formularza dla klienta zostały odebrane');
    });
  
    it('nie powinno przetworzyć danych z pustymi polami', async () => {
      const response = await request(app)
        .post('/Klient')
        .send({})
  
        const requiredFields = ['nazwa', 'adres','email','nip','telefon'];
        requiredFields.forEach(field => {
        const fieldError = response.body.errors.find((error: { path: string }) => error.path === field);
        expect(fieldError).toBeDefined();   
    });
  });
  
    it('powinien zwrócić błąd, gdy e-mail nie ma znaku @', async () => {
      const response = await request(app)
        .post('/Klient')
        .send({ 
            nazwa: 'Testowa Nazwa', 
            adres: 'Testowy Adres',
            email: 'testtest.pl',
            nip: '1234567890',
            telefon: '123456789'
            })
    
        expect(response.status).toBe(400);
        const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
        expect(emailError.length).toBeGreaterThan(0);
    });
  
  it('powinien zwrócić błąd, gdy e-mail nie ma znaku .', async () => {
    const response = await request(app)
      .post('/Klient')
      .send({ 
          nazwa: 'Testowa Nazwa', 
          adres: 'Testowy Adres',
          email: 'test@testpl',
          nip: '1234567890',
          telefon: '123456789'
        })
  
    expect(response.status).toBe(400);
    const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
    expect(emailError.length).toBeGreaterThan(0);
  });
  
  it('powinien zwrócić błąd, gdy e-mail nie ma znaku przed @', async () => {
    const response = await request(app)
      .post('/Klient')
      .send({ 
          nazwa: 'Testowa Nazwa', 
          adres: 'Testowy Adres',
          email: '@test.pl',
          nip: '1234567890',
          telefon: '123456789'
        })
  
    expect(response.status).toBe(400);
    const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
    expect(emailError.length).toBeGreaterThan(0);
  });
  
  it('powinien zwrócić błąd, gdy e-mail nie ma znaku miedzy @ a .', async () => {
    const response = await request(app)
      .post('/Klient')
      .send({ 
          nazwa: 'Testowa Nazwa', 
          adres: 'Testowy Adres',
          email: 'test@.pl',
          nip: '1234567890',
          telefon: '123456789'
        })
  
    expect(response.status).toBe(400);
    const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
    expect(emailError.length).toBeGreaterThan(0);
  });
  
  it('powinien zwrócić błąd, gdy e-mail nie ma znaku po . ', async () => {
    const response = await request(app)
      .post('/Klient')
      .send({ 
          nazwa: 'Testowa Nazwa', 
          adres: 'Testowy Adres',
          email: 'test@test.',
          nip: '1234567890',
          telefon: '123456789'
        })
  
    expect(response.status).toBe(400);
    const emailError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'email' && blad.msg === 'Niepoprawny format adresu e-mail.');
    expect(emailError.length).toBeGreaterThan(0);
  });

  it('powinien zwrócić błąd, gdy telefon jest za krótki', async () => {
    const response = await request(app)
    .post('/Klient')
    .send({ 
        nazwa: 'Testowa Nazwa', 
        adres: 'Testowy Adres',
        email: 'test@test.',
        nip: '1234567890',
        telefon: '12345678'
      })

    expect(response.status).toBe(400);
    const phoneError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'telefon' && blad.msg === 'Telefon musi mieć 9 cyfr.');
    expect(phoneError.length).toBeGreaterThan(0);
  });

  it('powinien zwrócić błąd, gdy telefon jest za długi', async () => {
    const response = await request(app)
    .post('/Klient')
    .send({ 
        nazwa: 'Testowa Nazwa', 
        adres: 'Testowy Adres',
        email: 'test@test.',
        nip: '1234567890',
        telefon: '1234567890'
      })

    expect(response.status).toBe(400);
    const phoneError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'telefon' && blad.msg === 'Telefon musi mieć 9 cyfr.');
    expect(phoneError.length).toBeGreaterThan(0);
  });

  it('powinien zwrócić błąd, gdy NIP jest za krótki', async () => {
    const response = await request(app)
    .post('/Klient')
    .send({ 
        nazwa: 'Testowa Nazwa', 
        adres: 'Testowy Adres',
        email: 'test@test.',
        nip: '123456789',
        telefon: '123456789'
      })

    expect(response.status).toBe(400);
    const nipError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'nip' && blad.msg === 'NIP musi mieć 10 cyfr.');
    expect(nipError.length).toBeGreaterThan(0);
  });

  it('powinien zwrócić błąd, gdy NIP jest za długi', async () => {
    const response = await request(app)
    .post('/Klient')
    .send({ 
        nazwa: 'Testowa Nazwa', 
        adres: 'Testowy Adres',
        email: 'test@test.',
        nip: '12345678900',
        telefon: '123456789'
      })

    expect(response.status).toBe(400);
    const nipError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'nip' && blad.msg === 'NIP musi mieć 10 cyfr.');
    expect(nipError.length).toBeGreaterThan(0);
  });

  it('powinien zwrócić błąd, gdy adres jest pusty', async () => {
    const response = await request(app)
    .post('/Klient')
    .send({ 
        nazwa: 'Testowa Nazwa', 
        adres: '',
        email: 'test@test.',
        nip: '1234567890',
        telefon: '123456789'
      })

    expect(response.status).toBe(400);
    const addressError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'adres' && blad.msg === 'Adres jest wymagany.');
    expect(addressError.length).toBeGreaterThan(0);
  });

  it('powinien zwrócić błąd, gdy nazwa jest pusta', async () => {
    const response = await request(app)
    .post('/Klient')
    .send({ 
        nazwa: '', 
        adres: 'Testowy Adres',
        email: 'test@test.',
        nip: '1234567890',
        telefon: '123456789'
      })

    expect(response.status).toBe(400);
    const nameError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'nazwa' && blad.msg === 'Nazwa jest wymagana.');
    expect(nameError.length).toBeGreaterThan(0);
  });

});