import { baseUrl } from "./baseUrl"

export const serverMutation = async (path, method, data, token) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const serverFetch = async (path, token) => {
    console.log("TOKEN:", token);

    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    return res.json();
};