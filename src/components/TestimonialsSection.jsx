"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/action/data";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await getTestimonials();
                setTestimonials(data || []);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    if (loading) return null;

    if (!testimonials.length) {
        return (
            <section className="py-16 md:py-24 bg-[#ebdcc9]">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="rounded-3xl border border-[#dfcbaf] bg-[#f5ebd7]/40 p-10 md:p-16 text-center shadow-sm backdrop-blur-sm">
                        <h3 className="text-lg md:text-xl font-bold text-[#2c221e]">
                            No Testimonials Yet
                        </h3>
                        <p className="text-[#2c221e]/70 mt-2 text-xs md:text-sm">
                            Reviews will appear here once users submit feedback.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section className="py-16 md:py-24 bg-[#ebdcc9] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-14 text-center">
                {/* Header */}
                <p className="text-[#78541c] font-bold uppercase tracking-[0.25em] text-[11px] md:text-xs">
                    Testimonials
                </p>

                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-[#2c221e] mt-2 tracking-tight">
                    What Users Say
                </h2>

                <p className="text-[#2c221e]/70 mt-3 max-w-xl mx-auto font-medium text-xs md:text-sm leading-relaxed">
                    Trusted by creators, developers, marketers and designers worldwide.
                </p>
            </div>

            {/* Infinite Marquee Container */}
            <div className="w-full relative flex overflow-x-hidden py-4">
                {/* Side Fade Gradients */}
                <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#ebdcc9] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#ebdcc9] to-transparent z-10 pointer-events-none" />

                {/* Motion Loop Row */}
                <motion.div
                    className="flex gap-5 pr-5 shrink-0"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        ease: "linear",
                        duration: testimonials.length * 8, 
                        repeat: Infinity,
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {duplicatedTestimonials.map((item, index) => (
                        <div
                            key={`${item._id}-${index}`}
                            className="w-[290px] md:w-[330px] shrink-0 bg-[#f5ebd7]/40 border border-[#dfcbaf]/70 rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(44,34,30,0.03)] backdrop-blur-md transition-all duration-300 hover:border-[#78541c]/30 hover:shadow-[0_12px_24px_rgba(120,84,28,0.06)] hover:bg-[#f5ebd7]/70"
                        >
                            {/* Top row: Stars & Badge */}
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <div className="flex gap-0.5">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={13}
                                            className="fill-[#bfa054] text-[#bfa054]"
                                        />
                                    ))}
                                </div>
                                <span className="text-[9px] bg-[#78541c]/10 text-[#78541c] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                    {item.promptaiEngine}
                                </span>
                            </div>

                            {/* Content context */}
                            <div className="mb-4">
                                <h4 className="text-[#2c221e] font-bold text-xs md:text-sm line-clamp-1 mb-1.5 opacity-90">
                                    {item.promptTitle}
                                </h4>
                                <p className="text-[#2c221e]/80 italic leading-6 text-xs min-h-[72px] line-clamp-3 break-words">
                                    "{item.comment}"
                                </p>
                            </div>

                            {/* User details */}
                            <div className="border-t border-[#dfcbaf]/50 pt-3.5 flex items-center gap-3">
                                <div className="relative shrink-0 w-8 h-8 md:w-9 md:h-9">
                                    <Image
                                        src={item.userImage || "https://i.ibb.co/4fL6K8x/avatar.png"}
                                        alt={item.userName}
                                        fill
                                        className="rounded-full object-cover border border-[#dfcbaf]"
                                    />
                                </div>

                                <div className="overflow-hidden">
                                    <h5 className="font-bold text-[#2c221e] text-xs truncate leading-none">
                                        {item.userName}
                                    </h5>
                                    <p className="text-[#2c221e]/50 text-[10px] md:text-xs capitalize font-medium truncate mt-1">
                                        {item.userRole}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;