"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import ReportPromptModal from "./ReportPromptModal";

export default function ReportSection({ promptId, userEmail }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2.5 rounded-xl border border-[#dfcbaf] hover:bg-[#2c221e]/5 bg-white/40"
            >
                <Flag className="w-4 h-4" />
            </button>

            <ReportPromptModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                promptId={promptId}
                userEmail={userEmail}
            />
        </>
    );
}