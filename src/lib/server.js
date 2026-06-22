import { baseUrl } from "./baseUrl"

export const serverMutation=async(path,method,data)=>{
    const {data:token}=await authClient.token()
    const res=await fetch(`${baseUrl}${path}`,{
        method:method,
        headers:{
            'Content-Type':'application/json',
            'authorization':`Bearer ${token.token}`
        },
        body:JSON.stringify(data)
    })

    return res.json(data)
}

export const serverFetch=async(path)=>{
    const res=await fetch(`${baseUrl}${path}`)
    return res.json()
}