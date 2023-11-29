import app from "./app";
import "./routes/uprawnienia"
import "./endpoints/zgloszeneEndpoints"
import "./endpoints/klientEndpoints"
import "./endpoints/pracownikEndpoints"
import "./endpoints/autoEndpoints"
import "./endpoints/grafikEndpoints"
import "./endpoints/modelEndpoints"
import "./endpoints/umowaEndpoints"
import "./endpoints/uslugaEndpoints"

const port = 3000;

app.listen(port, () => {
    console.log(`express listening on port ${port}`);
});
