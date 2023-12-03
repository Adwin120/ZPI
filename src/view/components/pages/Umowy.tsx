import { Stack } from "@mui/material";
import CommonLayout from "../layout/CommonLayout";
import FormButton from "../layout/FormButton";
import { DateTimeFormatFromServer, postToEndpoint } from "../../backendAccess";
import { Umowa, umowaSchema } from "../../../common/umowaSchema";
import FormAutocompleteFromEndpoint from "../forms/FormAutocompleteFromEndpoint";
import { Klient } from "../../../common/klientSchema";
import FormDateField from "../forms/FormDateField";
import DataTable, { DateFormatToView } from "../DataTable";
import dayjs from "dayjs";
import { useLocation } from "wouter";
import { GridActionsCellItem } from "@mui/x-data-grid";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface Props {}
const Umowy: React.FC<Props> = () => {
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle="Umowy">
            <Stack alignItems={"normal"} gap={2}>
                <div>
                    <FormButton
                        minimalRole="admin"
                        onSubmit={postToEndpoint("/Umowa")}
                        title="Dodaj umowę"
                        schema={umowaSchema}
                    >
                        {UmowaFormFields}
                    </FormButton>
                </div>
                <DataTable<Umowa>
                    dataEndpoint="/Umowa"
                    getRowId={(row) => row.IdUmowa}
                    onRowDoubleClick={({ row }) => navigate(`/panel/umowy/${row.IdUmowa}`)}
                    schema={[
                        {
                            field: "Data_rozpoczecia",
                            flex: 1,
                            headerName: "Data rozpoczęcia",
                            type: "date",
                            valueGetter: (row) =>
                                dayjs(row.value, DateTimeFormatFromServer).toDate(),
                            valueFormatter: (row) => dayjs(row.value).format(DateFormatToView),
                        },
                        {
                            field: "Data_zakonczenia",
                            flex: 1,
                            headerName: "Data zakończenia",
                            type: "date",
                            valueGetter: (row) =>
                                dayjs(row.value, DateTimeFormatFromServer).toDate(),
                            valueFormatter: (row) => dayjs(row.value).format(DateFormatToView),
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
                                              onClick={() => navigate(`/panel/umowy/${id}`)}
                                              key="display"
                                          ></GridActionsCellItem>,
                                      ];
                            },
                        }
                    ]}
                />
            </Stack>
        </CommonLayout>
    );
};

export const UmowaFormFields = (
    <>
        <FormAutocompleteFromEndpoint<Klient>
            endpoint="/Klient"
            label="Klient"
            name="Klient_IdKlient"
            getOptionId={(option) => option?.IdKlient ?? 0}
            getOptionLabel={(option) => `${option.Nazwa}\n${option.NIP} ${option.IdKlient}`}
        />
        <FormDateField name="Data_rozpoczecia" label="Data rozpoczęcia" />
        <FormDateField name="Data_zakonczenia" label="Data zakończenia" />
    </>
);

export default Umowy;
