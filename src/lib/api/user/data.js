import { baseUrl } from "@/lib/baseUrl";
import { serverFetch } from "@/lib/server"

export const userPrompts=async(email)=>{
    const res=await serverFetch(`/api/prompts/${email}`)
    return res;
}
export const Bookmarks=async(email)=>{
    const res=await serverFetch(`/api/bookmarks/${email}`)
    return res;
}


export const allPrompts = async (params) => {
    const res = await fetch(`${baseUrl}/api/prompts?${params.toString()}`, {
        cache: "no-store",
    });

    return res.json();
};

export const creatorPrompts=async(email)=>{
    const res=await serverFetch(`/api/creator-prompts/${email}`)
    return res;
}