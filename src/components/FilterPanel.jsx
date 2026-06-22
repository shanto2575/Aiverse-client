"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { FaSlidersH, FaHistory, FaSearch } from "react-icons/fa";
import { useRouter  } from "next/navigation";

const AI_ENGINES = ["ChatGPT", "Claude", "Midjourney", "Stable Diffusion", "Gemini"];
const CATEGORIES = ["Design", "Development", "Writing", "Marketing", "Photography", "Other"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

export default function FilterPanel() {
    const router = useRouter();
    // const searchParams = useSearchParams();

    const [search, setSearch] = useState("");
    // console.log(search)

    const [aiEngine, setAiEngine] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // console.log(search,aiEngine,category,difficulty)

    const handleApplyFilters = () => {
        const params = new URLSearchParams();

        if (search) params.set("search", search);

        if (aiEngine) params.set("aiEngine", aiEngine);
        if (category) params.set("category", category);
        if (difficulty) params.set("difficulty", difficulty);

        router.push(`/all-prompts?${params.toString()}`);
    };

    const handleReset = () => {
        setSearch("");
        setAiEngine("");
        setCategory("");
        setDifficulty("");
        router.push('/all-prompts');
    };

    return (
        <Card className="relative overflow-hidden bg-white/40 border border-[#dfcbaf] backdrop-blur-md  sm:p-8 shadow-[0_8px_30px_rgba(44,34,30,0.03)] rounded-3xl">

            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-64 h-52 bg-gradient-to-br from-[#dfcbaf]/20 via-[#ebdcc9]/10 to-transparent blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#dfcbaf]/10 via-[#2c221e]/5 to-transparent blur-3xl pointer-events-none -z-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">

                {/* 🔍 SEARCH INPUT (TOP) */}
                <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-4">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-1 flex items-center gap-1.5">
                        <FaSearch className="w-3 h-3" />
                        Search Prompts
                    </label>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search prompts..."
                        className="w-full bg-white/80 border border-[#dfcbaf] focus:border-[#2c221e] rounded-xl px-4 h-12 text-[#2c221e] text-sm font-medium outline-none"
                    />
                </div>

                {/* AI ENGINE */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-1 flex items-center gap-1.5">
                        <FaSlidersH className="w-3 h-3 text-[#2c221e]/40" />
                        AI Engine
                    </label>

                    <select
                        value={aiEngine}
                        onChange={(e) => setAiEngine(e.target.value)}
                        className="w-full bg-white/80 border border-[#dfcbaf] focus:border-[#2c221e] rounded-xl px-4 h-12 text-xs font-bold"
                    >
                        <option value="">All Engines</option>
                        {AI_ENGINES.map((engine) => (
                            <option key={engine} value={engine.toLowerCase()}>
                                {engine}
                            </option>
                        ))}
                    </select>
                </div>

                {/* CATEGORY */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-1">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white/80 border border-[#dfcbaf] focus:border-[#2c221e] rounded-xl px-4 h-12 text-xs font-bold"
                    >
                        <option value="">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat.toLowerCase()}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DIFFICULTY */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-1">
                        Difficulty
                    </label>

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full bg-white/80 border border-[#dfcbaf] focus:border-[#2c221e] rounded-xl px-4 h-12 text-xs font-bold"
                    >
                        <option value="">All Levels</option>
                        {DIFFICULTIES.map((diff) => (
                            <option key={diff} value={diff.toLowerCase()}>
                                {diff}
                            </option>
                        ))}
                    </select>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 w-full">
                    <Button
                        onClick={handleApplyFilters}
                        className="flex-grow bg-[#2c221e] text-[#ebdcc9] font-bold h-12 rounded-xl"
                    >
                        Filter
                    </Button>

                    <Button
                        variant="bordered"
                        onClick={handleReset}
                        className="h-12 px-4"
                    >
                        <FaHistory />
                    </Button>
                </div>

            </div>
        </Card>
    );
}