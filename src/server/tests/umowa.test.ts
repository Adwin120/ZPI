import request from "supertest";
import { UmowaPayload } from "../../common/umowaSchema";
import { FieldValidationError, ValidationErrorBody } from "../middleware/zodValidation";
import app from "../app";
import "../endpoints/umowaEndpoints"
import { getMockBearerTokenWithRole, setupAuthenticationService } from "../testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("admin");

describe("Dodawanie umowy - Testy", () => {

  it('powinno przetworzyć poprawnie dane', async () => {
    const response = await request(app)
      .post('/Umowa')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Klient_IdKlient: 1, 
        Data_rozpoczecia: '10-10-2023',
        Data_zakonczenia: '11-10-2023'
      }satisfies UmowaPayload); 

    expect(response.status).toBe(200);
    expect(response.text).toBe("Umowa została pomyślnie dodana");
  });


  it('nie powinno przetworzyć danych, gdy data jest pusta', async () => {
    const response = await request(app)
    .post('/Umowa')
    .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Klient_IdKlient: 1, 
        Data_rozpoczecia: '10-10-2023',
        Data_zakonczenia: ''
      });
      const body = response.body as ValidationErrorBody;
      
      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Data_zakonczenia" && blad.msg === "Nieprawidłowy format daty (oczekiwano 'DD-MM-RRRR')."
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });

});

