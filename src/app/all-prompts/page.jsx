import { allPrompts } from '@/lib/api/user/data'
import React, { Suspense } from 'react'
import FilterPanel from '@/components/FilterPanel';
import PromptsCard from '@/components/Dashboard/PromptsCard';

const AllPromptsPage = async () => {
    const promptData = await allPrompts() || [];
    // console.log(promptData)

    return (
        <div className="min-h-screen bg-[#ebdcc9] text-[#2c221e] antialiased mb-10">
            <div className="py-16 px-6 max-w-7xl mx-auto w-full space-y-12 ">

                {/* HEADER */}
                <div className="text-center md:text-left space-y-3 border-b border-[#dfcbaf] pb-8">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#2c221e]">
                        Browse Premium Prompts
                    </h1>
                    <p className="text-[#2c221e]/70 text-sm max-w-xl font-medium">
                        Search, filter, and discover state-of-the-art prompt engineering templates.
                    </p>
                </div>

                {/* Interactive client-side filters wrapped in Suspense */}
                <Suspense fallback={<div className="h-28 w-full bg-[#dfcbaf]/20 border border-[#dfcbaf] animate-pulse rounded-3xl" />}>
                    <FilterPanel />
                </Suspense>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                    {promptData.map((cardData, index) => {
                        const ratingValue = typeof cardData.rating === "number" ? cardData.rating : 0;

                        return (
                            <PromptsCard key={cardData._id || index} cardData={cardData} ratingValue={ratingValue}/>
                        );
                    })}
                </div>
                {promptData.length === 0 && (
                    <div className="text-center py-16 border border-[#dfcbaf] rounded-3xl bg-white/20">
                        <p className="text-[#2c221e]/50 font-bold">No premium prompts found at this moment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllPromptsPage;