"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { Mail, ShieldCheck, FileText, CheckCircle2, Diamond } from "lucide-react";

export default function UserProfilePage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const role = user?.role || "user";

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 text-[#2c221e]">

            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tight">User Account Profile</h1>
                <p className="text-sm text-[#2c221e]/70 mt-1">
                    Manage your plan, credentials, and published prompt details.
                </p>
            </div>

            {/* Main Profile Card Grid */}
            <div className="bg-[#ebdcc9]/30 border border-[#dfcbaf] rounded-3xl p-6 md:p-8 space-y-8 shadow-sm backdrop-blur-sm">

                {/* Top Meta: Avatar & Credentials */}
                <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#dfcbaf]/50">
                    {/* Neon Avatar Glow styled for Earth-Theme */}
                    <div className="w-20 h-20 rounded-full bg-[#2c221e] flex items-center justify-center text-[#ebdcc9] font-black text-2xl border-2 border-[#dfcbaf] shadow-[0_0_15px_rgba(44,34,30,0.15)] overflow-hidden shrink-0">
                        {user?.image ? (
                            <img src={user.image} alt={user?.name} className="w-full h-full object-cover" />
                        ) : (
                            <span>{user?.name?.charAt(0).toUpperCase() || "A"}</span>
                        )}
                    </div>

                    <div className="text-center sm:text-left space-y-1.5">
                        <h2 className="text-2xl font-black tracking-tight text-[#2c221e]">
                            {user?.name || "Alverse Creator"}
                        </h2>

                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm font-medium text-[#2c221e]/80">
                            <Mail className="w-4 h-4 opacity-70" />
                            <span>{user?.email || "anonymous@alverse.com"}</span>
                        </div>

                        {/* Badges Row */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#2c221e] text-[#ebdcc9] px-2.5 py-1 rounded-md shadow-sm">
                                Role: {role === "create" ? "creator" : role}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest border border-[#dfcbaf] bg-[#ebdcc9]/50 text-[#2c221e] px-2.5 py-1 rounded-md shadow-sm">
                                Plan: Free
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Blocks Grid (Prompts & Status) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Prompts Counter Block */}
                    <div className="bg-[#ebdcc9]/40 border border-[#dfcbaf]/60 rounded-2xl p-5 space-y-3 shadow-sm">
                        <div className="flex items-center gap-2 text-[#2c221e]/60 font-bold uppercase tracking-wider text-xs">
                            <FileText className="w-4 h-4" />
                            <span>Prompts Published</span>
                        </div>
                        <p className="text-4xl font-black text-[#2c221e]">0</p>
                    </div>

                    {/* Account Status Block */}
                    <div className="bg-[#ebdcc9]/40 border border-[#dfcbaf]/60 rounded-2xl p-5 space-y-3 shadow-sm">
                        <div className="flex items-center gap-2 text-[#2c221e]/60 font-bold uppercase tracking-wider text-xs">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Account Status</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-700 font-black text-xl">
                            <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                            <span>Verified Member</span>
                        </div>
                    </div>
                </div>

                {/* Premium Upgrade CTA Section */}
                <div className="border border-[#dfcbaf] bg-gradient-to-r from-[#2c221e] to-[#4a3b35] text-[#ebdcc9] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden group">
                    {/* Decorative subtle shine backing */}
                    <div className="absolute inset-0 bg-white/[0.02] pointer-events-none group-hover:scale-105 transition-transform duration-500"></div>

                    <div className="space-y-1.5 text-center md:text-left relative z-10">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#dfcbaf] font-bold text-lg">
                            <Diamond className="w-5 h-5 fill-current animate-pulse" />
                            <h3>Upgrade to Pro Lifetime</h3>
                        </div>
                        <p className="text-xs text-[#ebdcc9]/80 max-w-md leading-relaxed font-medium">
                            Unlock access to all private prompt templates, parameter sets, and community reviews for a single one-time contribution of $5.
                        </p>
                    </div>

                    <button className="w-full md:w-auto bg-[#ebdcc9] text-[#2c221e] hover:bg-white font-black px-6 py-3 rounded-xl text-sm transition-all shadow-md transform active:scale-[0.98] shrink-0 relative z-10 tracking-wide">
                        Upgrade Now ($5)
                    </button>
                </div>

            </div>
        </div>
    );
}