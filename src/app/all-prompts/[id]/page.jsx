import { baseUrl } from '@/lib/baseUrl';
import React from 'react'
import {
    Sparkles,
    Bookmark,
    Flag,
    Layers,
    BarChart,
    Eye,
    Copy,
    Star,
    User
} from "lucide-react";
import CopyButton from '@/components/CopyButton';
import CommunityReviews from '@/components/CommunityReviews';
import BookmarkButton from '@/components/Dashboard/user/bookmarks/BookmarkButton';
import { getUser } from '@/lib/session';


const fetchPrompt = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/api/single-prompts/${id}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return null;
    }
}



const PromptsDetailsPage = async ({ params }) => {
    const { id } = await params;
    const prompt = await fetchPrompt(id);
    const user = await getUser()
    // console.log(prompt)

    if (!prompt) {
        return (
            <div className="min-h-screen bg-[#ebdcc9] flex items-center justify-center text-[#2c221e] font-bold">
                Prompt not found or failed to load.
            </div>
        );
    }

    const ratingValue = typeof prompt.rating === "number" ? prompt.rating : 5;

    return (
        <div className="min-h-screen bg-[#ebdcc9] text-[#2c221e] antialiased py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                <div className="lg:col-span-2 bg-white/50 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#dfcbaf] space-y-8 shadow-[0_8px_30px_rgba(44,34,30,0.02)]">

                    {/* ১. Title & Actions Row */}
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                                {prompt.title}
                            </h1>
                            <div className="flex gap-2 shrink-0">
                                {/* <button className="p-2.5 rounded-xl border border-[#dfcbaf] hover:bg-[#2c221e]/5 text-[#2c221e] transition-colors bg-white/40">
                                    <Bookmark className="w-4 h-4" />
                                </button> */}
                                <BookmarkButton
                                    promptId={prompt._id.toString()}
                                    userEmail={user?.email}
                                    prompt={prompt}
                                />
                                <button className="p-2.5 rounded-xl border border-[#dfcbaf] hover:bg-[#2c221e]/5 text-[#2c221e] transition-colors bg-white/40">
                                    <Flag className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-[#2c221e]/70 leading-relaxed max-w-3xl">
                            {prompt.shortDescription || "Analyzes target templates by evaluating prompt fields and performance dimensions."}
                        </p>
                    </div>

                    {/* ২. Prompt Template Box */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-black uppercase tracking-wider text-[#2c221e]/80">Prompt Template</h2>
                            <CopyButton textToCopy={prompt.description} />
                        </div>

                        <div className="bg-[#2c221e] text-[#ebdcc9] rounded-2xl p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed border border-[#dfcbaf]/20 shadow-[inner_0_2px_8px_rgba(0,0,0,0.2)] whitespace-pre-wrap">
                            {prompt.description}
                        </div>
                    </div>

                    {/* ৩. Usage Instructions */}
                    <div className="space-y-3 pt-2">
                        <h2 className="text-sm font-black uppercase tracking-wider text-[#2c221e]/80">Usage Instructions</h2>
                        <p className="text-xs sm:text-sm font-medium text-[#2c221e]/70 leading-relaxed">
                            {prompt.instructions || "For best results, configure your parameters on your AI engine with stable settings. Replace bracketed placeholders inside the template with your target details."}
                        </p>
                    </div>

                </div>
                <div className="space-y-6">

                    {/* Prompt Details Block */}
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-[#dfcbaf] space-y-6 shadow-[0_8px_30px_rgba(44,34,30,0.02)]">
                        <h2 className="text-base font-black uppercase tracking-wider pb-3 border-b border-[#dfcbaf]">
                            Prompt Details
                        </h2>

                        <div className="space-y-4 text-xs font-bold">
                            {/* AI Engine */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">AI Engine</span>
                                <span className="bg-[#2c221e] text-[#ebdcc9] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {prompt.aiEngine || "ChatGPT"}
                                </span>
                            </div>

                            {/* Category */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">Category</span>
                                <span className="border border-[#2c221e] text-[#2c221e] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {prompt.category || "General"}
                                </span>
                            </div>

                            {/* Difficulty */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">Difficulty</span>
                                <span className="bg-[#2c221e]/10 text-[#2c221e] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {prompt.difficulty || "Intermediate"}
                                </span>
                            </div>

                            {/* Visibility */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">Visibility</span>
                                <span className="text-[#2c221e] uppercase tracking-wider">{prompt.visibility || "PUBLIC"}</span>
                            </div>

                            <hr className="border-[#dfcbaf] my-2" />

                            {/* Copies Made */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">Copies Made</span>
                                <span className="text-base font-black">{prompt.copies || 0}</span>
                            </div>

                            {/* Bookmarks */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">Bookmarks</span>
                                <span className="text-base font-black">0</span>
                            </div>

                            {/* Community Rating */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">Community Rating</span>
                                <div className="flex items-center gap-1 text-amber-700 font-black text-sm">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{ratingValue.toFixed(1)} (1)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Creator Information Block */}
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-[#dfcbaf] space-y-4 shadow-[0_8px_30px_rgba(44,34,30,0.02)]">
                        <h2 className="text-xs font-black uppercase tracking-widest text-[#2c221e]/60">
                            Creator Information
                        </h2>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#2c221e] text-[#ebdcc9] flex items-center justify-center border border-[#dfcbaf] shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                                <h4 className="text-sm font-black truncate">
                                    {prompt.userEmail ? prompt.userEmail.split('@')[0] : "Prompt Engineer"}
                                </h4>
                                <p className="text-[11px] font-semibold text-[#2c221e]/50 truncate">
                                    {prompt.userEmail || "creator@aiverse.com"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <CommunityReviews />
            </div>
        </div>
    )
}

export default PromptsDetailsPage;