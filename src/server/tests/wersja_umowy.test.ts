import request from "supertest";
import { Wersja_umowyPayload } from "../../common/wersja_umowySchema";
import { FieldValidationError, ValidationErrorBody } from "../middleware/zodValidation";
import app from "../app";
import "../endpoints/wersja_umowyEndpoints"
import { getMockBearerTokenWithRole, setupAuthenticationService } from "../testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("admin");

describe("Dodawanie Wersja_umowy - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Wersja_umowy')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Usluga_IdUsluga: 10, 
        Umowa_IdUmowa: 20,
        Cena: 100
      }satisfies Wersja_umowyPayload); 

    expect(response.status).toBe(200);
    expect(response.text).toBe('Wersja umowy została pomyślnie dodana');
  });


  it('nie powinno przetworzyć danych, gdy pole Usluga_IdUsluga jest mniejsze od 1', async () => {
    const response = await request(app)
    .post('/Wersja_umowy')
    .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Umowa_IdUmowa: 40,
        Usluga_IdUsluga: 0,
        Cena: 100
      });
      const body = response.body as ValidationErrorBody;
      
      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Usluga_IdUsluga" && blad.type === "too_small"
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });

  it('nie powinno przetworzyć danych, gdy pole Umowa_IdUmowa jest mniejsze od 1', async () => {
    const response = await request(app)
    .post('/Wersja_umowy')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Umowa_IdUmowa: 0,  
      Usluga_IdUsluga: 1,
      Cena: 100 
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
      const statusError = body.errors.filter(
        (blad) => blad.path === "Umowa_IdUmowa" && blad.type === "too_small"
    );
      expect(statusError.length).toBeGreaterThan(0);
  });

  it('nie powinno przetworzyć danych, gdy został podany istniejący klucz złożony', async () => {
    const response = await request(app)
    .post('/Wersja_umowy')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Umowa_IdUmowa: 1,  
      Usluga_IdUsluga: 1,
      Cena: 100
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe("Padane ID Umowy oraz ID Usługi już istnieją w bazie danych.");
  });

  it('nie powinno przetworzyć danych, gdy umowa o podanym ID nie istenieje w bazie danych', async () => {
    const response = await request(app)
    .post('/Wersja_umowy')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Umowa_IdUmowa: 100,  
      Usluga_IdUsluga: 1,
      Cena: 100
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe("Umowa o podanym ID nie istnieje w bazie danych.");
  });

  it('nie powinno przetworzyć danych, gdy usluga o podanym ID nie istenieje w bazie danych', async () => {
    const response = await request(app)
    .post('/Wersja_umowy')
    .set({ authorization: "Bearer " + mockToken })
    .send({ 
      Umowa_IdUmowa: 1,  
      Usluga_IdUsluga: 100,
      Cena: 100
    });
    const body = response.body as ValidationErrorBody;

    expect(response.status).toBe(400);
    expect(response.text).toBe("Usluga o podanym ID nie istnieje w bazie danych.");
  });

});

