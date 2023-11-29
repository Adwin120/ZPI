import toast from "react-hot-toast";
import { auth } from "./firebaseAuth";
import useSWR from "swr";
import { mutate } from "swr";

const makeDefaultHeaders = async () => {
    const user = auth.currentUser;

    const headers = new Headers({
        "Content-Type": "application/json",
    });
    if (user) {
        const token = await user.getIdToken();
        headers.append("Authorization", "Bearer " + token);
    }

    return headers;
};

export const postToEndpoint = (endpoint: string) => async (payload: object) => {
    console.log(payload);
    const headers = await makeDefaultHeaders();

    const responsePromise = fetch(endpoint, {
        headers,
        body: JSON.stringify(payload),
        method: "POST",
    }).then((res) => res.text());

    toast.promise(responsePromise, {
        loading: "Dodawanie...",
        success: (d) => d,
        error: (e) => e,
    });

    const response = await responsePromise;
    mutate(endpoint);
    console.log("posted to", endpoint, "got response", response);
    return response;
};

export const patchEndpoint = (endpoint: string) => async (payload: object) => {
    console.log(payload);
    const headers = await makeDefaultHeaders();

    const responsePromise = fetch(endpoint, {
        headers,
        body: JSON.stringify(payload),
        method: "PATCH",
    }).then((res) => res.text());

    toast.promise(responsePromise, {
        loading: "Edytowanie...",
        error: (e) => e,
        success: (d) => d,
    });

    const response = await responsePromise;
    mutate(endpoint);
    return response;
};

export const deleteFromEndpoint = (endpoint: string) => async () => {
    const headers = await makeDefaultHeaders();
    const responsePromise = fetch(endpoint, {
        headers,
        method: "DELETE",
    }).then((res) => res.text());

    toast.promise(responsePromise, {
        loading: "Usuwanie...",
        error: (e) => e,
        success: (d) => d,
    });

    const response = await responsePromise;
    mutate(endpoint);
    return response;
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
