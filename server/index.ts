import express, { Request, Response } from "express";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// serving the react app on "/"
app.use(express.static("dist/frontend"));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/KlientFormularz', (req: Request, res: Response) => {
    console.log('Dane z formularza dla klienta:', req.body);
    res.send('Dane z formularza dla klienta zostały odebrane');
});

app.post('/PracownikFormularz', (req: Request, res: Response) => {
    console.log('Dane z formularza dla pracownika:', req.body);
    res.send('Dane z formularza dla pracownika zostały odebrane');
});

app.post('/ZadanieFormularz', (req: Request, res: Response) => {
    console.log('Dane z formularza dla żądania:', req.body);
    res.send('Dane z formularza dla żądania zostały odebrane');
});

app.listen(port, () => {
    console.log(`express listening on port ${port}`);
});

export default app;
