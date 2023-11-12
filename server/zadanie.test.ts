import request from "supertest";

import app from "./app";

describe("Dodawanie Żądania - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Zadanie')
      .send({ 
        pracownikID: '12345', 
        klientID: '67890', 
        opis: 'Opis zlecenia', 
        status: 'Nowe' 
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Dane z formularza dla żądania zostały odebrane');
  });

  it('nie powinno przetworzyć danych z pustymi polami', async () => {
    const response = await request(app)
    .post('/Zadanie')
    .send({ 
      pracownikID: '', 
      klientID: '', 
      opis: '', 
      status: '' 
    });

    expect(response.status).toBe(400); 
    const requiredFields = ['pracownikID', 'klientID','opis','status'];
    requiredFields.forEach(field => {
    const fieldError = response.body.errors.find((error: { path: string }) => error.path === field);
    expect(fieldError).toBeDefined();   
    }); 
  });

  it('nie powinno przetworzyć danych, gdy status jest pusty', async () => {
    const response = await request(app)
    .post('/Zadanie')
      .send({ 
        pracownikID: '12345', 
        klientID: '67890', 
        opis: '', 
        status: 'Nowe' 
      });

      expect(response.status).toBe(400);
      const descriptionError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'opis' && blad.msg === 'Opis jest wymagany.');
      expect(descriptionError.length).toBeGreaterThan(0); 
  });

  it('nie powinno przetworzyć danych, gdy status jest pusty', async () => {
    const response = await request(app)
    .post('/Zadanie')
    .send({ 
      pracownikID: '12345', 
      klientID: '67890', 
      opis: 'Opis zlecenia', 
      status: '' 
    });

    expect(response.status).toBe(400);
    const statusError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'status' && blad.msg === 'Status jest wymagany.');
    expect(statusError.length).toBeGreaterThan(0); 
  });

  it('nie powinno przetworzyć danych, gdy pracowniktID jest mniejsze od 1', async () => {
    const response = await request(app)
    .post('/Zadanie')
    .send({ 
      pracownikID: '0', 
      klientID: '67890', 
      opis: 'Opis zlecenia', 
      status: 'Nowe' 
    });

    expect(response.status).toBe(400);
    const pracowniktIDError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'pracownikID' && blad.msg === 'ID pracownika musi być większe od 0.');
    expect(pracowniktIDError.length).toBeGreaterThan(0); 
  });

  it('nie powinno przetworzyć danych, gdy klientID jest mniejsze od 1', async () => {
    const response = await request(app)
    .post('/Zadanie')
    .send({ 
      pracownikID: '12345', 
      klientID: '0', 
      opis: 'Opis zlecenia', 
      status: 'Nowe' 
    });

    expect(response.status).toBe(400);
    const klientIDError = response.body.errors.filter((blad: { path: string; msg: string}) => blad.path === 'klientID' && blad.msg === 'ID klienta musi być większe od 0.');
    expect(klientIDError.length).toBeGreaterThan(0); 
  });

});

