"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { FaSlidersH, FaHistory } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

const AI_ENGINES = ["ChatGPT", "Claude", "Midjourney", "Stable Diffusion", "Gemini"];
const CATEGORIES = ["Design", "Development", "Writing", "Marketing", "Photography", "Other"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced",];

export default function FilterPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [aiEngine, setAiEngine] = useState(searchParams.get("aiEngine") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "");

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        
        if (aiEngine) params.set("aiEngine", aiEngine);
        if (category) params.set("category", category);
        if (difficulty) params.set("difficulty", difficulty);

        router.push(`/prompts?${params.toString()}`);
    };

    const handleReset = () => {
        setAiEngine("");
        setCategory("");
        setDifficulty("");
        router.push('/prompts');
    };

    return (
        <Card className="relative overflow-hidden bg-white/40 border border-[#dfcbaf] backdrop-blur-md p-6 sm:p-8 shadow-[0_8px_30px_rgba(44,34,30,0.03)] rounded-3xl" radius="none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#dfcbaf]/20 via-[#ebdcc9]/10 to-transparent blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#dfcbaf]/10 via-[#2c221e]/5 to-transparent blur-3xl pointer-events-none -z-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-1 flex items-center gap-1.5">
                        <FaSlidersH className="w-3 h-3 text-[#2c221e]/40" />
                        <span>AI Engine</span>
                    </label>

                    <select
                        value={aiEngine}
                        onChange={(e) => setAiEngine(e.target.value)}
                        className="w-full bg-white/80 border border-[#dfcbaf] focus:border-[#2c221e] rounded-xl px-4 h-12 text-[#2c221e] text-xs font-bold outline-none cursor-pointer transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232c221e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_16px_center] bg-no-repeat"
                    >
                        <option value="" className="bg-[#ebdcc9] text-[#2c221e] font-semibold">All Engines</option>
                        {AI_ENGINES.map((engine) => (
                            <option key={engine} value={engine.toLowerCase()} className="bg-white text-[#2c221e] font-medium">
                                {engine}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ২. CATEGORY SELECT */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-1">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white/80 border border-[#dfcbaf] focus:border-[#2c221e] rounded-xl px-4 h-12 text-[#2c221e] text-xs font-bold outline-none cursor-pointer transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232c221e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_16px_center] bg-no-repeat"
                    >
                        <option value="" className="bg-[#ebdcc9] text-[#2c221e] font-semibold">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat.toLowerCase()} className="bg-white text-[#2c221e] font-medium">
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ৩. DIFFICULTY SELECT */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2c221e]/60 pl-1">
                        Difficulty
                    </label>

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full bg-white/80 border border-[#dfcbaf] focus:border-[#2c221e] rounded-xl px-4 h-12 text-[#2c221e] text-xs font-bold outline-none cursor-pointer transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232c221e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_16px_center] bg-no-repeat"
                    >
                        <option value="" className="bg-[#ebdcc9] text-[#2c221e] font-semibold">All Levels</option>
                        {DIFFICULTIES.map((diff) => (
                            <option key={diff} value={diff.toLowerCase()} className="bg-white text-[#2c221e] font-medium">
                                {diff}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3 w-full">
                    <Button
                        onClick={handleApplyFilters}
                        className="flex-grow bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] font-black uppercase tracking-wider text-xs h-12 rounded-xl shadow-sm transition-colors duration-300"
                    >
                        Filter Prompts
                    </Button>

                    <Button
                        variant="bordered"
                        onClick={handleReset}
                        className="border-[#dfcbaf] hover:border-[#2c221e] text-[#2c221e] hover:bg-[#2c221e]/5 h-12 px-4 rounded-xl min-w-0 transition-all duration-200"
                        title="Reset Filters"
                    >
                        <FaHistory className="w-3.5 h-3.5" />
                    </Button>
                </div>

            </div>
        </Card>
    );
}