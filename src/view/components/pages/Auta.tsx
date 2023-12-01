import { Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import AddFormButton from "../layout/AddFormButton";
import { postToEndpoint } from "../../backendAccess";
import { Auto, autoSchema } from "../../../common/autoSchema";
import FormTextField from "../forms/FormTextField";
import FormAutocompleteFromEndpoint from "../forms/FormAutocompleteFromEndpoint";
import { Klient } from "../../../common/klientSchema";
import FormDateTimePicker from "../forms/FormDateTimeField";
import { ModelPayload } from "../../../common/modelSchema";
import DataTable from "../DataTable";

const Auta: React.FC = () => {
    return (
        <CommonLayout subpageTitle="Auta">
            <Stack alignItems={"normal"} gap={2}>
                <div>
                    <AddFormButton
                        title="Dodaj Auto"
                        onSubmit={postToEndpoint("/Auto")}
                        schema={autoSchema}
                    >
                        <FormTextField name="Rejestracja" label="Rejestracja" required />
                        <FormAutocompleteFromEndpoint<ModelPayload>
                            endpoint="/Model"
                            name="Model_IdModel"
                            label="Model"
                            getOptionId={(model) => `${model?.Marka} ${model?.Model}`}
                            getOptionLabel={(model) => `${model?.Marka} ${model?.Model}`}
                        />
                        <FormAutocompleteFromEndpoint<Klient>
                            endpoint="/Klient"
                            label="Klient"
                            name="Klient_IdKlient"
                            getOptionId={(option) => option?.IdKlient ?? 0}
                            getOptionLabel={(option) =>
                                `${option.Nazwa}\n${option.NIP} ${option.IdKlient}`
                            }
                        />
                        <FormDateTimePicker name="Czas_rozpoczecia" label="Czas rozpoczęcia" />
                        <FormDateTimePicker name="Czas_zakonczenia" label="Czas zakończenia" />
                        <FormTextField
                            name="Dodatkowe_informacje"
                            label="Dodatkowe informacje"
                            multiline
                            minRows={3}
                        />
                    </AddFormButton>
                </div>
                <DataTable<Auto>
                    dataEndpoint={"/Auto"}
                    getRowId={row => row.IdAuto}
                    schema={[
                        { field: "Rejestracja", flex: 1 },
                        { field: "Czas_rozpoczecia", flex: 1, headerName: "Czas rozpoczęcia", type: "dateTime" },
                        { field: "Czas_zakonczenia", flex: 1, headerName: "Czas zakończenia", type: "dateTime" },
                        {
                            field: "Dodatkowe_informacje",
                            flex: 1,
                            headerName: "Dodatkowe informacje",
                        },
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export default Auta;
