import { auth } from "./firebaseAuth";
import useSWR from "swr";
import { mutate } from "swr";

export const postToEndpoint =
    (endpoint: string, then: (res: Response) => unknown = (x) => Promise.resolve(x)) =>
    async (payload: object) => {
        console.log(payload);
        const user = auth.currentUser;

        const headers = new Headers({
            "Content-Type": "application/json",
        });
        if (user) {
            const token = await user.getIdToken();
            headers.append("Authorization", "Bearer " + token);
        }

        const data = fetch(endpoint, {
            headers,
            body: JSON.stringify(payload),
            method: "POST",
        }).then(then);

        mutate(endpoint);
        console.log("posted to", endpoint, "got response", data);
        return data;
    };

const fetchJSON = async (endpoint: RequestInfo) => {
    const user = auth.currentUser;
    const headers = new Headers();
    if (user) {
        const token = await user.getIdToken();
        headers.append("Authorization", "Bearer " + token);
    }

    const data = await fetch(endpoint, { headers }).then((res) => res.json());
    console.log("fetched from", endpoint, data);
    return data;
};

export const useGetEndpoint = <Data>(endpoint: string | null) => {
    return useSWR<Data, Error, string | null>(endpoint, fetchJSON);
};
