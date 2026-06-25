"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LogoGithub,
    LogoLinkedin,
    Globe,
    Heart,
    NodesRight,
} from "@gravity-ui/icons";
import { FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    if (pathname.includes('dashboard')) {
        return null;
    }

    return (
        <footer className="bg-[#ebdcc9] border-t border-[#dfcbaf] relative overflow-hidden">
            {/* Background Subtle Accent Glow */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#78541c]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#bfa054]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-[#78541c]/10 text-[#78541c]">
                                <NodesRight className="w-5 h-5 animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-black text-[#2c221e] tracking-tight">
                                Aiverse
                            </h2>
                        </div>

                        <p className="text-[#2c221e]/70 leading-relaxed text-sm font-medium">
                            Your ultimate hub for engineering production-ready AI prompts.
                            Unlock the full potential of LLMs, streamline your development
                            workflows, and build next-gen applications seamlessly.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-[#2c221e] font-bold text-xs uppercase tracking-[0.2em] mb-6">
                            Platform
                        </h3>

                        <div className="flex flex-col gap-3.5 text-sm font-medium text-[#2c221e]/70">
                            <Link href="/all-prompts" className="hover:text-[#78541c] transition-colors duration-200">
                                All Prompts
                            </Link>
                            <Link href="/all-prompts" className="hover:text-[#78541c] transition-colors duration-200">
                                Trending Prompts
                            </Link>
                            <Link href="/signin" className="hover:text-[#78541c] transition-colors duration-200">
                                Login
                            </Link>
                            <Link href="/signup" className="hover:text-[#78541c] transition-colors duration-200">
                                Register
                            </Link>
                            <Link href="/demo-user" className="hover:text-[#78541c] transition-colors duration-200">
                                Demo User
                            </Link>
                        </div>
                    </div>

                    {/* Tech Stack Resources Links */}
                    <div>
                        <h3 className="text-[#2c221e] font-bold text-xs uppercase tracking-[0.2em] mb-6">
                            Resources
                        </h3>

                        <div className="flex flex-col gap-3.5 text-sm font-medium text-[#2c221e]/70">
                            <p className="hover:text-[#78541c] cursor-default transition-colors duration-200">
                                Next.js
                            </p>
                            <p className="hover:text-[#78541c] cursor-default transition-colors duration-200">
                                Better Auth
                            </p>
                            <p className="hover:text-[#78541c] cursor-default transition-colors duration-200">
                                MongoDB
                            </p>
                            <p className="hover:text-[#78541c] cursor-default transition-colors duration-200">
                                Express
                            </p>
                            <p className="hover:text-[#78541c] cursor-default transition-colors duration-200">
                                Node.js
                            </p>
                            <p className="hover:text-[#78541c] cursor-default transition-colors duration-200">
                                JWT Token
                            </p>
                        </div>
                    </div>

                    {/* Connect & Support Column */}
                    <div>
                        <h3 className="text-[#2c221e] font-bold text-xs uppercase tracking-[0.2em] mb-6">
                            Connect
                        </h3>

                        <div className="flex items-center gap-2.5 mb-6">
                            <a
                                href="https://x.com/home"
                                target="_blank"
                                className="w-10 h-10 rounded-xl border border-[#dfcbaf] bg-[#f5ebd7]/40 flex items-center justify-center text-[#2c221e]/70 hover:text-[#78541c] hover:border-[#78541c]/30 hover:bg-[#f5ebd7]/80 transition-all duration-300 shadow-sm"
                            >
                                <FaTwitter size={16} />
                            </a>

                            <a
                                href="https://github.com/shanto2575"
                                target="_blank"
                                className="w-10 h-10 rounded-xl border border-[#dfcbaf] bg-[#f5ebd7]/40 flex items-center justify-center text-[#2c221e]/70 hover:text-[#78541c] hover:border-[#78541c]/30 hover:bg-[#f5ebd7]/80 transition-all duration-300 shadow-sm"
                            >
                                <LogoGithub size={16} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/shantosharma/"
                                target="_blank"
                                className="w-10 h-10 rounded-xl border border-[#dfcbaf] bg-[#f5ebd7]/40 flex items-center justify-center text-[#2c221e]/70 hover:text-[#78541c] hover:border-[#78541c]/30 hover:bg-[#f5ebd7]/80 transition-all duration-300 shadow-sm"
                            >
                                <LogoLinkedin size={16} />
                            </a>

                            <a
                                href="https://www.facebook.com/shanto.sharma.2575"
                                target="_blank"
                                className="w-10 h-10 rounded-xl border border-[#dfcbaf] bg-[#f5ebd7]/40 flex items-center justify-center text-[#2c221e]/70 hover:text-[#78541c] hover:border-[#78541c]/30 hover:bg-[#f5ebd7]/80 transition-all duration-300 shadow-sm"
                            >
                                <FaFacebook size={16} />
                            </a>
                        </div>

                        <p className="text-xs font-bold text-[#2c221e]/50 uppercase tracking-wider">
                            Questions? Support at:
                        </p>

                        <p className="text-[#78541c] font-bold text-sm mt-1 hover:underline cursor-pointer transition">
                            Help@aiverse.com
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#dfcbaf]/60 mt-14 pt-8 text-center">
                    <p className="text-[#2c221e]/60 text-xs font-medium flex flex-wrap justify-center items-center gap-1.5">
                        © {currentYear} Aiverse. All rights reserved. Created with
                        <Heart className="w-3.5 h-3.5 text-[#78541c]" style={{ fill: "#78541c" }} />
                        by
                        <span className="font-bold text-[#2c221e] hover:text-[#78541c] cursor-pointer transition">
                            Shanto Dev Sharma
                        </span>
                    </p>
                </div>

            </div>
        </footer>
    );
}