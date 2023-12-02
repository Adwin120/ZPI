import { Button, Stack, Typography } from "@mui/material";
import { Auto, autoSchema } from "../../../common/autoSchema";
import { deleteFromEndpoint, patchEndpoint, useGetEndpoint } from "../../backendAccess";
import CommonLayout from "../layout/CommonLayout";
import DetailsCard from "../layout/DetailsCard";
import DataTable, { DateTimeFormatToView } from "../DataTable";
import dayjs from "dayjs";
import ActionRow from "../layout/ActionRow";
import FormButton from "../layout/FormButton";
import { AutaFormFields } from "./Auta";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useLocation } from "wouter";
import { DateTimeFormFormat } from "../forms/FormDateTimeField";

interface Props {
    params: {
        id: string;
    };
}
const AutoDetails: React.FC<Props> = ({ params: { id } }) => {
    const { data, isLoading } = useGetEndpoint<Auto>(`/Auto/${id}`);
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle={data?.Rejestracja ?? ""}>
            <Stack alignItems={"center"} gap={3}>
                <ActionRow>
                    <FormButton
                        variant="edit"
                        onSubmit={patchEndpoint(`/Auto/${id}`)}
                        title="Edytuj auto"
                        schema={autoSchema}
                        isLoading={isLoading}
                        defaultValues={{
                            ...data,
                            Czas_rozpoczecia: dayjs(data?.Czas_rozpoczecia).format(
                                DateTimeFormFormat
                            ),
                            Czas_zakonczenia: dayjs(data?.Czas_zakonczenia).format(
                                DateTimeFormFormat
                            ),
                        }}
                    >
                        {AutaFormFields}
                    </FormButton>
                    <Button
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => {
                            deleteFromEndpoint(`/Auto/${id}`)();
                            navigate("/panel/auta");
                        }}
                    >
                        Usuń
                    </Button>
                </ActionRow>
                <DetailsCard title="Specyfikacja">
                    <dl>
                        <dt>Marka</dt>
                        <dd>TODO {data?.Model_IdModel}</dd>
                        <dt>Model</dt>
                        <dd>TODO</dd>
                    </dl>
                </DetailsCard>
                <DetailsCard title="Przedział pracy">
                    <dl>
                        <dt>Czas rozpoczęcia</dt>
                        <dd>{dayjs(data?.Czas_rozpoczecia).format(DateTimeFormatToView)}</dd>
                        <dt>Czas zakończenia</dt>
                        <dd>{dayjs(data?.Czas_zakonczenia).format(DateTimeFormatToView)}</dd>
                    </dl>
                </DetailsCard>
                <DetailsCard title="Klient">{data?.Klient_IdKlient}</DetailsCard>
                <DetailsCard title="Dodatkowe informacje">{data?.Dodatkowe_informacje}</DetailsCard>
                <DetailsCard title="Wykonywane usługi">
                    <DataTable
                        dataEndpoint={null}
                        schema={[
                            { field: "Nazwa", flex: 1 },
                            { field: "Opis", flex: 3 },
                        ]}
                    />
                </DetailsCard>
            </Stack>
        </CommonLayout>
    );
};

export default AutoDetails;
