//TODO: add authentication
export const postToEndpoint =
    (endpoint: string, then: (res: Response) => unknown = (x) => Promise.resolve(x)) =>
    (payload: object) => {
        console.log(payload);
        return fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            method: "POST",
        }).then(then);
    };
