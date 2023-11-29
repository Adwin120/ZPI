import { Stack } from "@mui/material";
import { Klient } from "../../../common/klientSchema";
import { Pracownik } from "../../../common/pracownikSchema";
import { Zgloszenie, zgloszenieSchema } from "../../../common/zgloszenieSchema";
import { postToEndpoint } from "../../backendAccess";
import DataTable from "../DataTable";
import FormAutocompleteFromEndpoint from "../forms/FormAutocompleteFromEndpoint";
import FormTextField from "../forms/FormTextField";
import AddFormButton from "../layout/AddFormButton";
import CommonLayout from "../layout/CommonLayout";

interface Props {}
const Zgloszenia: React.FC<Props> = () => {
    return (
        <CommonLayout subpageTitle="Zgłoszenia">
            <Stack alignItems={"normal"} gap={2}>
                <div>
                    <AddFormButton
                        schema={zgloszenieSchema}
                        title="Dodaj Zgłoszenie"
                        onSubmit={postToEndpoint("/Zgloszenie")}
                    >
                        <FormAutocompleteFromEndpoint<Pracownik>
                            endpoint="/Pracownik"
                            label="Pracownik"
                            name="pracownikID"
                            getOptionId={(option) => option?.IdPracownik ?? 0}
                            getOptionLabel={(option) =>
                                `${option.Imie} ${option.Nazwisko}\n${option.Email} ${option.IdPracownik}`
                            }
                        />
                        <FormAutocompleteFromEndpoint<Klient>
                            endpoint="/Klient"
                            label="Klient"
                            name="klientID"
                            getOptionId={(option) => option?.IdKlient ?? 0}
                            getOptionLabel={(option) =>
                                `${option.Nazwa}\n${option.NIP} ${option.IdKlient}`
                            }
                        />
                        <FormTextField name="opis" label="Opis" multiline minRows={3} />
                    </AddFormButton>
                </div>
                <DataTable<Zgloszenie>
                    dataEndpoint="/Zgloszenie"
                    getRowId={(row) => row.IdZgloszenie}
                    schema={[
                        { field: "Opis", flex: 1 },
                        { field: "Status", flex: 1 },
                        // TODO: add missing fields
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export default Zgloszenia;
