import { useLocation } from "wouter";
import { Pracownik, pracownikSchema } from "../../../common/pracownikSchema";
import { deleteFromEndpoint, patchEndpoint, useGetEndpoint } from "../../backendAccess";
import CommonLayout from "../layout/CommonLayout";
import { Stack } from "@mui/material";
import ActionRow from "../layout/ActionRow";
import FormButton from "../layout/FormButton";
import { PracownicyFormFields } from "./Pracownicy";
import DeleteButton from "../layout/DeleteButton";
import DetailsCard from "../layout/DetailsCard";

interface Props {
    params: {
        id: string;
    };
}
const PracownikDetails: React.FC<Props> = ({ params: { id } }) => {
    const endpoint = `/Pracownik/${id}` as const;
    const { data, isLoading } = useGetEndpoint<Pracownik>(`/Auto/${id}`);
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle={`Pracownik ${data?.Imie} ${data?.Nazwisko}`}>
            <Stack alignItems={"center"} gap={3}>
                <ActionRow>
                    <FormButton
                        variant="edit"
                        title="Edytuj dane pracownika"
                        onSubmit={patchEndpoint(endpoint)}
                        schema={pracownikSchema}
                        isLoading={isLoading}
                        defaultValues={data}
                    >
                        {PracownicyFormFields}
                    </FormButton>
                    <DeleteButton
                        onClick={() => {
                            deleteFromEndpoint(endpoint)().then(() => {
                                navigate("/panel/pracownicy");
                            });
                        }}
                    />
                </ActionRow>
                <DetailsCard title="Dane kontaktowe">
                    <dl>
                        <dt>E-mail</dt>
                        <dd>{data?.Email}</dd>
                        <dt>Telefon</dt>
                        <dd>{data?.Telefon}</dd>
                    </dl>
                </DetailsCard>
            </Stack>
        </CommonLayout>
    );
};

export default PracownikDetails;
