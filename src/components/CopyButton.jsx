"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { baseUrl } from "@/lib/baseUrl";

export default function CopyButton({ textToCopy, promptId }) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);

            const res = await fetch(
                `${baseUrl}/api/prompts/copy/${promptId}`,
                {
                    method: "PATCH",
                }
            );

            if (res.ok) {
                toast.success("Prompt copied!");
            }
        } catch (error) {
            toast.error("Failed to copy!");
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl border border-[#dfcbaf] hover:bg-[#2c221e]/5"
        >
            <Copy className="w-4 h-4" />
        </button>
    );
}