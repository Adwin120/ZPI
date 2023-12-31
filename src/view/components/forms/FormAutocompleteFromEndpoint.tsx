import { Endpoint, useGetEndpoint } from "../../backendAccess";
import FormAutocomplete from "./FormAutocomplete";

interface Props<T> {
    name: string;
    label: string;
    endpoint: Endpoint;
    getOptionId: (option: T | null) => string | number | null;
    getOptionLabel: (option: T) => string;
}
const FormAutocompleteFromEndpoint = <T,>({
    endpoint,
    label,
    name,
    getOptionId,
    getOptionLabel,
}: Props<T>) => {
    const { data, isLoading } = useGetEndpoint<T[]>(endpoint);
    return (
        <FormAutocomplete<T>
            label={label}
            name={name}
            loading={isLoading}
            options={data ?? []}
            isOptionEqualToValue={(option, value) =>
                getOptionId(option) === getOptionId(value) || getOptionId(option) === value
            }
            getOptionLabel={(option) => (option ? getOptionLabel(option) : "")}
            optionToValue={getOptionId}
        />
    );
};

export default FormAutocompleteFromEndpoint;
