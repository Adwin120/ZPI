import request from "supertest";
import { Auto_uslugaPayload } from "../../common/auto_uslugaSchema";
import { FieldValidationError, ValidationErrorBody } from "../middleware/zodValidation";
import app from "../app";
import "../endpoints/auto_uslugaEndpoints"
import { getMockBearerTokenWithRole, setupAuthenticationService } from "../testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("admin");

describe("Dodawanie Auto_usluga - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Auto_usluga')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Usluga_IdUsluga: 5, 
        Auto_IdAuto: 40
      }satisfies Auto_uslugaPayload); 

    expect(response.status).toBe(200);
    expect(response.text).toBe('Dane dla Auto_usluga zostały dodane pomyślnie');
  });


  it('nie powinno przetworzyć danych, gdy pole Usluga_IdUsluga jest mniejsze od 1', async () => {
    const response = await request(app)
    .post('/Auto_usluga')
    .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Auto_IdAuto: 40,
        Usluga_IdUsluga: 0
      });
      const body = response.body as ValidationErrorBody;
      
      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Usluga_IdUsluga" && blad.type === "too_small"
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });

  it('nie powinno przetworzyć danych, gdy pole Auto_IdAuto jest mniejsze od 1', async () => {
    const response = await request(app)
    .post('/Auto_usluga')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Auto_IdAuto: 0,  
      Usluga_IdUsluga: 1 
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
    .post('/Auto_usluga')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Auto_IdAuto: 1,  
      Usluga_IdUsluga: 1
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe("Padane ID Auta oraz ID Usługi już istnieją w bazie danych.");
  });

  it('nie powinno przetworzyć danych, gdy auto o podanym ID nie istenieje w bazie danych', async () => {
    const response = await request(app)
    .post('/Auto_usluga')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Auto_IdAuto: 100,  
      Usluga_IdUsluga: 1
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe("Auto o podanym ID nie istnieje w bazie danych.");
  });

  it('nie powinno przetworzyć danych, gdy usluga o podanym ID nie istenieje w bazie danych', async () => {
    const response = await request(app)
    .post('/Auto_usluga')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Auto_IdAuto: 1,  
      Usluga_IdUsluga: 100
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe("Usluga o podanym ID nie istnieje w bazie danych.");
  });

});

