import { baseUrl } from "./baseUrl";

export const subscription = async (data) => {
    const res = await fetch(`${baseUrl}/subscriptions`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const resData = await res.json()
    return resData;
}