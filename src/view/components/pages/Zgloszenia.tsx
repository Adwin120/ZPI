import { Stack } from "@mui/material";
import { Klient } from "../../../common/klientSchema";
import { Pracownik } from "../../../common/pracownikSchema";
import { Zgloszenie, zgloszenieSchema } from "../../../common/zgloszenieSchema";
import { postToEndpoint } from "../../backendAccess";
import DataTable from "../DataTable";
import FormAutocompleteFromEndpoint from "../forms/FormAutocompleteFromEndpoint";
import FormTextField from "../forms/FormTextField";
import FormButton from "../layout/FormButton";
import CommonLayout from "../layout/CommonLayout";
import { grafikSchema } from "../../../common/grafikSchema";
import { useLocation } from "wouter";
import { acceptanceOptions } from "../../../common/AcceptanceStatus";

interface Props {}
const Zgloszenia: React.FC<Props> = () => {
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle="Zgłoszenia">
            <Stack alignItems={"normal"} gap={2}>
                <div>
                    <FormButton
                        minimalRole="pracownik"
                        schema={zgloszenieSchema}
                        title="Dodaj Zgłoszenie"
                        onSubmit={postToEndpoint("/Zgloszenie")}
                    >
                        {ZgloszeniaFormFields}
                    </FormButton>
                </div>
                <DataTable<Zgloszenie>
                    dataEndpoint="/Zgloszenie"
                    getRowId={(row) => row.IdZgloszenie}
                    onRowDoubleClick={({ row }) =>
                        navigate(`/panel/zgloszenia/${row.IdZgloszenie}`)
                    }
                    schema={[
                        {field: "IdZgloszenie", flex: 1},
                        { field: "Opis", flex: 1 },
                        {
                            field: "Status",
                            flex: 1,
                            type: "singleSelect",
                            valueOptions: acceptanceOptions,
                        },
                        // TODO: add missing fields
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export const ZgloszeniaFormFields = (
    <>
        <FormAutocompleteFromEndpoint<Pracownik>
            endpoint="/Pracownik"
            label="Pracownik"
            name="Pracownik_IdPracownik"
            getOptionId={(option) => option?.IdPracownik ?? null}
            getOptionLabel={(option) =>
                `${option.Imie} ${option.Nazwisko}\n${option.Email} ${option.IdPracownik}`
            }
        />
        <FormAutocompleteFromEndpoint<Klient>
            endpoint="/Klient"
            label="Klient"
            name="Klient_IdKlient"
            getOptionId={(option) => option?.IdKlient ?? null}
            getOptionLabel={(option) => `${option.Nazwa}\n${option.NIP} ${option.IdKlient}`}
        />
        <FormTextField name="Opis" label="Opis" multiline minRows={3} />
    </>
);
export default Zgloszenia;
