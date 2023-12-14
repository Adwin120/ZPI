import app from "./app";
import "./endpoints/uprawnienia"
import "./endpoints/zgloszenieEndpoints"
import "./endpoints/klientEndpoints"
import "./endpoints/pracownikEndpoints"
import "./endpoints/autoEndpoints"
import "./endpoints/grafikEndpoints"
import "./endpoints/modelEndpoints"
import "./endpoints/umowaEndpoints"
import "./endpoints/uslugaEndpoints"
import "./endpoints/wersja_umowyEndpoints"
import "./endpoints/auto_uslugaEndpoints"
import "./endpoints/auto_pracownikEndpoints"
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)

const port = 3000;

app.listen(port, () => {
    console.log(`express listening on port ${port}`);
});
