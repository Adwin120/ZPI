import request from "supertest";
import { ModelPayload } from "../../common/modelSchema";
import { FieldValidationError, ValidationErrorBody } from "../middleware/zodValidation";
import app from "../app";
import "../endpoints/modelEndpoints"
import { getMockBearerTokenWithRole, setupAuthenticationService } from "../testSetup";

setupAuthenticationService();
const mockToken = await getMockBearerTokenWithRole("admin");

describe("Dodawanie modelu - Testy", () => {

  it('powinno przetworzyć poprawne dane', async () => {
    const response = await request(app)
      .post('/Model')
      .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Marka: 'Audi', 
        Model: 'A4'
      }satisfies ModelPayload); 

    expect(response.status).toBe(200);
    expect(response.text).toBe("Model został pomyślnie dodany");
  });


  it('nie powinno przetworzyć danych, gdy nazwa jest pusta', async () => {
    const response = await request(app)
    .post('/Model')
    .set({ authorization: "Bearer " + mockToken })
      .send({ 
        Marka: 'Audi', 
        Model: ''
      });
      const body = response.body as ValidationErrorBody;
      
      expect(response.status).toBe(400);
      const descriptionError = body.errors.filter(
        (blad) => blad.path === "Model" && blad.msg === "Model jest wymagany."
    );
      expect(descriptionError.length).toBeGreaterThan(0);
  });

});

