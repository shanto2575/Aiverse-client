"use client";

import React from "react";
import { ShieldAlert, ArrowLeft, Home, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const UnauthorizedPage = () => {
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="min-h-screen bg-[#ebdcc9] flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-red-950 selection:text-red-200">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 rounded-[2.5rem] border border-red-900/20 bg-red-950/[0.03] backdrop-blur-xl shadow-[0_22px_70px_-15px_rgba(153,27,27,0.12)] overflow-hidden"
            >
                <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-red-900/10 relative overflow-hidden group">
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-600/5 rounded-full blur-3xl transition-all duration-700 group-hover:bg-red-600/10" />

                    <motion.div variants={itemVariants} className="flex items-center gap-2 relative z-10">
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
                        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-red-800/60">
                            Aiverse Security Breach
                        </span>
                    </motion.div>

                    <div className="my-12 space-y-6 relative z-10">
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            className="inline-flex p-4 rounded-2xl bg-red-950 text-red-200 shadow-lg shadow-red-950/20 cursor-default border border-red-800/30"
                        >
                            <ShieldAlert size={36} strokeWidth={1.5} className="text-red-400" />
                        </motion.div>

                        <div className="space-y-3">
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl sm:text-5xl font-black text-red-950 tracking-tight leading-none"
                            >
                                Wrong Turn. <br />
                                <span className="text-red-700/60 font-serif italic font-normal">Access Denied.</span>
                            </motion.h1>
                            <motion.p
                                variants={itemVariants}
                                className="text-sm font-medium text-red-900/80 max-w-sm leading-relaxed"
                            >
                                You have attempted to reach a restricted matrix or an invalid endpoint. Active authentication or administrative role clearance is mandatory.
                            </motion.p>
                        </div>
                    </div>

                    <motion.p variants={itemVariants} className="text-xs text-red-800/50 font-medium relative z-10">
                        Think this is a platform bug? Please log a report to security command.
                    </motion.p>
                </div>

                <div className="md:col-span-5 bg-red-950/[0.01] p-8 sm:p-12 flex flex-col justify-center space-y-8 relative">
                    <motion.div variants={itemVariants} className="space-y-2">
                        <span className="text-[11px] font-bold text-red-800/50 uppercase tracking-widest block">
                            Clearance Gateway
                        </span>
                        <h3 className="text-xl font-bold text-red-950 tracking-tight">
                            Verify Identity
                        </h3>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col gap-3.5">
                        <Link href={'/signin'}>
                            <motion.button
                                whileHover={{ scale: 1.01, backgroundColor: "#450a0a" }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => router.push("/sign-in")}
                                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-red-950 text-red-100 font-bold text-xs uppercase tracking-widest shadow-xl shadow-red-950/10 cursor-pointer group border border-red-900/30"
                            >
                                <span className="flex items-center gap-3">
                                    <LogIn size={16} className="text-red-300" />
                                    Sign In to Account
                                </span>
                                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 text-red-400">→</span>
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(153,27,27,0.06)", borderColor: "rgba(153,27,27,0.3)" }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => router.back()}
                            className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl border border-red-900/20 bg-red-950/[0.02] text-xs font-bold uppercase tracking-widest text-red-900 cursor-pointer"
                        >
                            <ArrowLeft size={16} className="text-red-800/60" />
                            Return to Previous
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(153,27,27,0.06)" }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => router.push("/")}
                            className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-transparent text-xs font-bold uppercase tracking-widest text-red-900/70 hover:text-red-950 cursor-pointer"
                        >
                            <Home size={16} className="text-red-800/50" />
                            Teleport to Home
                        </motion.button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="pt-4 border-t border-red-900/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-red-800/50"
                    >
                        <span>Status: 403 / Malformed Route</span>
                        <span>Secure TLS 1.3</span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default UnauthorizedPage;