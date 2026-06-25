import { headers } from "next/headers";
import { auth } from "./auth";

export const getServerToken = async () => {
    const {token} = await auth.api.getAccessToken({
        headers: await headers(),
    });

    return token;
};