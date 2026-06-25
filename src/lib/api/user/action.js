'use client'

import { authClient } from "@/lib/auth-client";
import { baseUrl } from "@/lib/baseUrl";
import { serverMutation } from "@/lib/server"


export const addPrompt = async (product) => {
    const tokenData = await authClient.token();

    const token = tokenData?.data?.token;
    // console.log(token)

    const res = await serverMutation(
        "/api/prompts",
        "POST",
        product,
        token
    );

    return res;
};

export const EditsPrompt = async (data, id) => {
    const tokenData = await authClient.token();
    const token = tokenData?.data?.token;

    const res = await serverMutation(`/api/prompts/${id}`, 'PATCH', data,token)
    return res;
}





