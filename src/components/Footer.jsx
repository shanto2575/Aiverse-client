"use client";

import React from "react";
import Link from "next/link";
import { LogoGithub, LogoLinkedin, Gear, ArrowUpRight } from "@gravity-ui/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative mt-20 border-t border-[#dfcbaf]/60 bg-gradient-to-b from-transparent to-[#ebdcc9]/20">
      {/* Background Subtle Tech-Grid Element */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2c221e_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 text-[#2c221e] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
          
          {/* Brand Vision Column */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#2c221e] to-[#4a3b35] bg-clip-text text-transparent transition-all">
                Alverse
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#2c221e] group-hover:scale-150 transition-transform duration-300"></span>
            </Link>
            <p className="text-sm text-[#2c221e]/70 max-w-sm leading-relaxed font-medium">
              The next-generation prompt engineering ecosystem. Discover, iterate, and secure production-ready AI inputs for global LLMs.
            </p>
            
            {/* Elegant Social Row */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl border border-[#dfcbaf]/60 bg-[#ebdcc9]/30 hover:bg-[#2c221e] hover:text-[#ebdcc9] transition-all duration-300 shadow-sm group"
              >
                <LogoGithub className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl border border-[#dfcbaf]/60 bg-[#ebdcc9]/30 hover:bg-[#2c221e] hover:text-[#ebdcc9] transition-all duration-300 shadow-sm group flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl border border-[#dfcbaf]/60 bg-[#ebdcc9]/30 hover:bg-[#2c221e] hover:text-[#ebdcc9] transition-all duration-300 shadow-sm group"
              >
                <LogoLinkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/50">Navigation</h4>
            <ul className="space-y-3 text-sm font-semibold text-[#2c221e]/80">
              {[
                { name: "Marketplace", href: "/all-prompts" },
                { name: "Creator Dashboard", href: "/dashboard" },
                { name: "Dynamic Playground", href: "/" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-[#2c221e] flex items-center gap-1 group transition-colors">
                    <span className="bg-left-bottom bg-gradient-to-r from-[#2c221e] to-[#2c221e] bg-[length:0%_1.5px] bg-no-repeat group-hover:bg-[length:100%_1.5px] transition-all duration-300 pb-0.5">
                      {link.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#2c221e]/60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Engines Tags */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2c221e]/50">Supported Ecosystems</h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {["ChatGPT 4o", "Midjourney v6", "Claude 3.5", "Gemini Pro", "Stable Diffusion"].map((tool, idx) => (
                <span 
                  key={idx}
                  className="text-xs font-semibold border border-[#dfcbaf]/80 px-3 py-1 rounded-xl bg-[#ebdcc9]/20 backdrop-blur-sm shadow-sm text-[#2c221e]/90 hover:border-[#2c221e] hover:bg-[#ebdcc9]/40 transition-colors cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="pt-8 mt-4 border-t border-[#dfcbaf]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#2c221e]/60">
          <p>© {currentYear} Alverse Labs. Built for elite execution.</p>
          <div className="flex items-center gap-1.5 border border-[#dfcbaf]/60 bg-[#ebdcc9]/30 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm text-[#2c221e]/80">
            <Gear className="w-3.5 h-3.5 animate-spin-[spin_4s_linear_infinite]" />
            <span className="tracking-wide">System Architecture Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}