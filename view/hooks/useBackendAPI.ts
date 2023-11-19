import useSWR from "swr";
import { mockData } from "./mockAPIData";

const fetchJSON = (endpoint: RequestInfo, config?: RequestInit) =>
    fetch(endpoint, config).then((res) => res.json());

//TODO: add authentication
const useBackendAPI = <Data>(endpoint: string | null) => {
    return useSWR<Data, Error, string | null>(endpoint, fetchJSON);
};

const mockFetcher = (endpoint: string) => Promise.resolve((mockData as any)[endpoint]);

const useMockAPI = <Data>(endpoint: string | null) => {
    return useSWR<Data, Error, string | null>(endpoint, mockFetcher);
};

// export default (process.env["JEST_WORKER_ID"] ? useMockAPI : useBackendAPI);
export default useMockAPI;
