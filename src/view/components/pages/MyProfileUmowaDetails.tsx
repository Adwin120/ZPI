import { Stack } from "@mui/material";
import { Umowa } from "../../../common/umowaSchema";
import {
    showDateTime,
    useGetEndpoint,
} from "../../backendAccess";
import CommonLayout from "../layout/CommonLayout";
import DetailsCard from "../layout/DetailsCard";
import DataTable, { EditableColumnHeader, zlotyFormatter } from "../DataTable";
import { Wersja_umowy } from "../../../common/wersja_umowySchema";
import { useLocation } from "wouter";

import { useUser } from "../../firebaseAuth";

interface Props {
    params: {
        id: string;
    };
}
const UmowaDetails: React.FC<Props> = ({ params: { id } }) => {
    const [user] = useUser();
    const endpoint = `/profil/Klient/${user?.email}/umowa/${id}` as const;
    const { data, isLoading } = useGetEndpoint<Umowa>(endpoint);
    const [_, navigate] = useLocation();
    return (
        <CommonLayout
            subpageTitle={`Umowa z ${showDateTime(
                data?.Data_rozpoczecia
            )}`}
            center
        >
            <Stack alignItems={"center"} gap={3}>
                {/* <ActionRow>
                    <FormButton
                        variant="edit"
                        isLoading={isLoading}
                        title="Edytuj umowę"
                        schema={umowaSchema}
                        onSubmit={patchEndpoint(endpoint)}
                        defaultValues={{
                            ...data,
                            Data_rozpoczecia: formDateTime(data?.Data_rozpoczecia),
                            Data_zakonczenia: formDateTime(data?.Data_zakonczenia),
                        }}
                    >
                        {UmowaFormFields}
                    </FormButton>
                    <DeleteButton
                        onClick={() => {
                            deleteFromEndpoint(endpoint)().then(() => {
                                navigate("/panel/umowy");
                            });
                        }}
                    />
                </ActionRow> */}
                {/* <DetailsCard title="Klient">
                    <Link onClick={() => navigate(`/panel/klienci/${data?.Klient_IdKlient}`)}>
                        {data?.Nazwa}
                    </Link>
                </DetailsCard> */}
                <DetailsCard title="Przedział czasowy">
                    <dl>
                        <dt>Data rozpoczęcia</dt>
                        <dd>{showDateTime(data?.Data_rozpoczecia)}</dd>
                        <dt>Data zakończenia</dt>
                        <dd>{showDateTime(data?.Data_zakonczenia)}</dd>
                    </dl>
                </DetailsCard>
                <DetailsCard title="Wykonywane usługi">
                    {/* <FormButton
                        title="Dodaj wpis w umowie"
                        onSubmit={postToEndpoint("/Wersja_umowy")}
                        schema={wersja_umowySchema}
                    >
                        <FormAutocompleteFromEndpoint<Usluga>
                            name="Usluga_IdUsluga"
                            endpoint="/Usluga"
                            label="Usługa"
                            getOptionId={(x) => x?.IdUsluga ?? 0}
                            getOptionLabel={(x) => x.Nazwa}
                        />
                        <FormTextField
                            name="Cena"
                            type="number"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">zł</InputAdornment>,
                            }}
                        />
                    </FormButton> */}
                    <DataTable<Wersja_umowy>
                        dataEndpoint={`${endpoint}/wersja_umowy`}
                        getRowId={(row) => `${row.Umowa_IdUmowa} ${row.Usluga_IdUsluga}`}
                        // processRowUpdate={({Id_Um, ...rest}) => {
                        //     patchEndpoint(`/Wersja_umowy/${id}`)(rest)
                        //     return {id, ...rest}
                        // }}
                        // onProcessRowUpdateError={console.error}
                        schema={[
                            { field: "NazwaUslugi", flex: 1, headerName: "Usługa" },
                            {
                                field: "Cena",
                                flex: 0.2,
                                type: "number",
                                // editable: true,
                                // renderHeader: EditableColumnHeader,
                                valueFormatter: ({ value }) => zlotyFormatter.format(value),
                            },
                            // {
                            //     field: "opcje",
                            //     width: 50,
                            //     type: "actions",
                            //     getActions({ id }) {
                            //         return [
                            //             <GridActionsCellItem
                            //                 label="usuń"
                            //                 icon={<DeleteForeverIcon />}
                            //                 color="error"
                            //                 onClick={deleteFromEndpoint(`/Wersja_umowy/${id}`)}
                            //                 key="delete"
                            //             ></GridActionsCellItem>,
                            //         ];
                            //     },
                            // },
                        ]}
                    />
                </DetailsCard>
            </Stack>
        </CommonLayout>
    );
};

export default UmowaDetails;
