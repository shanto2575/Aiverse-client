import React from "react";
import { Mail, ShieldCheck, FileText, CheckCircle2, Diamond, Sparkles, Crown } from "lucide-react";
import { getUser } from "@/lib/session";
import { baseUrl } from "@/lib/baseUrl";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function UserProfilePage() {
    const user = await getUser();
    const role = user?.role || "user";

    const res = await fetch(
        `${baseUrl}/api/user/${user?.email}`,
        { cache: "no-store" }
    );
    const data = await res.json();

    const livePlan = data?.plan || data?.user?.plan || user?.plan || "free";

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 text-[#2c221e]">

            <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tight">User Account Profile</h1>
                <p className="text-sm text-[#2c221e]/70 mt-1">
                    Manage your plan, credentials, and published prompt details.
                </p>
            </div>

            <div className="bg-[#ebdcc9]/30 border border-[#dfcbaf] rounded-3xl p-6 md:p-8 space-y-8 shadow-sm backdrop-blur-sm">

                {/* Top Meta: Avatar & Credentials */}
                <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-[#dfcbaf]/50">
                    <div className="w-20 h-20 rounded-full bg-[#2c221e] flex items-center justify-center text-[#ebdcc9] font-black text-2xl border-2 border-[#dfcbaf] shadow-[0_0_15px_rgba(44,34,30,0.15)] overflow-hidden shrink-0">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user?.name || "Avatar"}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover" />
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
                            <span>{user?.email}</span>
                        </div>

                        {/* Badges Row */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#2c221e] text-[#ebdcc9] px-2.5 py-1 rounded-md shadow-sm">
                                Role: {role}
                            </span>
                            
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm transition-all ${
                                livePlan === "pro"
                                ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse"
                                : "border border-[#dfcbaf] bg-[#ebdcc9]/50 text-[#2c221e]"
                                }`}>
                                Plan: {livePlan}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Blocks Grid (Prompts & Status) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#ebdcc9]/40 border border-[#dfcbaf]/60 rounded-2xl p-5 space-y-3 shadow-sm">
                        <div className="flex items-center gap-2 text-[#2c221e]/60 font-bold uppercase tracking-wider text-xs">
                            <FileText className="w-4 h-4" />
                            <span>Prompts Published</span>
                        </div>
                        <p className="text-4xl font-black text-[#2c221e]">{data?.promptCount || 0}</p>
                    </div>

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

                {livePlan !== "pro" ? (
                    /* Free Tier Card */
                    <div className="border border-[#dfcbaf] bg-gradient-to-r from-[#2c221e] to-[#4a3b35] text-[#ebdcc9] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden group">
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
                        <form action={'/api/checkout_sessions'} method='POST'>
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-[#ebdcc9] text-[#2c221e] hover:bg-white font-black px-6 py-3 rounded-xl text-sm transition-all shadow-md transform active:scale-[0.98] shrink-0 relative z-10 tracking-wide cursor-pointer">
                                Upgrade Now ($5)
                            </button>
                        </form>
                    </div>
                ) : (
                    /* PRO Card */
                    <div className="relative overflow-hidden rounded-2xl p-0.5 bg-gradient-to-r from-amber-400 via-purple-500 to-yellow-500 shadow-[0_10px_30px_rgba(139,92,246,0.15)] group">
                        <div className="bg-gradient-to-br from-[#1e1512] via-[#241324] to-[#140b24] text-white rounded-[14px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                            <div className="space-y-2 text-center md:text-left relative z-10">
                                <div className="flex items-center justify-center md:justify-start gap-2.5">
                                    <div className="p-1.5 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg shadow-md">
                                        <Crown className="w-5 h-5 text-white fill-current" />
                                    </div>
                                    <h3 className="text-xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
                                        PRO LIFETIME MEMBER
                                    </h3>
                                </div>
                                <p className="text-xs text-purple-200/70 max-w-md leading-relaxed font-medium">
                                    Welcome to the elite club! Enjoy full unrestricted access to premium AI pipelines, custom metadata tags, and early feature rollouts.
                                </p>
                            </div>

                            <div className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-neutral-900 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_4px_15px_rgba(245,158,11,0.4)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.6)] transition-all duration-300 shrink-0 relative z-10 select-none border border-amber-300/40">
                                <Sparkles className="w-4 h-4 fill-current animate-spin-slow" />
                                <span>PRO ACTIVE</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}