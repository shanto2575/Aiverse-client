import Image from "next/image";
import { Award } from "lucide-react";
import { getTopCreators } from "@/lib/action/data";

const TopPromptCreators = async () => {
    const creators = await getTopCreators();
    // console.log(creators)

    return (
        <section className="py-16 md:py-24 bg-[#ebdcc9]">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <p className="uppercase tracking-[0.25em] text-[#78541c] font-bold text-xs md:text-sm">
                        Showcase
                    </p>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2c221e] mt-4">
                        Top Prompt Creators
                    </h2>

                    <p className="text-[#2c221e]/70 mt-4 max-w-2xl mx-auto font-medium text-sm md:text-base">
                        Engage with community leaders pioneering advanced
                        prompt structures.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    {creators.map((creator) => (
                        <div
                            key={creator._id}
                            className="
                                bg-[#f5ebd7]/60
                                border border-[#dfcbaf]
                                rounded-[28px]
                                p-6 md:p-10
                                text-center
                                backdrop-blur-sm
                                shadow-md
                                hover:-translate-y-2
                                hover:border-[#78541c]/40
                                hover:shadow-[0_10px_40px_rgba(120,84,28,0.12)]
                                transition-all
                                duration-300
                            "
                        >
                            {/* Avatar */}
                            <div className="relative w-fit mx-auto">
                                <Image
                                    src={
                                        creator.image ||
                                        "https://i.ibb.co/4fL6K8x/avatar.png"
                                    }
                                    alt={creator.name}
                                    width={80}
                                    height={80}
                                    className="
                                        w-20
                                        h-20
                                        rounded-full
                                        object-cover
                                        border-2
                                        border-[#78541c]
                                    "
                                />

                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        right-0
                                        w-7
                                        h-7
                                        rounded-full
                                        bg-[#78541c]
                                        flex
                                        items-center
                                        justify-center
                                        border-2
                                        border-[#f5ebd7]
                                    "
                                >
                                    <Award
                                        size={14}
                                        className="text-[#ebdcc9]"
                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <h3 className="mt-6 text-xl md:text-2xl font-bold text-[#2c221e]">
                                {creator.name}
                            </h3>

                            {/* Role */}
                            <p className="text-[#2c221e]/60 mt-1 md:mt-2 text-sm capitalize font-medium">
                                {creator.role}
                            </p>

                            {/* Divider */}
                            <div className="my-6 md:my-8 border-t border-[#dfcbaf]" />

                            {/* Stats */}
                            <div className="flex justify-center gap-12 md:gap-16">

                                <div>
                                    <h4 className="text-2xl md:text-3xl font-bold text-[#2c221e]">
                                        {creator.totalPrompts}
                                    </h4>

                                    <p className="text-[10px] md:text-xs tracking-[0.2em] text-[#2c221e]/50 mt-1 font-bold">
                                        PROMPTS
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-2xl md:text-3xl font-bold text-[#2c221e]">
                                        {creator.totalCopies}
                                    </h4>

                                    <p className="text-[10px] md:text-xs tracking-[0.2em] text-[#2c221e]/50 mt-1 font-bold">
                                        COPIES
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default TopPromptCreators;