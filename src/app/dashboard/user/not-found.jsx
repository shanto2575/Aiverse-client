"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#ebdcc9] text-[#2c221e] px-4 relative overflow-hidden">

            {/* Background Decorative Ambient Layer */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#4a3b35]/5 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#2c221e]/5 blur-[130px] pointer-events-none" />

            {/* Main Container */}
            <div className="relative z-10 text-center max-w-xl mx-auto space-y-8">

                {/* Animated Brand Vector / Graphic Area */}
                <div className="relative flex items-center justify-center mx-auto w-32 h-32 md:w-40 md:h-40">
                    {/* Pulsing Back Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2c221e]/10 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-4 rounded-full bg-[#2c221e]/5 flex items-center justify-center border border-[#dfcbaf]/50 shadow-sm">
                        <HelpCircle className="w-12 h-12 md:w-16 md:h-16 text-[#2c221e]/40 animate-pulse" />
                    </div>

                    {/* Big Abstract 404 Text Background Layer */}
                    <h1 className="absolute text-[9rem] md:text-[11rem] font-black tracking-tighter text-[#2c221e]/5 select-none z-[-1]">
                        404
                    </h1>
                </div>

                {/* Text Section */}
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider bg-gradient-to-r from-[#2c221e] via-[#4a3b35] to-[#2c221e] bg-clip-text text-transparent">
                        Page Lost in AIverse
                    </h2>
                    <p className="text-sm md:text-base text-[#2c221e]/70 font-medium max-w-md mx-auto leading-relaxed">
                        The prompt or destination you are looking for doesn't exist or has been shifted to another parameter space.
                    </p>
                </div>

                {/* Dynamic Action Buttons Grid */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

                    {/* Go Back Button */}
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#dfcbaf] bg-[#ebdcc9]/50 hover:bg-[#2c221e]/5 text-[#2c221e] font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        <span>Go Back</span>
                    </button>

                    {/* Return Home Button */}
                    <Link href="/" className="w-full sm:w-auto">
                        <button
                            type="button"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] font-black px-6 py-3 rounded-xl text-sm transition-all shadow-md active:scale-[0.98] tracking-wide cursor-pointer text-center"
                        >
                            <Home size={16} />
                            <span>Return Home</span>
                        </button>
                    </Link>

                </div>
            </div>

            {/* Footer Branding Inside Not Found */}
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2c221e]/30">
                    AIverse Ecosystem
                </span>
            </div>
        </div>
    );
}