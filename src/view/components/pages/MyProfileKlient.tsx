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
import DataTable from "../DataTable";
import { Auto } from "../../../common/autoSchema";
import { Umowa } from "../../../common/umowaSchema";
import { autaTableSchema, limitedAutaTableSchema } from "./Auta";
import { umowyTableSchema } from "./Umowy";
import { useUser } from "../../firebaseAuth";

interface Props {
    params: {
        id: string;
    };
}
const MyProfileKlient: React.FC<Props> = ({ params: { id } }) => {
    const [user] = useUser();
    const endpoint = `/profil/Klient/${encodeURIComponent(user?.email ?? "")}` as const;

    const { data, isLoading } = useGetEndpoint<Klient>(endpoint);
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle="Moje dane" center>
            <Stack alignItems={"center"} gap={3}>
                <ActionRow>
                    {/* <FormButton
                        variant="edit"
                        onSubmit={patchEndpoint(endpoint)}
                        schema={klientSchema}
                        title="Edytuj dane klienta"
                        isLoading={isLoading}
                        defaultValues={data}
                    >
                        {KlienciFormFields}
                    </FormButton>
                    <DeleteButton
                        onClick={() => {
                            deleteFromEndpoint(endpoint)().then(() => {
                                navigate("/panel/klienci");
                            });
                        }}
                    /> */}
                </ActionRow>
                <DetailsCard title="Numer NIP">{data?.NIP}</DetailsCard>
                <DetailsCard title="Dane Kontaktowe">
                    <dl>
                        <dt>Email</dt>
                        <dd><a href={`mailto:${data?.Email}`}>{data?.Email}</a></dd>
                        <dt>Adres</dt>
                        <dd>{data?.Adres}</dd>
                        <dt>Telefon</dt>
                        <dd><a href={`tel:${data?.Telefon}`}>{data?.Telefon}</a></dd>
                    </dl>
                </DetailsCard>
                <DetailsCard title="Auta">
                    <DataTable<Auto>
                        getRowId={(row) => row.IdAuto}
                        dataEndpoint={`${endpoint}/auto`}
                        schema={limitedAutaTableSchema(navigate)}
                        // onRowDoubleClick={({ row }) => navigate(`/panel/auta/${row.IdAuto}`)}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    Klient_nazwa: false
                                }
                            }
                        }}
                    />
                </DetailsCard>
                <DetailsCard title="Umowy">
                    <DataTable<Umowa>
                        getRowId={(row) => row.IdUmowa}
                        dataEndpoint={`${endpoint}/umowa`}
                        schema={umowyTableSchema(navigate)}
                        onRowDoubleClick={({ row }) => navigate(`/panel/klient/umowa/${row.IdUmowa}`)}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    Klient: false
                                }
                            }
                        }}
                    />
                </DetailsCard>
            </Stack>
        </CommonLayout>
    );
};

export default MyProfileKlient;
