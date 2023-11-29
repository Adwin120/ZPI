import { useContext } from "react";
import { formContext } from "./FormDialog";
import { useController } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface Props<T> {
    name: string;
    label: string;
    options: readonly T[];
}
const FormAutocomplete = <T,>({ name, label, options }: Props<T>) => {
    const formControl = useContext(formContext);
    const { field, fieldState } = useController({ name, control: formControl! });
    return (
        <Autocomplete<T>
            {...field}
            value={field.value ?? null}
            onChange={(_, v) => field.onChange(v)}
            renderInput={(props) => (
                <TextField
                    {...props}
                    label={label}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                />
            )}
            options={options}
        />
    );
};

export default FormAutocomplete;
