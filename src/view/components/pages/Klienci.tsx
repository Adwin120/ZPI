import { Klient, klientSchema } from "../../../common/klientSchema";
import { postToEndpoint } from "../../backendAccess";
import AddFormButton from "../layout/AddFormButton";
import FormDialog from "../forms/FormDialog";
import FormTextField from "../forms/FormTextField";
import CommonLayout from "../layout/CommonLayout";

import DataTable from "../DataTable";
import { Stack } from "@mui/material";

const Klienci: React.FC = () => (
    <CommonLayout pageTitle="MOXLY" subpageTitle="Klienci">
        <Stack alignItems={"normal"} gap={2}>
            <div>
                <AddFormButton
                    schema={klientSchema}
                    onSubmit={postToEndpoint("/Klient")}
                    title="Dodaj klienta"
                >
                    <FormTextField name="nazwa" label="Nazwa" required />
                    <FormTextField type="email" name="email" label="E-mail" required />
                    <FormTextField name="adres" label="Adres" required />
                    <FormTextField
                        name="nip"
                        label="NIP"
                        required
                        // helperText="Numer musi mieć dokładnie 10 cyfr"
                    />
                    <FormTextField
                        type="tel"
                        name="telefon"
                        label="Telefon"
                        required
                        // helperText="Numer musi mieć dokładnie 9 cyfr"
                    />
                </AddFormButton>
            </div>
            <DataTable<Klient>
                dataEndpoint="/Klient"
                getRowId={(row) => row.IdKlient}
                schema={[
                    { field: "Nazwa", flex: 1 },
                    { field: "Email", flex: 1 },
                    { field: "Adres", flex: 1 },
                    { field: "NIP", flex: 0.5 },
                    { field: "Telefon", flex: 1 },
                ]}
            />
        </Stack>
    </CommonLayout>
);

export default Klienci;
