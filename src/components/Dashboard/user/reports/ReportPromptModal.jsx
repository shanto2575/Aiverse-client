"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react"; 
import { baseUrl } from "@/lib/baseUrl";
import { showToast } from "@/components/Utility/toast";

export default function ReportPromptModal({
    isOpen,
    onClose,
    promptId,
    userEmail,
}) {
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const reasons = [
        "Inappropriate Content",
        "Spam",
        "Copyright Violation",
        "Harassment",
        "Other",
    ];

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!reason) {
            alert("Please select a reason");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${baseUrl}/api/reports`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    promptId,
                    userEmail,
                    reason,
                    description,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setReason("");
                setDescription("");
                onClose();
                showToast.success('Reports Successfull')
            } 
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#2c221e]/40 backdrop-blur-md flex items-center justify-center z-50 px-4 transition-all duration-300">
            
            <div className="bg-[#ebdcc9] text-[#2c221e] w-full max-w-md rounded-2xl p-6 space-y-5 relative border-2 border-[#dfcbaf] shadow-[0_20px_50px_rgba(44,34,30,0.3)] animate-in fade-in zoom-in-95 duration-200">

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-[#2c221e]/60 hover:text-[#2c221e] p-1 rounded-lg hover:bg-[#dfcbaf]/30 transition-all duration-200 cursor-pointer"
                >
                    <X size={20} className="stroke-[2.5]" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 border-b border-[#dfcbaf] pb-3">
                    <AlertTriangle size={22} className="text-[#2c221e] fill-[#2c221e]/10" />
                    <h2 className="text-xl font-black tracking-tight">Report Prompt</h2>
                </div>

                {/* Form Wrapper */}
                <div className="space-y-4">
                    
                    {/* Reason Select Dropdown */}
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-wider opacity-80">Choose Reason</label>
                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full bg-white/70 border-2 border-[#dfcbaf] rounded-xl px-4 py-3 outline-none font-semibold text-sm text-[#2c221e] focus:border-[#2c221e] focus:bg-white transition-all duration-200 shadow-inner appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232c221e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
                        >
                            <option value="" className="font-semibold text-[#2c221e]/50">Select reason...</option>
                            {reasons.map((r) => (
                                <option key={r} value={r} className="font-semibold">
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-wider opacity-80">Additional Details</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide a breakdown or specific details on why this prompt violates policies..."
                            className="w-full bg-white/70 border-2 border-[#dfcbaf] text-[#2c221e] placeholder-[#2c221e]/40 rounded-xl px-4 py-3 h-28 resize-none text-sm font-medium outline-none focus:border-[#2c221e] focus:bg-white transition-all duration-200 shadow-inner"
                        />
                    </div>
                </div>

                {/* Buttons Layout */}
                <div className="flex gap-3 pt-2">
                    {/* Cancel Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-3.5 border-2 border-[#2c221e] text-[#2c221e] hover:bg-[#2c221e]/10 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-150 active:scale-[0.98] cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3.5 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] rounded-xl text-xs font-black tracking-widest uppercase shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Submitting..." : "Submit Report"}
                    </button>
                </div>
                
            </div>
        </div>
    );
}