import useSWR from "swr";

const fetchJSON = (endpoint: RequestInfo, config?: RequestInit) =>
    fetch(endpoint, config).then((res) => res.json());

//TODO: add authentication
const useBackendAPI = <Data>(endpoint: string | null) => {
    return useSWR<Data, Error, string | null>(endpoint, fetchJSON);
};

export default useBackendAPI