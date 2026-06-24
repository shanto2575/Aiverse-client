import { FeaturedSections } from "@/lib/action/data";
import PromptsCard from "@/components/Dashboard/PromptsCard";
import Link from "next/link";
import { Eye } from "lucide-react";

const FeaturedSection = async () => {
    const featured = await FeaturedSections();

    if (!featured?.length) {
        return (
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="rounded-3xl border border-[#dfcbaf] bg-white/20 p-12 text-center">
                        <h3 className="text-2xl font-black text-[#2c221e]">
                            No Featured Prompts Available
                        </h3>
                        <p className="mt-2 text-[#2c221e]/60">
                            Featured prompts will appear here once approved.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <span className="inline-block px-4 py-1 rounded-full bg-[#2c221e]/10 text-[#2c221e] text-xs font-bold uppercase tracking-[0.2em]">
                            Featured Collection
                        </span>

                        <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#2c221e]">
                            Featured Prompt Templates
                        </h2>
                    </div>

                    <Link href="/all-prompts">
                        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2c221e] text-[#ebdcc9] font-bold text-sm hover:bg-[#4a3b35] transition-all duration-300 shadow-sm">
                            View All
                            <Eye size={16} />
                        </button>
                    </Link>

                </div>
                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((item) => (
                        <PromptsCard
                            key={item._id}
                            cardData={item}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;