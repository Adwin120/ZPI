import express, { Request, Response } from "express";
import { mainView, isValidEmail, isValidPhone } from '../view/components/mainView';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving the react app on "/"
app.use(express.static("dist/frontend"));

app.get('/home', (_, res) => {
    res.send(mainView());
});

app.post('/submit-form', (req, res) => {
    const { formId, adres, email, nazwa, nip, telefon, imie, nazwisko, haslo, pracownikID, klientID, opis, status } = req.body;

    if (formId === 'form1') {
        if (!adres || !email || !nazwa || !nip || !telefon) {
            return res.send('Wszystkie pola muszą być wypełnione!');
        }
    } else if (formId === 'form2') {
        if (!email || !haslo || !imie || !nazwisko || !telefon) {
            return res.send('Wszystkie pola muszą być wypełnione!');
        }
    } else if (formId === 'form3') {
        if (!pracownikID || !klientID || !opis || !status) {
            return res.send('Wszystkie pola muszą być wypełnione!');
        }
    }
    if (formId === 'form1' || formId === 'form2') {
        const emailValidationResult = isValidEmail(email);
        if (emailValidationResult !== true) {
            return res.send(emailValidationResult);
        }
        if (!isValidPhone(telefon)) {
            return res.send('Nieprawidłowy numer telefonu, telefon musi zawierać 9 cyfr w tym same liczby!');
        }
    }
    
    return res.send('Dane przetworzone poprawnie!');
});

app.listen(port, () => {
    console.log(`express listening on port ${port}`);
});

export default app;