'use server'

import { authClient } from "@/lib/auth-client";
import { baseUrl } from "@/lib/baseUrl";
import { serverMutation } from "@/lib/server"

export const addPrompt=async(product)=>{
    
    const res=await serverMutation('/api/prompts','POST',product)
    return res;
}
export const EditsPrompt=async(data,id)=>{
    const res=await serverMutation(`/api/prompts/${id}`,'PATCH',data)
    return res;
}

export const subscription=async(data)=>{
    const res=await fetch(`${baseUrl}/subscriptions`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const resData=await res.json()
    return resData;
}


