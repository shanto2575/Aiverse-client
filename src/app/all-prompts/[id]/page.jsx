
import { baseUrl } from "@/lib/baseUrl";
import { Flag, Star, User } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CommunityReviews from "@/components/CommunityReviews";
import BookmarkButton from "@/components/Dashboard/user/bookmarks/BookmarkButton";
import { getUser } from "@/lib/session";
import ReportSection from "@/components/Dashboard/user/reports/ReportSection";
import BackButton from "@/components/BackButton";

const fetchPrompt = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/api/single-prompts/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return null;
    }
};

const PromptsDetailsPage = async ({ params }) => {
    const { id } = await params;

    const prompt = await fetchPrompt(id);
    const user = await getUser();
    // console.log(prompt)

    if (!prompt) {
        return (
            <div className="min-h-screen bg-[#ebdcc9] flex items-center justify-center text-[#2c221e] font-bold">
                Prompt not found or failed to load.
            </div>
        );
    }

    const userPlan = user?.plan || "free";
    const visibility = prompt?.visibility;
    const isPremiumLocked =
        userPlan === "free" &&
        (visibility === "premium" || visibility === "private");



    return (
        <div className="min-h-screen bg-[#ebdcc9] text-[#2c221e] antialiased py-12 px-4 sm:px-6 lg:px-8">
            <BackButton />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                {/* Left Side */}
                <div className="lg:col-span-2 bg-white/50 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#dfcbaf] space-y-8 shadow-[0_8px_30px_rgba(44,34,30,0.02)]">

                    {/* Title & Actions */}
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                                {prompt.title}
                            </h1>

                            <div className="flex gap-2 shrink-0">
                                <BookmarkButton
                                    promptId={prompt._id.toString()}
                                    userEmail={user?.email}
                                    prompt={prompt}
                                />

                                <ReportSection
                                    promptId={prompt._id.toString()}
                                    userEmail={user?.email}
                                />
                            </div>
                        </div>

                        <p className="text-sm font-semibold text-[#2c221e]/70 leading-relaxed max-w-3xl">
                            {prompt.shortDescription ||
                                "Analyzes target templates by evaluating prompt fields and performance dimensions."}
                        </p>
                    </div>

                    {/* Prompt Template */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-black uppercase tracking-wider text-[#2c221e]/80">
                                Prompt Template
                            </h2>

                            {!isPremiumLocked ? (
                                <CopyButton
                                    textToCopy={prompt.description}
                                    promptId={prompt._id.toString()}
                                />
                            ) : (
                                <button className="px-4 py-2 rounded-xl bg-[#2c221e] text-[#ebdcc9] text-xs font-bold">
                                    Upgrade Premium
                                </button>
                            )}
                        </div>

                        <div className="bg-[#2c221e] text-[#ebdcc9] rounded-2xl p-6 sm:p-8 border border-[#dfcbaf]/20 shadow-[inner_0_2px_8px_rgba(0,0,0,0.2)] min-h-[220px] flex items-center justify-center">
                            {isPremiumLocked ? (
                                <div className="text-center space-y-6 max-w-lg">
                                    <div className="space-y-3">
                                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                                            Premium Prompt Content Locked
                                        </h2>

                                        <p className="text-sm sm:text-base text-[#ebdcc9]/70 leading-relaxed">
                                            Unlock access to this prompt, review options, and duplicate
                                            copies for a one-time upgrade.
                                        </p>
                                    </div>

                                    <form action={'/api/checkout_sessions'} method='POST'>
                                        <button
                                            type="submit"
                                            className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-bold text-sm sm:text-base hover:scale-105 transition-transform">
                                            Subscribe to Premium ($5)
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap w-full">
                                    {prompt.description}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Usage Instructions */}
                    <div className="space-y-3 pt-2">
                        <h2 className="text-sm font-black uppercase tracking-wider text-[#2c221e]/80">
                            Usage Instructions
                        </h2>

                        <p className="text-xs sm:text-sm font-medium text-[#2c221e]/70 leading-relaxed">
                            {prompt.instructions ||
                                "For best results, configure your parameters on your AI engine with stable settings. Replace bracketed placeholders inside the template with your target details."}
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="space-y-6">

                    {/* Prompt Details */}
                    <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-[#dfcbaf] space-y-6 shadow-[0_8px_30px_rgba(44,34,30,0.02)]">
                        <h2 className="text-base font-black uppercase tracking-wider pb-3 border-b border-[#dfcbaf]">
                            Prompt Details
                        </h2>

                        <div className="space-y-4 text-xs font-bold">

                            {/* AI Engine */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">
                                    AI Engine
                                </span>

                                <span className="bg-[#2c221e] text-[#ebdcc9] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {prompt.aiEngine || "ChatGPT"}
                                </span>
                            </div>

                            {/* Category */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">
                                    Category
                                </span>

                                <span className="border border-[#2c221e] text-[#2c221e] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {prompt.category || "General"}
                                </span>
                            </div>

                            {/* Difficulty */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">
                                    Difficulty
                                </span>

                                <span className="bg-[#2c221e]/10 text-[#2c221e] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {prompt.difficulty || "Intermediate"}
                                </span>
                            </div>

                            {/* Visibility */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">
                                    Visibility
                                </span>

                                <span className="text-[#2c221e] uppercase tracking-wider">
                                    {prompt.visibility || "PUBLIC"}
                                </span>
                            </div>

                            <hr className="border-[#dfcbaf] my-2" />

                            {/* Copies */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">
                                    Copies Made
                                </span>

                                <span className="text-base font-black">
                                    {prompt.copies || 0}
                                </span>
                            </div>

                            {/* Bookmarks */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">
                                    Bookmarks
                                </span>

                                <span className="text-base font-black">{prompt.bookmarkCount}</span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#2c221e]/60 uppercase tracking-wider">
                                    Community Rating
                                </span>

                                <div className="flex items-center gap-1 text-amber-700 font-black text-sm">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>
                                        {(prompt.averageRating || 0).toFixed(1)} (
                                        {prompt.totalReviews || 0})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Creator Info */}
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
                                    {prompt.userEmail
                                        ? prompt.userEmail.split("@")[0]
                                        : "Prompt Engineer"}
                                </h4>

                                <p className="text-[11px] font-semibold text-[#2c221e]/50 truncate">
                                    {prompt.userEmail || "creator@aiverse.com"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <CommunityReviews
                promptId={prompt._id.toString()}
                userEmail={user?.email}
                visibility={visibility}
                userPlan={userPlan}
                promptTitle={prompt.title}
                promptaiEngine={prompt.aiEngine}
            />
        </div>
    );
};

export default PromptsDetailsPage;