import request from "supertest";
import { GrafikPayload } from "../../common/grafikSchema";
import { FieldValidationError, ValidationErrorBody } from "../middleware/zodValidation";
import app from "../app";
import "../endpoints/grafikEndpoints"
import { getMockBearerTokenWithRole, setupAuthenticationService } from "../testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("admin");

describe("Dodawanie grafiku - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Grafik')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Pracownik_IdPracownik: 1, 
        Klient_IdKlient: 1,
        Czas_rozpoczecia: "2023-11-08 09:00:00",
        Czas_zakonczenia: "2023-11-08 10:00:00",
        Status: "przesłane"
      }satisfies GrafikPayload); 

    expect(response.status).toBe(200);
    expect(response.text).toBe("Grafik został dodany pomyślnie");
  });


  it('nie powinno przetworzyć danych, gdy data jest pusta', async () => {
    const response = await request(app)
    .post('/Grafik')
    .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Pracownik_IdPracownik: 1, 
        Klient_IdKlient: 1,
        Czas_rozpoczecia: "2023-11-08 09:00:00",
        Czas_zakonczenia: "",
        Status: "przesłane"
      });
      const body = response.body as ValidationErrorBody;


      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Czas_zakonczenia" && blad.msg === "Nieprawidłowy format daty i czasu (oczekiwano 'DD-MM-RRRR GG:MM:SS')"
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });

});

