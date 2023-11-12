import React from "react";
import {
    DataGrid,
    GridValidRowModel,
    GridToolbar,
    type GridColDef,
    type DataGridProps,
} from "@mui/x-data-grid";
import useBackendAPI from "../hooks/useBackendAPI";

interface Props<T extends GridValidRowModel> extends Partial<DataGridProps<T>> {
    dataEndpoint: string | null;
    schema: GridColDef<T>[];
}
const DataTable = <T extends GridValidRowModel>({
    dataEndpoint,
    schema,
    ...dataGridProps
}: Props<T>) => {
    const { data, isLoading } = useBackendAPI<T[]>(dataEndpoint);
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
