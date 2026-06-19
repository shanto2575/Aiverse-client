'use client'
import React from 'react'

const UpdateToPremiumButton = () => {
    const updateToPrimium=async()=>{
        const res=await fetch('/api/checkout_sessions',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await res.json()
        // console.log(data)
        if(data?.url){
            window.location.href=data?.url;
        }
        
    }
    return (
            <button
                onClick={updateToPrimium}
                className="w-full md:w-auto bg-[#ebdcc9] text-[#2c221e] hover:bg-white font-black px-6 py-3 rounded-xl text-sm transition-all shadow-md transform active:scale-[0.98] shrink-0 relative z-10 tracking-wide cursor-pointer">
                Upgrade Now ($5)
            </button>
    )
}

export default UpdateToPremiumButton