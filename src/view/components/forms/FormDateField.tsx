import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { useContext } from "react";
import { ControllerRenderProps, FieldValues, Path, useController } from "react-hook-form";
import { formContext } from "./FormDialog";
import dayjs from "dayjs";

type Props<T extends FieldValues> = { name: Path<T>; label: string } & Partial<
    Omit<DatePickerProps<unknown>, keyof ControllerRenderProps<T>>
>;

export default function FormDateField<T extends FieldValues>({
    name,
    label,
    ...dateProps
}: Props<T>) {
    const {control} = useContext(formContext)!;
    const { field, fieldState } = useController({ name, control: control! });
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <DatePicker<any>
            {...field}
            label={label}
            value={dayjs(field.value ?? null, "DD-MM-YYYY")}
            onChange={(v) => field.onChange(v?.format("DD-MM-YYYY"))}
            slotProps={{
                textField: {
                    helperText: fieldState.error?.message,
                    error: Boolean(fieldState.error),
                },
            }}
            {...dateProps}
        />
    );
}
