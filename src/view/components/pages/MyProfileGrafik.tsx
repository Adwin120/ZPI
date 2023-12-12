import { Link, Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import FormButton from "../layout/FormButton";
import { postToEndpoint } from "../../backendAccess";
import { Grafik as MyProfileGrafik, grafikSchema } from "../../../common/grafikSchema";
import FormAutocompleteFromEndpoint from "../forms/FormAutocompleteFromEndpoint";
import { Pracownik } from "../../../common/pracownikSchema";
import { Klient } from "../../../common/klientSchema";
import FormDateTimePicker from "../forms/FormDateTimeField";
import DataTable, { DateTimeFormatToView } from "../DataTable";
import dayjs from "dayjs";
import { useLocation } from "wouter";
import { acceptanceOptions } from "../../../common/AcceptanceStatus";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DateTimeFormatFromServer } from "../../../common/DateTime";
import { useUser } from "../../firebaseAuth";
import FormTextField from "../forms/FormTextField";

interface Props {}
const MyProfileGrafik: React.FC<Props> = () => {
    const [_, navigate] = useLocation();
    const [user] = useUser();
    const endpoint = `/profil/Pracownik/${user?.email}/grafik` as const;
    
    return (
        <CommonLayout subpageTitle="Mój Grafik">
            <Stack alignItems={"normal"} gap={2}>
                <div>
                    <FormButton
                        minimalRole="pracownik"
                        onSubmit={postToEndpoint(endpoint)}
                        schema={grafikSchema}
                        title="Dodaj wpis w grafiku"
                    >
                        {GrafikFormFields}
                    </FormButton>
                </div>
                <DataTable<MyProfileGrafik>
                    dataEndpoint={endpoint}
                    getRowId={(row) => row.IdGrafik}
                    onRowDoubleClick={({ row }) => navigate(`/panel/grafik/${row.IdGrafik}`)}
                    schema={grafikTableSchema(navigate)}
                />
            </Stack>
        </CommonLayout>
    );
};

export const grafikTableSchema: (
    navigator: (to: string) => void
) => GridColDef<MyProfileGrafik>[] = (navigate) => [
    {
        field: "Klient",
        headerName: "Klient",
        flex: 1,
        valueGetter: ({ row }) => row.Nazwa,
        renderCell: ({ row, value }) => (
            <Link onClick={() => navigate(`/panel/klienci/${row.Klient_IdKlient}`)}>{value}</Link>
        ),
    },
    {
        field: "Czas_rozpoczecia",
        flex: 1,
        minWidth: 140,
        headerName: "Czas rozpoczęcia",
        type: "dateTime",
        valueGetter: (row) => dayjs(row.value, DateTimeFormatFromServer).toDate(),
        valueFormatter: (row) => dayjs(row.value).format(DateTimeFormatToView),
    },
    {
        field: "Czas_zakonczenia",
        flex: 1,
        minWidth: 140,
        headerName: "Czas zakończenia",
        type: "dateTime",
        valueGetter: (row) => dayjs(row.value, DateTimeFormatFromServer).toDate(),
        valueFormatter: (row) => dayjs(row.value).format(DateTimeFormatToView),
    },
    {
        field: "Status",
        flex: 0.5,
        minWidth: 100,
        type: "singleSelect",
        valueOptions: acceptanceOptions,
    },
    {
        field: "opcje",
        width: 50,
        type: "actions",
        getActions({ id }) {
            return [
                <GridActionsCellItem
                    label="wyświetl"
                    icon={<MoreHorizIcon />}
                    onClick={() => navigate(`/panel/grafik/${id}`)}
                    key="display"
                ></GridActionsCellItem>,
            ];
        },
    },
];

export const GrafikFormFields = (
    <>
        <FormTextField type="hidden" name="Pracownik_IdPracownik" sx={{opacity: 0}} hidden/>
        <FormAutocompleteFromEndpoint<Klient>
            endpoint="/Klient"
            label="Klient"
            name="Klient_IdKlient"
            getOptionId={(option) => option?.IdKlient ?? 0}
            getOptionLabel={(option) => `${option.Nazwa}`}
        />
        <FormDateTimePicker name="Czas_rozpoczecia" label="Czas rozpoczęcia" />
        <FormDateTimePicker name="Czas_zakonczenia" label="Czas zakończenia" />
    </>
);

export default MyProfileGrafik;
