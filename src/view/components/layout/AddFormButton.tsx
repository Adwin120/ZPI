import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../forms/FormDialog";
import { ComponentProps, useState } from "react";
import { Role, roleGreaterOrEqual } from "../../../common/userRoles";
import { useRole } from "../../firebaseAuth";

type Props = Omit<ComponentProps<typeof FormDialog>, "open" | "onClose"> & {
    minimalRole?: Role;
};
const AddFormButton: React.FC<Props> = ({ minimalRole = "brak", ...formProps }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const [role] = useRole();
    if (!role || !roleGreaterOrEqual(role, minimalRole)) {
        return <></>;
    }

    return (
        <>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                Dodaj
            </Button>
            <FormDialog {...formProps} open={isOpen} onClose={() => setOpen(false)} />
        </>
    );
};

export default AddFormButton;
