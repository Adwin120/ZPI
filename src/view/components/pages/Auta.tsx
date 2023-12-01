import { Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import AddFormButton from "../layout/AddFormButton";
import { postToEndpoint } from "../../backendAccess";
import { autoSchema } from "../../../common/autoSchema";
import FormTextField from "../forms/FormTextField";
import FormAutocompleteFromEndpoint from "../forms/FormAutocompleteFromEndpoint";
import { Klient } from "../../../common/klientSchema";

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
                        <FormAutocompleteFromEndpoint
                            // Model
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
                        <FormTextField
                            name="Dodatkowe_informacje"
                            label="Dodatkowe informacje"
                            multiline
                            minRows={3}
                        />
                    </AddFormButton>
                </div>
            </Stack>
        </CommonLayout>
    );
};

export default Auta;
