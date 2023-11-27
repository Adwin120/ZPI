import { auth } from "./firebaseAuth";

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

        return fetch(endpoint, {
            headers,
            body: JSON.stringify(payload),
            method: "POST",
        }).then(then);
    };
