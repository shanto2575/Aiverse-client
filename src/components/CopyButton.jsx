"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ textToCopy }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy || "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] text-xs font-black uppercase tracking-wider py-1.5 px-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
        >
            {copied ? (
                <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                </>
            ) : (
                <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                </>
            )}
        </button>
    );
}