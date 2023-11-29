import {
    DataGrid,
    GridValidRowModel,
    GridToolbar,
    type GridColDef,
    type DataGridProps,
} from "@mui/x-data-grid";
import { Alert, AlertTitle } from "@mui/material";
import { Endpoint, useGetEndpoint } from "./../backendAccess";

interface Props<Row extends GridValidRowModel> extends Partial<DataGridProps<Row>> {
    dataEndpoint: Endpoint | null;
    schema: GridColDef<Row>[];
}
const DataTable = <Row extends GridValidRowModel>({
    dataEndpoint,
    schema,
    ...dataGridProps
}: Props<Row>) => {
    const { data, isLoading, error } = useGetEndpoint<Row[]>(dataEndpoint);

    if (error) {
        console.error(error);
        return (
            <Alert severity="error">
                <AlertTitle>Błąd przy pobieraniu danych</AlertTitle>
                <p>
                    {error.message}
                    <small>{error.name}</small>
                </p>
            </Alert>
        );
    }

    return (
        <DataGrid<Row>
            loading={isLoading}
            columns={schema}
            rows={data ?? []}
            autoHeight
            slots={{
                toolbar: GridToolbar,
            }}
            slotProps={{
                toolbar: {
                    printOptions: { hideToolbar: true, hideFooter: true },
                    csvOptions: { fileName: dataEndpoint },
                },
            }}
            {...dataGridProps}
        />
    );
};

export default DataTable;
