import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../forms/FormDialog";
import { ComponentProps, useState } from "react";

type Props = Omit<ComponentProps<typeof FormDialog>, "open" | "onClose">
const AddFormButton: React.FC<Props> = (props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                Dodaj
            </Button>
            <FormDialog {...props} open={isOpen} onClose={() => setOpen(false)} />
        </>
    );
};

export default AddFormButton;
