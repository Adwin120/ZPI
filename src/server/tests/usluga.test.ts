import request from "supertest";
import { UslugaPayload } from "../../common/uslugaSchema";
import { FieldValidationError, ValidationErrorBody } from "../middleware/zodValidation";
import app from "../app";
import "../endpoints/uslugaEndpoints"
import { getMockBearerTokenWithRole, setupAuthenticationService } from "../testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("admin");

describe("Dodawanie uslugi - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Usluga')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Opis: 'Opis', 
        Nazwa: 'Nazwa'
      }satisfies UslugaPayload); 

    expect(response.status).toBe(200);
    expect(response.text).toBe("Usługa została dodana pomyślnie");
  });


  it('nie powinno przetworzyć danych, gdy nazwa jest pusta', async () => {
    const response = await request(app)
    .post('/Usluga')
    .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Opis: 'Opis', 
        Nazwa: ''
      });
      const body = response.body as ValidationErrorBody;
      
      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Nazwa" && blad.type === "too_small"
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });

});

