const mockKlientData: {
    id: number;
    nazwa: string;
    email: string;
    adres: string;
}[] = [
    { id: 1, nazwa: "Jan", email: "Jan@gmail.com", adres: "Janowska 2, Pawłowice" },
    { id: 2, nazwa: "Piotr", email: "Piotr@gmail.com", adres: "Andrzejska 2, Piotrowice" },
    { id: 3, nazwa: "Grzegorz", email: "Grzegorz@gmail.com", adres: "Grygorska 3, Oleśnica" },
];

export const mockData = {
    Klient: mockKlientData,
};
