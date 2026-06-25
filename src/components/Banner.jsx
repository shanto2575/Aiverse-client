"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search, Sparkles, Terminal, TerminalIcon } from "lucide-react";
import { HiTrendingUp } from "react-icons/hi";

export default function Banner() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const trendingTags = [
        "ChatGPT",
        "Midjourney v6",
        "Claude 3.5 Sonnet",
        "SaaS Copywriting",
        "Automation",
        "Logo Design",
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/all-prompts?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleTagClick = (tag) => {
        router.push(`/all-prompts?search=${encodeURIComponent(tag)}`);
    };

    return (
        <div className="w-full min-h-[75vh] flex flex-col items-center justify-center text-center py-12 px-4 relative overflow-hidden">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 bg-[#2c221e]/5 border border-[#dfcbaf] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-[#2c221e] mb-6"
            >
                <Sparkles className="w-3.5 h-3.5 text-[#2c221e]" />
                <span>The Ultimate Community Ecosystem for Prompts</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-black text-[#2c221e] tracking-tight max-w-4xl leading-[1.1] mb-6"
            >
                Engineered Prompts. <br />
                <span className="opacity-80">Infinite Productivity.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-xl text-[#2c221e]/80 max-w-2xl font-medium mb-10 leading-relaxed"
            >
                Discover, customize, and monetize premium AI prompts curated for major LLMs and creative pipelines. Built for creators, builders, and developers.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full max-w-2xl mb-6"
            >
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search by title, tags, or AI tool (e.g., Midjourney)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#ebdcc9] border-2 border-[#dfcbaf] text-[#2c221e] placeholder-[#2c221e]/40 rounded-full pl-6 pr-32 py-4 text-sm sm:text-base font-medium outline-none focus:border-[#2c221e] transition-all shadow-md"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] px-6 rounded-full flex items-center gap-2 font-bold text-sm transition-all"
                    >
                        <Search className="w-4 h-4" />
                        <span className="hidden xs:inline">Search</span>
                    </button>
                </form>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mb-10"
            >
                <span className="text-xs font-bold uppercase tracking-wider text-[#2c221e]/60 flex items-center gap-1 mr-1">
                    <HiTrendingUp  className="w-3.5 h-3.5" /> Trending:
                </span>
                {trendingTags.map((tag, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleTagClick(tag)}
                        className=" bg-transparent hover:bg-[#2c221e] text-[#2c221e] hover:text-[#ebdcc9] border border-[#dfcbaf] hover:border-[#2c221e] px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                    >
                        {tag}
                    </button>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4"
            >
                <button
                    onClick={() => router.push("/all-prompts")}
                    className="w-full sm:w-auto bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] font-bold px-8 py-3.5 rounded-xl shadow-lg transform active:scale-[0.98] transition-all text-sm tracking-wide"
                >
                    Explore Marketplace
                </button>
                {/* <button
                    onClick={() => router.push("/dashboard")}
                    className="w-full sm:w-auto bg-transparent text-[#2c221e] hover:bg-[#2c221e]/5 border border-[#2c221e]/30 font-bold px-8 py-3.5 rounded-xl transform active:scale-[0.98] transition-all text-sm tracking-wide"
                >
                    Submit a Prompt
                </button> */}
            </motion.div>

        </div>
    );
}