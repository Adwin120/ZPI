import request from "supertest";
import { AutoPayload } from "../../common/autoSchema";
import { FieldValidationError, ValidationErrorBody } from "../middleware/zodValidation";
import app from "../app";
import "../endpoints/autoEndpoints"
import { getMockBearerTokenWithRole, setupAuthenticationService } from "../testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("admin");

describe("Dodawanie auta - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Auto')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Model_IdModel: 1, 
        Klient_IdKlient: 1,
        Rejestracja: "WAR-12345",
        Czas_rozpoczecia: "2023-11-08 09:00:00",
        Czas_zakonczenia: "2023-11-08 10:00:00",
        Dodatkowe_informacje: "-"
      }satisfies AutoPayload); 

    expect(response.status).toBe(200);
    expect(response.text).toBe("Auto zostało dodane pomyślnie");
  });

  it('nie powinno przetworzyć danych, gdy daty są takie same', async () => {
    const response = await request(app)
      .post('/Auto')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Model_IdModel: 1, 
        Klient_IdKlient: 1,
        Rejestracja: "WAR-12345",
        Czas_rozpoczecia: "2023-11-08 09:00:00",
        Czas_zakonczenia: "2023-11-08 09:00:00",
        Dodatkowe_informacje: "-"
      }satisfies AutoPayload); 
      const body = response.body as ValidationErrorBody;

      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Czas_zakonczenia" && blad.msg === "Czas zakończenia nie może być przed czasem rozpoczęcia"
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });


  it('nie powinno przetworzyć danych, gdy rejestracja jest pusta', async () => {
    const response = await request(app)
    .post('/Auto')
    .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Model_IdModel: 1, 
        Klient_IdKlient: 1,
        Rejestracja: "",
        Czas_rozpoczecia: "2023-11-08 09:00:00",
        Czas_zakonczenia: "2023-11-08 09:00:00",
        Dodatkowe_informacje: "-"
      });
      const body = response.body as ValidationErrorBody;
      
      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Rejestracja" && blad.type === "too_small"
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });

});

