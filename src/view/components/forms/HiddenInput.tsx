import { useContext } from "react";
import { formContext } from "./FormDialog";

interface Props {
    name: string;
    value: string | number
}
const HiddenInput: React.FC<Props> = ({name, value}) => {
    const {register} = useContext(formContext)!;
    return <input type="hidden" defaultValue={value} {...register(name)} />;
};

export default HiddenInput;