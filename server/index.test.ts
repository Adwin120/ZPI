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

  it.skip('nie powinno przetworzyć danych z pustymi polami', async () => {
    const response = await request(app)
      .post('/Klient')
      .send({ 
        nazwa: '', 
        adres: '',
        email: '',
        nip: '',
        telefon: ''
      });

    expect(response.status).toBe(400); 
    expect(response.body).toEqual({});  //Form wasn't send so response is empty
});

});


describe("Dodawanie Pracownika - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Pracownik')
      .send({ 
          haslo: 'Testowe haslo', 
          imie: 'Jan',
          email: 'test@test.pl',
          nazwisko: 'Kowalski',
          telefon: '123456789'
        })

    expect(response.status).toBe(200);
    expect(response.text).toBe('Dane z formularza dla pracownika zostały odebrane');
  });

  it.skip('nie powinno przetworzyć danych z pustymi polami', async () => {
    const response = await request(app)
    .post('/Pracownik')
    .send({ 
        haslo: '', 
        imie: '',
        email: '',
        nazwisko: '',
        telefon: ''
      })

    expect(response.status).toBe(400); 
    expect(response.body).toEqual({});  //Form wasn't send so response is empty
});

});

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

  it.skip('nie powinno przetworzyć danych z pustymi polami', async () => {
    const response = await request(app)
    .post('/Zadanie')
    .send({ 
      pracownikID: '', 
      klientID: '', 
      opis: '', 
      status: '' 
    });

    expect(response.status).toBe(400); 
    expect(response.body).toEqual({});  //Form wasn't send so response is empty
});

});
