"use client";

import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';

export default function CommunityReviews() {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoverRating, setHoverRating] = useState(0);

    const [hasReviewed, setHasReviewed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newReview = {
            id: Date.now(),
            user: "Prompt Engineer",
            email: "shanto@diu.edu.bd", 
            rating: rating,
            comment: comment,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            })
        };

        setReviews([newReview, ...reviews]);
        setComment("");
        setHasReviewed(true); 
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-[#2c221e] pt-6 border-t border-[#dfcbaf]">

            {/* ডাইনামিক হেডার কাউন্টার */}
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Community Reviews ({reviews.length})
            </h2>

            {/* মেইন ২-কলাম গ্রিড লেআউট */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* বামপাশ: সাবমিশন বক্স (১ কলাম) */}
                <div className="lg:col-span-1 bg-white/50 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-[#dfcbaf] shadow-sm">
                    <h3 className="text-base font-black uppercase tracking-wider mb-5">
                        Submit a Review
                    </h3>

                    {!hasReviewed ? (
                        /* === BEFORE STATE: রিভিউ ফর্ম === */
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* স্টার সিলেকশন */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-0.5">
                                    Rating
                                </label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="transition-transform active:scale-90"
                                        >
                                            <Star
                                                className={`w-5 h-5 transition-colors duration-150 ${star <= (hoverRating || rating)
                                                        ? "text-amber-600 fill-amber-600"
                                                        : "text-[#2c221e]/20"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* কমেন্ট বক্স */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-0.5">
                                    Comment
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your review here. What worked? How did you test it?"
                                    rows={4}
                                    required
                                    className="w-full bg-white/80 border border-[#dfcbaf] focus:border-[#2c221e] rounded-xl p-3.5 text-xs sm:text-sm font-medium outline-none resize-none transition-all placeholder-[#2c221e]/40 text-[#2c221e]"
                                />
                            </div>

                            {/* সাবমিট বাটন */}
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-colors duration-300"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>Submit Review</span>
                            </button>
                        </form>
                    ) : (
                        /* === AFTER STATE: থ্যাংক ইউ বক্স === */
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3 transition-all duration-500 animate-fadeIn">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm font-semibold text-emerald-800 leading-relaxed">
                                You have already reviewed this prompt template. Thank you for your feedback!
                            </p>
                        </div>
                    )}
                </div>

                {/* ডানপাশ: রিভিউ লিস্ট ডিসপ্লে (২ কলাম) */}
                <div className="lg:col-span-2 space-y-4 w-full">
                    {reviews.length === 0 ? (
                        /* নো রিভিউ এম্পটি স্টেট (Before) */
                        <div className="bg-white/30 rounded-3xl p-8 border border-[#dfcbaf] border-dashed flex flex-col items-center justify-center text-center py-12 space-y-2">
                            <MessageSquare className="w-8 h-8 text-[#2c221e]/30" />
                            <p className="text-xs sm:text-sm font-bold text-[#2c221e]/60">
                                No reviews submitted yet. Be the first to share your thoughts!
                            </p>
                        </div>
                    ) : (
                        /* রিভিউ লিস্ট (After) */
                        reviews.map((rev) => (
                            <div
                                key={rev.id}
                                className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-[#dfcbaf] space-y-3 shadow-sm animate-slideDown"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#2c221e] text-[#ebdcc9] flex items-center justify-center font-bold text-xs border border-[#dfcbaf]">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-black text-[#2c221e]">
                                                {rev.email.split('@')[0]}
                                            </h4>
                                            <span className="text-[10px] font-bold text-[#2c221e]/40">
                                                📅 {rev.date}
                                            </span>
                                        </div>
                                    </div>

                                    {/* রিভিউর নিজস্ব স্টার রেটিং */}
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-3.5 h-3.5 ${star <= rev.rating
                                                        ? "text-amber-600 fill-amber-600"
                                                        : "text-[#2c221e]/20"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm font-medium text-[#2c221e]/80 italic leading-relaxed pl-1">
                                    "{rev.comment}"
                                </p>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}