import {
    DataGrid,
    GridValidRowModel,
    GridToolbar,
    type GridColDef,
    type DataGridProps,
    GridColumnHeaderParams,
} from "@mui/x-data-grid";
import { Alert, AlertTitle } from "@mui/material";
import { Endpoint, useGetEndpoint } from "./../backendAccess";
import EditIcon from "@mui/icons-material/Edit";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const EditableColumnHeader: React.FC<GridColumnHeaderParams<any>> = ({
    colDef: { editable, headerName, field, headerClassName },
}) => {
    console.log("headername", headerClassName);
    return (
        <div className="MuiDataGrid-columnHeaderTitle" style={{ fontWeight: 500 }}>
            {headerName ?? field}
            {editable && <EditIcon sx={{verticalAlign: "middle"}}/>}
        </div>
    );
};

export const DateTimeFormatToView = "DD-MM-YYYY HH:mm";

export default DataTable;
