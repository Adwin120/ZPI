import { Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import AddFormButton from "../layout/AddFormButton";
import { deleteFromEndpoint, patchEndpoint, postToEndpoint } from "../../backendAccess";
import { uprawnienieSchema } from "../../../common/uprawnienieSchema";
import FormTextField from "../forms/FormTextField";
import FormAutocomplete from "../forms/FormAutocomplete";
import { roles } from "../../../common/userRoles";
import DataTable from "../DataTable";
import { GridActionsCellItem } from "@mui/x-data-grid";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Uprawnienia: React.FC = () => {
    return (
        <CommonLayout subpageTitle="Uprawnienia">
            <Stack alignItems="normal" gap={2}>
                <div>
                    <AddFormButton
                        title="uprawnienia"
                        onSubmit={postToEndpoint("/Uprawnienia")}
                        schema={uprawnienieSchema}
                    >
                        <FormTextField type="email" name="email" label="E-mail" required />
                        <FormTextField name="nazwa" label="Nazwa" />
                        <FormAutocomplete label="Rola" name="rola" options={roles} />
                    </AddFormButton>
                </div>
                <DataTable
                    dataEndpoint="/Uprawnienia"
                    editMode="row"
                    processRowUpdate={({ id, ...rest }) => {
                        patchEndpoint(`/Uprawnienia/${id}`)(rest);
                        return { id, ...rest };
                    }}
                    onProcessRowUpdateError={console.error}
                    schema={[
                        { field: "email", flex: 1 },
                        { field: "nazwa", flex: 1, editable: true },
                        {
                            field: "rola",
                            flex: 1,
                            editable: true,
                            type: "singleSelect",
                            valueOptions: [...roles],
                        },
                        {
                            field: "opcje",
                            width: 50,
                            type: "actions",
                            getActions({ id }) {
                                return [
                                    <GridActionsCellItem
                                        label="usuń"
                                        icon={<DeleteForeverIcon />}
                                        color="error"
                                        onClick={deleteFromEndpoint(`/Uprawnienia/${id}`)}
                                    ></GridActionsCellItem>,
                                ];
                            },
                        },
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export default Uprawnienia;
