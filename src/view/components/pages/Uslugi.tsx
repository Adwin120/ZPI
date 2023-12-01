import { Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import AddFormButton from "../layout/AddFormButton";
import { postToEndpoint } from "../../backendAccess";
import { UslugaPayload, uslugaSchema } from "../../../common/uslugaSchema";
import FormTextField from "../forms/FormTextField";
import DataTable from "../DataTable";

interface Props {}
const Uslugi: React.FC<Props> = () => {
    return (
        <CommonLayout subpageTitle="Usługi">
            <Stack alignItems={"normal"} gap={2}>
                <div>
                    <AddFormButton
                        onSubmit={postToEndpoint("/Usluga")}
                        schema={uslugaSchema}
                        title="Dodaj usługę"
                    >
                        <FormTextField name="Nazwa" label="Nazwa" />
                        <FormTextField name="Opis" label="Opis" multiline minRows={3} />
                    </AddFormButton>
                </div>

                <DataTable<UslugaPayload>
                    dataEndpoint="/Usluga"
                    schema={[
                        { field: "Nazwa", flex: 1 },
                        { field: "Opis", flex: 3 },
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export default Uslugi;
