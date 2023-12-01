import { Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import AddFormButton from "../layout/AddFormButton";
import { postToEndpoint } from "../../backendAccess";
import { Umowa, umowaSchema } from "../../../common/umowaSchema";
import FormAutocompleteFromEndpoint from "../forms/FormAutocompleteFromEndpoint";
import { Klient } from "../../../common/klientSchema";
import FormDateField from "../forms/FormDateField";
import DataTable from "../DataTable";

interface Props {}
const Umowy: React.FC<Props> = () => {
    return (
        <CommonLayout subpageTitle="Umowy">
            <Stack alignItems={"normal"} gap={2}>
                <div>
                    <AddFormButton
                        onSubmit={postToEndpoint("/Umowa")}
                        title="Dodaj umowę"
                        schema={umowaSchema}
                    >
                        <FormAutocompleteFromEndpoint<Klient>
                            endpoint="/Klient"
                            label="Klient"
                            name="klientID"
                            getOptionId={(option) => option?.IdKlient ?? 0}
                            getOptionLabel={(option) =>
                                `${option.Nazwa}\n${option.NIP} ${option.IdKlient}`
                            }
                        />
                        <FormDateField name="Data_rozpoczecia" label="Data rozpoczęcia" />
                        <FormDateField name="Data_zakonczenia" label="Data zakończenia" />
                    </AddFormButton>
                </div>
                <DataTable<Umowa>
                    dataEndpoint="/Umowa"
                    getRowId={(row) => row.IdUmowa}
                    schema={[
                        {
                            field: "Data_rozpoczecia",
                            flex: 1,
                            headerName: "Data rozpoczęcia",
                            type: "date",
                        },
                        {
                            field: "Data_zakonczenia",
                            flex: 1,
                            headerName: "Data zakończenia",
                            type: "date",
                        },
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export default Umowy;
