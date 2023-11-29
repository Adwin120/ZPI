import app from "./app";
import "./routes/uprawnienia"

const port = 3000;

app.listen(port, () => {
    console.log(`express listening on port ${port}`);
});
