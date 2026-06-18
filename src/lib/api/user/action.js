'use server'

import { serverMutation } from "@/lib/server"

export const addPrompt=async(product)=>{
    const res=await serverMutation('/api/prompts','POST',product)
    return res;
}
export const EditsPrompt=async(data,id)=>{
    const res=await serverMutation(`/api/prompts/${id}`,'PATCH',data)
    return res;
}