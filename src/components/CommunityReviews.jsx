"use client";

import React, { useEffect, useState } from "react";
import { Star, Send, User, MessageSquare, Lock } from "lucide-react";
import { baseUrl } from "@/lib/baseUrl";
import showToast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CommunityReviews({ promptId, userEmail, userPlan, visibility, promptaiEngine, promptTitle }) {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hasReviewed, setHasReviewed] = useState(false);

    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const fetchReviews = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${baseUrl}/api/reviews/${promptId}`
            );

            const data = await res.json();

            setReviews(data.reviews || []);
            setTotalReviews(data.totalReviews || 0);
            setAverageRating(data.averageRating || 0);

            const mine = data.reviews?.find(
                (r) => r.userEmail === userEmail
            );

            setHasReviewed(!!mine);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (promptId) fetchReviews();
    }, [promptId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitting) return;

        if (!comment.trim()) {
            showToast.error("Comment required");
            return;
        }

        try {
            setSubmitting(true);

            const res = await fetch(`${baseUrl}/api/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    promptId,
                    userEmail,
                    rating,
                    comment,
                    promptTitle,
                    promptaiEngine,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                showToast.error(
                    data.message || "Something went wrong"
                );
                return;
            }

            setReviews((prev) => {
                const filtered = prev.filter(
                    (r) =>
                        r.userEmail !== data.review.userEmail
                );

                return [data.review, ...filtered];
            });

            setTotalReviews(data.totalReviews);
            setAverageRating(data.averageRating);

            setHasReviewed(true);
            setComment("");
            setRating(5);

            showToast.success("Review published!");

            router.refresh();

        } catch (err) {
            console.log(err);
            showToast.error("Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    const visibilityValue = (visibility || "").toLowerCase();

    const isPublic = visibilityValue === "public" || visibilityValue === "free";
    const isPrivate = visibilityValue === "private";

    const canReview =
        !!userEmail &&
        (
            isPublic ||
            (isPrivate && userPlan === "pro")
        );

    return (
        <div className="max-w-7xl mx-auto space-y-8 p-2 text-[#2c221e]">

            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#2c221e]/20 pb-5">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-2 text-[#2c221e]">
                        <MessageSquare size={24} className="fill-[#2c221e]/10 text-[#2c221e]" />
                        <span>Community Reviews ({totalReviews})</span>
                    </h2>
                    <p className="text-xs text-[#2c221e]/70 font-semibold tracking-wide uppercase">User feedback loop</p>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#2c221e] text-[#ebdcc9] px-5 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(44,34,30,0.25)] self-start sm:self-auto border border-[#dfcbaf]/30">
                    <span className="text-base font-black tracking-wider text-amber-400">⭐ {Number(averageRating || 0).toFixed(1)}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#ebdcc9]/70 border-l border-[#ebdcc9]/30 pl-2 font-bold">Average</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <div className="bg-[#2c221e] border-2 border-[#4a3b35] p-6 rounded-2xl shadow-[0_10px_30px_rgba(44,34,30,0.15)] text-[#ebdcc9] lg:sticky lg:top-24">
                    {!canReview ? (
                        <div className="text-center py-8 space-y-4 bg-[#4a3b35]/30 rounded-xl p-4 border border-[#ebdcc9]/10">
                            <div className="w-12 h-12 bg-amber-400 text-[#2c221e] flex items-center justify-center rounded-xl mx-auto shadow-md">
                                <Lock size={20} className="animate-pulse" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-[#ebdcc9] uppercase tracking-wider">Premium Feature</h4>
                                <p className="text-xs text-[#ebdcc9]/60 font-medium">
                                    Only **Pro Plan** users can leave a review on this ecosystem.
                                </p>
                            </div>
                        </div>
                    ) : !hasReviewed ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <h3 className="text-base font-black uppercase tracking-wider text-[#ebdcc9]">Add Your Voice</h3>
                                <p className="text-xs text-[#ebdcc9]/60">Share your technical review</p>
                            </div>

                            <div className="flex gap-2 bg-[#4a3b35]/40 border border-[#ebdcc9]/10 p-3 rounded-xl justify-center shadow-inner">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="transition-all duration-150 hover:scale-120 active:scale-95 p-1 cursor-pointer"
                                    >
                                        <Star
                                            className={`w-6 h-6 transition-all ${star <= rating
                                                ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                                : "text-[#ebdcc9]/30"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full min-h-[120px] border border-[#ebdcc9]/20 focus:border-[#ebdcc9] bg-[#ebdcc9] text-[#2c221e] p-3.5 rounded-xl text-sm outline-none transition-all duration-200 resize-none font-medium placeholder-[#2c221e]/50 shadow-md"
                                placeholder="What's your breakdown or feedback on this..."
                            />

                            <button
                                disabled={submitting}
                                className="bg-[#ebdcc9] hover:bg-white text-[#2c221e] font-black px-4 py-3.5 rounded-xl w-full flex gap-2 justify-center items-center text-sm uppercase tracking-widest shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer group"
                            >
                                <Send className="w-4 h-4 text-[#2c221e] group-hover:translate-x-0.5 transition-transform" />
                                <span>{submitting ? "Publishing..." : "Publish Review"}</span>
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-8 space-y-3 bg-[#4a3b35]/20 rounded-xl p-4 border border-[#ebdcc9]/10">
                            <div className="w-12 h-12 bg-amber-400 text-[#2c221e] flex items-center justify-center rounded-xl mx-auto font-black text-xl shadow-md">✓</div>
                            <h4 className="text-sm font-black text-[#ebdcc9]">Review Submitted</h4>
                            <p className="text-xs text-[#ebdcc9]/60 font-medium">
                                Thank you for your ecosystem contribution!
                            </p>
                        </div>
                    )}
                </div>

                {/* REVIEWS LIST */}
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="border-2 border-[#dfcbaf] bg-white p-5 rounded-2xl animate-pulse h-24" />
                            ))}
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-16 border-2 border-dashed border-[#dfcbaf] rounded-2xl bg-white/50 backdrop-blur-sm">
                            <p className="text-sm font-black text-[#2c221e]/40 uppercase tracking-widest">No review entries found</p>
                            <p className="text-xs text-[#2c221e]/40 mt-1">Be the first investigator to review!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {reviews.map((r) => (
                                <div
                                    key={r._id}
                                    className="border-2 border-[#dfcbaf]/80 hover:border-[#2c221e] bg-white hover:bg-[#ebdcc9]/10 p-5 rounded-2xl transition-all duration-300 flex gap-4 items-start shadow-[0_4px_20px_rgba(44,34,30,0.02)] hover:shadow-[0_10px_25px_rgba(44,34,30,0.06)] group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#2c221e] text-[#ebdcc9] flex items-center justify-center font-bold shadow-md shrink-0 border border-[#dfcbaf]/50">
                                        <User size={18} />
                                    </div>

                                    <div className="flex-1 space-y-2 min-w-0">
                                        <div className="flex items-center justify-between gap-4 border-b border-[#dfcbaf]/50 pb-1.5">
                                            <b className="text-sm text-[#2c221e] capitalize font-black truncate tracking-tight">
                                                {r.userEmail ? r.userEmail.split("@")[0] : "Explorer"}
                                            </b>

                                            <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#2c221e] text-amber-400 flex items-center gap-1 shadow-sm shrink-0 border border-[#dfcbaf]/20">
                                                {r.rating} <Star size={12} className="fill-amber-400 text-amber-400" />
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#2c221e]/90 leading-relaxed pt-1 font-semibold tracking-wide break-words">
                                            {r.comment}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}