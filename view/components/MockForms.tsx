import { Button, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import FormDialog from "./FormDialog";

interface Props {}
const MockForms: React.FC<Props> = () => {
    const [activeFormId, setActiveFormId] = useState<1 | 2 | 3 | null>(null);
    const closeDialog = useCallback(() => setActiveFormId(null), []);

    return (
        <>
            <Button onClick={() => setActiveFormId(1)} variant="outlined">
                otwórz formularz 1
            </Button>
            <Button onClick={() => setActiveFormId(2)} variant="outlined">
                otwórz formularz 2
            </Button>
            <Button onClick={() => setActiveFormId(3)} variant="outlined">
                otwórz formularz 3
            </Button>

            <FormDialog
                open={activeFormId === 1}
                onClose={closeDialog}
                submitEndpoint="endpoint1" //TODO: endpoint
                title="formularz 1"
            >
                <TextField name="nazwa" label="Nazwa" />
                <TextField type="email" name="email" label="E-mail" />
                <TextField name="adres" label="Adres" />
                <TextField name="nip" label="NIP" />
                <TextField type="tel" name="telefon" label="Telefon" />
            </FormDialog>

            <FormDialog
                open={activeFormId === 2}
                onClose={closeDialog}
                submitEndpoint="endpoint2" //TODO: endpoint
                title="formularz 2"
            >
                <TextField type="email" name="email" label="E-mail" />
                <TextField type="password" name="haslo" label="Hasło" />
                <TextField name="imie" label="Imię" />
                <TextField name="nazwisko" label="Nazwisko" />
                <TextField type="tel" name="telefon" label="Telefon" />
            </FormDialog>

            <FormDialog
                open={activeFormId === 3}
                onClose={closeDialog}
                submitEndpoint="endpoint3" //TODO: endpoint
                title="formularz 3"
            >
                <TextField name="pracownikID" label="Pracownik ID" />
                <TextField name="klientID" label="Klient ID" />
                <TextField name="opis" label="Opis" multiline minRows={2} />
                <TextField name="status" label="Status" />
            </FormDialog>
        </>
    );
};

export default MockForms;
