import { useLocation } from "wouter";
import { Grafik, grafikSchema } from "../../../common/grafikSchema";
import {
    deleteFromEndpoint,
    patchEndpoint,
    showDateTime,
    useGetEndpoint,
} from "../../backendAccess";
import CommonLayout from "../layout/CommonLayout";
import { Stack } from "@mui/material";
import ActionRow from "../layout/ActionRow";
import FormButton from "../layout/FormButton";
import { GrafikFormFields } from "./Grafik";
import DeleteButton from "../layout/DeleteButton";
import DetailsCard from "../layout/DetailsCard";

interface Props {
    params: {
        id: string;
    };
}
const GrafikDetails: React.FC<Props> = ({ params: { id } }) => {
    const endpoint = `/Grafik/${id}` as const;
    const { data, isLoading } = useGetEndpoint<Grafik>(endpoint);
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle="Wpis w grafiku na ">
            <Stack alignItems={"center"} gap={3}>
                <ActionRow>
                    <FormButton
                        variant="edit"
                        onSubmit={patchEndpoint(endpoint)}
                        schema={grafikSchema}
                        title="Edytuj wpis w grafiku"
                        isLoading={isLoading}
                        defaultValues={data}
                    >
                        {GrafikFormFields}
                    </FormButton>
                    <DeleteButton
                        onClick={() => {
                            deleteFromEndpoint(endpoint)().then(() => {
                                navigate("/panel/grafik");
                            });
                        }}
                    />
                </ActionRow>
                <DetailsCard title="Status">
                    {data?.Status}
                </DetailsCard>
                <DetailsCard title="Pracownik odpowiedzialny">
                    {data?.Pracownik_IdPracownik}
                </DetailsCard>
                <DetailsCard title="Dla klienta">{data?.Klient_IdKlient}</DetailsCard>
                <DetailsCard title="Przedział czasowy">
                    <dl>
                        <dt>Od</dt>
                        <dd>{showDateTime(data?.Czas_rozpoczecia)}</dd>
                        <dt>Do</dt>
                        <dd>{showDateTime(data?.Czas_zakonczenia)}</dd>
                    </dl>
                </DetailsCard>
            </Stack>
        </CommonLayout>
    );
};

export default GrafikDetails;
