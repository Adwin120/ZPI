import { useLocation } from "wouter";
import { Klient, klientSchema } from "../../../common/klientSchema";
import { deleteFromEndpoint, patchEndpoint, useGetEndpoint } from "../../backendAccess";
import CommonLayout from "../layout/CommonLayout";
import { Stack } from "@mui/material";
import ActionRow from "../layout/ActionRow";
import DetailsCard from "../layout/DetailsCard";
import FormButton from "../layout/FormButton";
import DeleteButton from "../layout/DeleteButton";
import { KlienciFormFields } from "./Klienci";

interface Props {
    params: {
        id: string;
    };
}
const KlientDetails: React.FC<Props> = ({ params: { id } }) => {
    const endpoint = `/Klient/${id}` as const;
    const { data, isLoading } = useGetEndpoint<Klient>(endpoint);
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle={data?.Nazwa ?? "Klient"}>
            <Stack alignItems={"center"} gap={3}>
                <ActionRow>
                    <FormButton
                        onSubmit={patchEndpoint(endpoint)}
                        schema={klientSchema}
                        title="Edytuj dane klienta"
                        isLoading={isLoading}
                        defaultValues={data}
                    >{KlienciFormFields}</FormButton>
                    <DeleteButton
                        onClick={() => {
                            deleteFromEndpoint(endpoint)();
                            navigate("/panel/klienci");
                        }}
                    />
                </ActionRow>
                <DetailsCard title="Numer NIP">{data?.NIP}</DetailsCard>
                <DetailsCard title="Dane Kontaktowe">
                    <dl>
                        <dt>Email</dt>
                        <dd>{data?.Email}</dd>
                        <dt>Adres</dt>
                        <dd>{data?.Adres}</dd>
                        <dt>Telefon</dt>
                        <dd>{data?.Telefon}</dd>
                    </dl>
                </DetailsCard>
            </Stack>
        </CommonLayout>
    );
};

export default KlientDetails;
