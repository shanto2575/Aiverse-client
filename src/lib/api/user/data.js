import { serverFetch } from "@/lib/server"

export const userPrompts=async(email)=>{
    const res=await serverFetch(`/api/prompts/${email}`)
    return res;
}

export const allPrompts=async()=>{
    const res=await serverFetch('/api/prompts')
    return res;
}