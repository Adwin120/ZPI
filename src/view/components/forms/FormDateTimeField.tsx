import { TextField } from "@mui/material";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { useContext } from "react";
import { Control, ControllerRenderProps, FieldValues, Path, useController } from "react-hook-form";
import { formContext } from "./FormDialog";

type Props<T extends FieldValues> = { name: Path<T>; label: string } & Partial<
    Omit<DateTimePickerProps<unknown>, keyof ControllerRenderProps<T>>
>;

export default function FormDateTimePicker<T extends FieldValues>({
    label,
    name,
    ...dateTimeProps
}: Props<T>) {
    const formControl = useContext(formContext);
    const { field, fieldState } = useController({ name, control: formControl! });
    return (
        <DateTimePicker
            {...field}
            label={label}
            value={field.value === undefined ? null : field.value}
            slotProps={{
                textField: {
                    helperText: fieldState.error?.message,
                },
            }}
            {...dateTimeProps}
        />
    );
}
