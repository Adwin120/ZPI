import { useLocation } from "wouter";
import { Pracownik, pracownikSchema } from "../../../common/pracownikSchema";
import { patchEndpoint, useGetEndpoint } from "../../backendAccess";
import CommonLayout from "../layout/CommonLayout";
import { Stack } from "@mui/material";
import ActionRow from "../layout/ActionRow";
import FormButton from "../layout/FormButton";
import { LimitedEditPracownicyFormFields } from "./Pracownicy";
import DetailsCard from "../layout/DetailsCard";
import { useUser } from "../../firebaseAuth";

interface Props {}
const MyProfilePracownik: React.FC<Props> = () => {
    const [user] = useUser();
    const endpoint = `/profil/Pracownik/${encodeURIComponent(user?.email ?? "")}` as const;
    const { data, isLoading } = useGetEndpoint<Pracownik>(endpoint);
    const [_, navigate] = useLocation();
    return (
        <CommonLayout subpageTitle={`Mój profil`} center>
            <Stack alignItems={"center"} gap={3}>
                <ActionRow>
                    <FormButton
                        variant="edit"
                        title="Edytuj swoje dane"
                        onSubmit={patchEndpoint(endpoint)}
                        schema={pracownikSchema}
                        isLoading={isLoading}
                        defaultValues={data}
                    >
                        {LimitedEditPracownicyFormFields}
                    </FormButton>
                </ActionRow>
                <DetailsCard title="Dane osobiste">
                    <dl>
                        <dt>Imię</dt>
                        <dd>{data?.Imie}</dd>
                        <dt>Nazwisko</dt>
                        <dd>{data?.Nazwisko}</dd>
                    </dl>
                </DetailsCard>
                <DetailsCard title="Dane kontaktowe">
                    <dl>
                        <dt>E-mail</dt>
                        <dd>
                            <a href={`mailto:${data?.Email}`}>{data?.Email}</a>
                        </dd>
                        <dt>Telefon</dt>
                        <dd>
                            <a href={`tel:${data?.Telefon}`}>{data?.Telefon}</a>
                        </dd>
                    </dl>
                </DetailsCard>
                {/* <DetailsCard title="Grafik">
                    <DataTable<Grafik>
                        getRowId={(row) => row.IdGrafik}
                        dataEndpoint={`${endpoint}/grafik`}
                        schema={grafikTableSchema(navigate)}
                        onRowDoubleClick={({ row }) => navigate(`/panel/grafik/${row.IdGrafik}`)}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    Pracownik: false,
                                },
                            },
                        }}
                    />
                </DetailsCard> */}
            </Stack>
        </CommonLayout>
    );
};

export default MyProfilePracownik;
