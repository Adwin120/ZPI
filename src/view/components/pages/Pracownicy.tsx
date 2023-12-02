import { Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import FormButton from "../layout/FormButton";
import { postToEndpoint } from "../../backendAccess";
import { Pracownik, pracownikSchema } from "../../../common/pracownikSchema";
import FormTextField from "../forms/FormTextField";
import DataTable from "../DataTable";

const Pracownicy: React.FC = () => {
    return (
        <CommonLayout subpageTitle="Pracownicy">
            <Stack alignItems={"normal"} gap={2}>
                <div>
                    <FormButton
                        minimalRole="kierownik"
                        onSubmit={postToEndpoint("/Pracownik")}
                        schema={pracownikSchema}
                        title="Dodaj Pracownika"
                    >{PracownicyFormFields}</FormButton>
                </div>
                <DataTable<Pracownik>
                    dataEndpoint="/Pracownik"
                    getRowId={(row) => row.IdPracownik}
                    schema={[
                        { field: "Email", flex: 1 },
                        { field: "Imie", flex: 1 },
                        { field: "Nazwisko", flex: 1 },
                        { field: "Telefon", flex: 1 },
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export const PracownicyFormFields = (
    <>
        <FormTextField name="email" label="E-mail" type="email" required />
        <FormTextField name="imie" label="Imię" />
        <FormTextField name="nazwisko" label="Nazwisko" />
        <FormTextField name="telefon" label="Telefon" type="tel" />
    </>
);

export default Pracownicy;
