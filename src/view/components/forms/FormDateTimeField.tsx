import { TextField } from "@mui/material";
import { Control, ControllerRenderProps, FieldValues, Path, useController } from "react-hook-form";

type Props<T extends FieldValues> = { name: Path<T>; control: Control<T>; label: string } & Partial<
  Omit<DateTimePickerProps<unknown, unknown>, keyof ControllerRenderProps<T>>
>;

export default function FormDateTimePicker<T extends FieldValues>({
  control,
  label,
  name,
  ...dateTimeProps
}: Props<T>) {
  const { field, fieldState } = useController<T>({ name, control });
  return (
    <DateTimePicker
      {...field}
      value={field.value === undefined ? null : field.value}
      renderInput={(props) => <TextField {...props} helperText={fieldState.error?.message} error={Boolean(fieldState.error)}/>}
      {...dateTimeProps}
    />
  );
}