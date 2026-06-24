"use client";

import { motion } from "framer-motion";
import { Heart, ShieldCheck, Zap } from "lucide-react";

const benefits = [
    {
        icon: <Zap size={26} />,
        title: "Production Ready",
        description:
            "Every prompt is thoroughly checked, curated, and optimized to run flawlessly on target engines without tweaking.",
        iconClass:
            "text-[#78541c] bg-[#ebdcc9] border-[#dfcbaf]",
        glow: "bg-[#78541c]/10",
    },
    {
        icon: <ShieldCheck size={26} />,
        title: "Admin Moderation",
        description:
            "No spam or low-quality templates. Every prompt is manually reviewed to maintain exceptional standards.",
        iconClass:
            "text-[#344a32] bg-[#486346]/10 border-[#486346]/20",
        glow: "bg-[#344a32]/10",
    },
    {
        icon: <Heart size={26} />,
        title: "Premium Marketplace",
        description:
            "Support prompt engineers directly and unlock private expert templates with premium access.",
        iconClass:
            "text-[#823324] bg-[#a64b39]/10 border-[#a64b39]/20",
        glow: "bg-[#a64b39]/10",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.18,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 80,
        scale: 0.9,
        filter: "blur(10px)",
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const WhyChooseAiverse = () => {
    return (
        <section className="bg-[#ebdcc9] py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Header */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                        filter: "blur(8px)",
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="text-[#78541c] text-xs md:text-sm font-bold uppercase tracking-[0.25em]">
                        OUR BENEFITS
                    </span>

                    <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-black text-[#2c221e]">
                        Why Choose Aiverse?
                    </h2>

                    <p className="mt-4 md:mt-5 text-[#2c221e]/70 text-base md:text-lg max-w-3xl mx-auto font-medium">
                        We build the bridge between simple AI queries and
                        high-yield prompt engineering.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{
                                y: -12,
                                scale: 1.03,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 220,
                                damping: 18,
                            }}
                            className="group relative overflow-hidden bg-[#f5ebd7]/60 border border-[#dfcbaf] rounded-3xl p-6 md:p-8 shadow-md backdrop-blur-sm"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
                                <div
                                    className={`absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl ${item.glow}`}
                                />
                            </div>

                            {/* Icon */}
                            <motion.div
                                whileHover={{
                                    rotate: [0, -8, 8, 0],
                                    scale: 1.15,
                                }}
                                transition={{
                                    duration: 0.6,
                                }}
                                className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center shadow-sm ${item.iconClass}`}
                            >
                                {item.icon}
                            </motion.div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="mt-6 md:mt-8 text-2xl md:text-3xl font-bold text-[#2c221e]">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-[#2c221e]/80 leading-7 md:leading-8 text-sm md:text-base">
                                    {item.description}
                                </p>
                            </div>

                            {/* Border Glow */}
                            <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#dfcbaf] transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseAiverse;