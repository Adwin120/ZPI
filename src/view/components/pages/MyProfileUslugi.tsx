import { Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import FormButton from "../layout/FormButton";
import { deleteFromEndpoint, patchEndpoint, postToEndpoint } from "../../backendAccess";
import { Usluga, uslugaSchema } from "../../../common/uslugaSchema";
import FormTextField from "../forms/FormTextField";
import DataTable, { EditableColumnHeader } from "../DataTable";
import { GridActionsCellItem } from "@mui/x-data-grid";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRole } from "../../firebaseAuth";

interface Props {}
const Uslugi: React.FC<Props> = () => {
    // const [role] = useRole();
    return (
        <CommonLayout subpageTitle="Usługi">
            <Stack alignItems={"normal"} gap={2}>
                {/* <div>
                    <FormButton
                        minimalRole="kierownik"
                        onSubmit={postToEndpoint("/Usluga")}
                        schema={uslugaSchema}
                        title="Dodaj usługę"
                    >
                        <FormTextField name="Nazwa" label="Nazwa" />
                        <FormTextField name="Opis" label="Opis" multiline minRows={3} />
                    </FormButton>
                </div> */}

                <DataTable<Usluga>
                    dataEndpoint="/Usluga"
                    getRowId={(row) => row.IdUsluga}
                    schema={[
                        { field: "Nazwa", flex: 1, minWidth: 200, editable: true, },
                        { field: "Opis", flex: 3, minWidth: 300, editable: true, },
                        //  {
                        //     field: "opcje",
                        //     width: 50,
                        //     type: "actions",
                        //     getActions({ id }) {
                        //         return [
                        //             <GridActionsCellItem
                        //                 label="usuń"
                        //                 icon={<DeleteForeverIcon />}
                        //                 color="error"
                        //                 onClick={deleteFromEndpoint(`/Usluga/${id}`)}
                        //                 key="delete"
                        //             ></GridActionsCellItem>,
                        //         ];
                        //     },
                        // },
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export default Uslugi;
