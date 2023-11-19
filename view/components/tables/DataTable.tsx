import React from "react";

import {
    DataGrid,
    GridValidRowModel,
    GridToolbar,
    type GridColDef,
    type DataGridProps,
} from "@mui/x-data-grid";

import useBackendAPI from "../../hooks/useBackendAPI";
import { Alert, AlertTitle } from "@mui/material";

interface Props<Row extends GridValidRowModel> extends Partial<DataGridProps<Row>> {
    dataEndpoint: string | null;
    schema: GridColDef<Row>[];
}
const DataTable = <Row extends GridValidRowModel>({
    dataEndpoint,
    schema,
    ...dataGridProps
}: Props<Row>) => {
    const { data, isLoading, error } = useBackendAPI<Row[]>(dataEndpoint);

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
