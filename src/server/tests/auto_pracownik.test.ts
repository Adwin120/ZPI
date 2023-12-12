import request from "supertest";
import { Auto_pracownikPayload } from "../../common/auto_pracownikSchema";
import { FieldValidationError, ValidationErrorBody } from "../middleware/zodValidation";
import app from "../app";
import "../endpoints/auto_pracownikEndpoints"
import { getMockBearerTokenWithRole, setupAuthenticationService } from "../testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("admin");

describe("Dodawanie Auto_pracownik - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Auto_pracownik')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Pracownik_IdPracownik: 5, 
        Auto_IdAuto: 40
      }satisfies Auto_pracownikPayload); 

    expect(response.status).toBe(200);
    expect(response.text).toBe('Dane dla Auto_pracownik zostały dodane pomyślnie');
  });


  it('nie powinno przetworzyć danych, gdy pole Pracownik_IdPracownik jest puste', async () => {
    const response = await request(app)
    .post('/Auto_pracownik')
    .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Auto_IdAuto: 40,
        Pracownik_IdPracownik: 0
      });
      const body = response.body as ValidationErrorBody;
      
      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Pracownik_IdPracownik" && blad.type === "too_small"
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });

  it('nie powinno przetworzyć danych, gdy pole Auto_IdAuto jest puste', async () => {
    const response = await request(app)
    .post('/Auto_pracownik')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Auto_IdAuto: 0,  
      Pracownik_IdPracownik: 1 
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
      const statusError = body.errors.filter(
        (blad) => blad.path === "Auto_IdAuto" && blad.type === "too_small"
    );
      expect(statusError.length).toBeGreaterThan(0);
  });

  it('nie powinno przetworzyć danych, gdy został podany istniejący klucz złożony', async () => {
    const response = await request(app)
    .post('/Auto_pracownik')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Auto_IdAuto: 1,  
      Pracownik_IdPracownik: 1
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe('Padane ID Auta oraz ID Pracownika już istnieją w bazie danych.');
  });

  it('nie powinno przetworzyć danych, auto o podanym ID nie istenieje w bazie danych', async () => {
    const response = await request(app)
    .post('/Auto_pracownik')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Auto_IdAuto: 100,  
      Pracownik_IdPracownik: 1
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe("Auto o podanym ID nie istnieje w bazie danych.");
  });

  it('nie powinno przetworzyć danych, pracownik o podanym ID nie istenieje w bazie danych', async () => {
    const response = await request(app)
    .post('/Auto_pracownik')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Auto_IdAuto: 1,  
      Pracownik_IdPracownik: 100
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe("Pracownik o podanym ID nie istnieje w bazie danych.");
  });

});

