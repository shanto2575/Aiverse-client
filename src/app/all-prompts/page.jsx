import { allPrompts } from "@/lib/api/user/data";
import React, { Suspense } from "react";
import FilterPanel from "@/components/FilterPanel";
import PromptsCard from "@/components/Dashboard/PromptsCard";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const AllPromptsPage = async ({ searchParams }) => {
    const sParam = await searchParams;

    const search = sParam.search || "";
    const aiEngine = sParam.aiEngine || "";
    const difficulty = sParam.difficulty || "";
    const category = sParam.category || "";
    const page = Number(sParam.page) || 1;

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (aiEngine) params.set("aiEngine", aiEngine);
    if (category) params.set("category", category);
    if (difficulty) params.set("difficulty", difficulty);

    params.set("page", page);
    params.set("limit", 6);

    const promptData = await allPrompts(params);

    return (
        <div className="min-h-screen bg-[#ebdcc9] text-[#2c221e] antialiased mb-10">
            <div className="py-5 px-6 max-w-7xl mx-auto w-full space-y-12">

                {/* HEADER */}
                <div className="text-center md:text-left space-y-3 border-b border-[#dfcbaf] pb-3">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#2c221e]">
                        Browse Premium Prompts
                    </h1>
                    <p className="text-[#2c221e]/70 text-sm max-w-xl font-medium">
                        Search, filter, and discover state-of-the-art prompt engineering templates.
                    </p>
                </div>

                <Suspense
                    fallback={
                        <div className="h-20 w-full bg-[#dfcbaf]/20 border border-[#dfcbaf] animate-pulse rounded-3xl" />
                    }
                >
                    <FilterPanel />
                </Suspense>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promptData.prompts.map((cardData, index) => {
                        const ratingValue =
                            typeof cardData.rating === "number"
                                ? cardData.rating
                                : 0;

                        return (
                            <PromptsCard
                                key={cardData._id || index}
                                cardData={cardData}
                                ratingValue={ratingValue}
                            />
                        );
                    })}
                </div>

                {/* Empty */}
                {promptData.prompts.length === 0 && (
                    <div className="text-center py-16 border border-[#dfcbaf] rounded-3xl bg-white/20">
                        <p className="text-[#2c221e]/50 font-bold">
                            No premium prompts found at this moment.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {promptData.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 pt-6">

                        {/* Prev Button */}
                        {page > 1 && (() => {
                            const prevParams = new URLSearchParams(params);
                            prevParams.set("page", page - 1);

                            return (
                                <Link
                                    href={`/all-prompts?${prevParams.toString()}`}
                                    className="px-4 py-2 rounded-xl border font-bold bg-white/30 text-[#2c221e] border-[#dfcbaf] hover:bg-[#dfcbaf]/40 flex gap-2"
                                >
                                    <ArrowLeft />Prev
                                </Link>
                            );
                        })()}
                        {Array.from(
                            { length: promptData.totalPages },
                            (_, i) => i + 1
                        ).map((p) => {
                            const newParams = new URLSearchParams(params);
                            newParams.set("page", p);

                            return (
                                <Link
                                    key={p}
                                    href={`/all-prompts?${newParams.toString()}`}
                                    className={`px-4 py-2 rounded-xl border font-bold transition ${page === p
                                            ? "bg-[#2c221e] text-white border-[#2c221e]"
                                            : "bg-white/30 text-[#2c221e] border-[#dfcbaf] hover:bg-[#dfcbaf]/40"
                                        }`}
                                >
                                    {p}
                                </Link>
                            );
                        })}
                        {page < promptData.totalPages && (() => {
                            const nextParams = new URLSearchParams(params);
                            nextParams.set("page", page + 1);

                            return (
                                <Link
                                    href={`/all-prompts?${nextParams.toString()}`}
                                    className="px-4 py-2 rounded-xl border font-bold bg-white/30 text-[#2c221e] border-[#dfcbaf] hover:bg-[#dfcbaf]/40 flex gap-2"
                                >
                                    Next <ArrowRight />
                                </Link>
                            );
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllPromptsPage;