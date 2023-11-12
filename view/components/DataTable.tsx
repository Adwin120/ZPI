import React from "react";
import {
    DataGrid,
    GridValidRowModel,
    GridToolbar,
    type GridColDef,
    type DataGridProps,
} from "@mui/x-data-grid";
import useBackendAPI from "../hooks/useBackendAPI";
import { Alert, AlertTitle } from "@mui/material";

interface Props<T extends GridValidRowModel> extends Partial<DataGridProps<T>> {
    dataEndpoint: string | null;
    schema: GridColDef<T>[];
}
const DataTable = <T extends GridValidRowModel>({
    dataEndpoint,
    schema,
    ...dataGridProps
}: Props<T>) => {
    const { data, isLoading, error } = useBackendAPI<T[]>(dataEndpoint);

    if (error) {
        console.error(error);
        return (
            <Alert>
                <AlertTitle>Błąd przy pobieraniu danych</AlertTitle>
                <p>
                    {error.message}
                    <small>{error.name}</small>
                </p>
            </Alert>
        );
    }
    
    return (
        <DataGrid<T>
            loading={isLoading}
            columns={schema}
            rows={data ?? []}
            autoHeight
            slots={{
                toolbar: GridToolbar,
            }}
            slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
            {...dataGridProps}
        />
    );
};

export default DataTable;
