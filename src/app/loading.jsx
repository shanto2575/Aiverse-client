"use client";

import React from "react";

export default function LoadingPage() {
    return (
        <div className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#ebdcc9] text-[#2c221e] overflow-hidden">

            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#4a3b35]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#2c221e]/5 blur-[120px] pointer-events-none" />

            <div className="relative flex flex-col items-center space-y-6 z-10">
                <div className="relative flex items-center justify-center w-24 h-24">
                    <div className="absolute inset-0 rounded-full border border-[#dfcbaf]/40 animate-ping opacity-25" />
                    <div className="absolute w-20 h-20 rounded-full border-2 border-dashed border-[#2c221e]/20 animate-[spin_8s_linear_infinite]" />
                    <div className="w-16 h-16 rounded-full border-4 border-[#2c221e]/10 border-t-[#2c221e] border-r-[#4a3b35] animate-spin shadow-[0_0_20px_rgba(44,34,30,0.1)]" />
                    <div className="absolute w-4 h-4 rounded-full bg-[#2c221e]" />
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-xl font-black uppercase tracking-[0.25em] bg-gradient-to-r from-[#2c221e] via-[#4a3b35] to-[#2c221e] bg-clip-text text-transparent animate-pulse">
                        AIverse
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/60">
                        Securing Connection...
                    </p>
                </div>

                <div className="w-40 h-[3px] bg-[#dfcbaf]/40 rounded-full overflow-hidden relative border border-[#dfcbaf]/20">
                    <div className="absolute top-0 bottom-0 left-0 bg-[#2c221e] w-1/2 rounded-full animate-[loading-bar_1.5s_ease-in-out_infinite]" />
                </div>
            </div>
        </div>
    );
}