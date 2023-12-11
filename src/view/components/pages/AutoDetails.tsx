import { Stack } from "@mui/material";
import { Auto, autoSchema } from "../../../common/autoSchema";
import {
    formDateTime,
    deleteFromEndpoint,
    patchEndpoint,
    useGetEndpoint,
    showDateTime,
} from "../../backendAccess";
import CommonLayout from "../layout/CommonLayout";
import DetailsCard from "../layout/DetailsCard";
import DataTable from "../DataTable";
import ActionRow from "../layout/ActionRow";
import FormButton from "../layout/FormButton";
import { AutaFormFields } from "./Auta";

import { useLocation } from "wouter";
import DeleteButton from "../layout/DeleteButton";
import { GridActionsCellItem } from "@mui/x-data-grid";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Auto_pracownik } from "../../../common/auto_pracownikSchema";
import { Auto_usluga } from "../../../common/auto_uslugaSchema";

interface Props {
    params: {
        id: string;
    };
}
const AutoDetails: React.FC<Props> = ({ params: { id } }) => {
    const { data, isLoading } = useGetEndpoint<Auto>(`/Auto/${id}`);
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle={data?.Rejestracja ?? ""}>
            <Stack alignItems={"center"} gap={3}>
                <ActionRow>
                    <FormButton
                        variant="edit"
                        onSubmit={patchEndpoint(`/Auto/${id}`)}
                        title="Edytuj auto"
                        schema={autoSchema}
                        isLoading={isLoading}
                        defaultValues={{
                            ...data,
                            Czas_rozpoczecia: formDateTime(data?.Czas_rozpoczecia),
                            Czas_zakonczenia: formDateTime(data?.Czas_zakonczenia),
                        }}
                    >
                        {AutaFormFields}
                    </FormButton>
                    <DeleteButton
                        onClick={() => {
                            deleteFromEndpoint(`/Auto/${id}`)().then(() => {
                                navigate("/panel/auta");
                            });
                        }}
                    />
                </ActionRow>
                <DetailsCard title="Specyfikacja">
                    <dl>
                        <dt>Marka</dt>
                        <dd>TODO {data?.Model_IdModel}</dd>
                        <dt>Model</dt>
                        <dd>TODO</dd>
                    </dl>
                </DetailsCard>
                <DetailsCard title="Przedział pracy">
                    <dl>
                        <dt>Czas rozpoczęcia</dt>
                        <dd>{showDateTime(data?.Czas_rozpoczecia)}</dd>
                        <dt>Czas zakończenia</dt>
                        <dd>{showDateTime(data?.Czas_zakonczenia)}</dd>
                    </dl>
                </DetailsCard>
                <DetailsCard title="Klient">{data?.Klient_IdKlient}</DetailsCard>
                <DetailsCard title="Dodatkowe informacje">{data?.Dodatkowe_informacje}</DetailsCard>
                <DetailsCard title="Wykonywane usługi">
                    <DataTable<Auto_usluga>
                        dataEndpoint={`/Auto_usluga/auto/${id}`}
                        getRowId={(row) => row.Usluga_IdUsluga}
                        schema={[
                            { field: "Nazwa", flex: 1 },
                            { field: "Opis", flex: 3 },
                        ]}
                    />
                </DetailsCard>
                <DetailsCard title="Pracownicy odpowiedzialni">
                    <DataTable<Auto_pracownik>
                        dataEndpoint={`/Auto_pracownik/auto/:id`}
                        getRowId={(row) => row.Pracownik_IdPracownik}
                        onRowDoubleClick={({ row }) =>
                            navigate(`/panel/pracownicy/${row.Pracownik_IdPracownik}`)
                        }
                        schema={[
                            {field: "Email", flex: 1},
                            {field: "Imie", flex: 1},
                            {field: "Nazwisko", flex: 1},
                            {
                                field: "opcje",
                                width: 50,
                                type: "actions",
                                getActions({ id }) {
                                    return [
                                        <GridActionsCellItem
                                            label="wyświetl"
                                            icon={<MoreHorizIcon />}
                                            onClick={() => navigate(`/panel/pracownicy/${id}`)}
                                            key="display"
                                        ></GridActionsCellItem>,
                                    ];
                                },
                            },
                        ]}
                    />
                </DetailsCard>
            </Stack>
        </CommonLayout>
    );
};

export default AutoDetails;
