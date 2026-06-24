"use client";
import { handleApprove, handleDelete, handleReject } from "@/lib/admin/action";
import { Eye, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PromptModerationTable = ({ prompts = [] }) => {
    const [promptList, setPromptList] = useState(prompts);   
    return (
        <div className="w-full rounded-2xl border border-[#dfcbaf] bg-[#f5ebd7]/60 shadow-md backdrop-blur-sm overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-[#dfcbaf] text-[#2c221e]/60 text-sm uppercase tracking-wider bg-[#2c221e]/5">
                        <tr>
                            <th className="p-5 font-semibold">Template Title</th>
                            <th className="p-5 font-semibold">Creator</th>
                            <th className="p-5 font-semibold">AI Engine</th>
                            <th className="p-5 font-semibold">Visibility</th>
                            <th className="p-5 font-semibold">Status</th>
                            <th className="p-5 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {promptList.map((prompt) => (
                            <tr
                                key={prompt._id}
                                className="border-b border-[#dfcbaf] hover:bg-[#ebdcc9]/50 transition duration-200"
                            >
                                {/* Title */}
                                <td className="p-5">
                                    <div>
                                        <h3 className="font-semibold text-[#2c221e]">
                                            {prompt.title}
                                        </h3>
                                        <p className="text-xs text-[#2c221e]/60 mt-0.5">
                                            Category: {prompt.category}
                                        </p>
                                    </div>
                                </td>

                                {/* Creator */}
                                <td className="p-5">
                                    <div>
                                        <h3 className="font-medium text-[#2c221e]">
                                            {prompt.creatorName}
                                        </h3>
                                        <p className="text-xs text-[#2c221e]/60 mt-0.5">
                                            {prompt.userEmail}
                                        </p>
                                    </div>
                                </td>

                                {/* AI Engine */}
                                <td className="p-5">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${prompt.aiEngine?.toLowerCase().includes("gpt")
                                            ? "bg-[#4a5d4e]/10 text-[#3b4a3e] border-[#4a5d4e]/20"
                                            : prompt.aiEngine?.toLowerCase().includes("claude")
                                                ? "bg-[#c47b59]/10 text-[#a05a37] border-[#c47b59]/20"
                                                : "bg-[#684b1e]/10 text-[#78541c] border-[#78541c]/20"
                                            }`}
                                    >
                                        {prompt.aiEngine}
                                    </span>
                                </td>

                                {/* Visibility */}
                                <td className="p-5 text-sm text-[#2c221e]/80 capitalize font-medium">
                                    {prompt.visibility}
                                </td>

                                {/* Status */}
                                <td className="p-5">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${prompt.status === "approved"
                                            ? "bg-[#486346]/10 text-[#344a32] border-[#486346]/20"
                                            : prompt.status === "rejected"
                                                ? "bg-[#a64b39]/10 text-[#823324] border-[#a64b39]/20"
                                                : "bg-[#bfa054]/10 text-[#8a6f2d] border-[#bfa054]/20"
                                            }`}
                                    >
                                        {prompt.status}
                                    </span>
                                </td>

                                {/* Actions - Conditional Rendering Added Here */}
                                <td className="p-5">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/all-prompts/${prompt._id}`}>
                                            <button  className="p-2 rounded-lg bg-[#2c221e]/5 text-[#2c221e]/80 hover:bg-[#2c221e]/15 hover:text-[#2c221e] transition cursor-pointer" title="View Details">
                                                <Eye size={15} />
                                            </button>
                                        </Link>

                                        {(prompt.status === "pending" || prompt.status === "rejected") && (
                                            <button
                                            title="Reject"
                                                onClick={() => handleApprove(prompt._id,setPromptList)}
                                                className="p-2 rounded-lg bg-[#486346]/5 text-[#344a32] hover:bg-[#486346]/15 transition cursor-pointer"
                                            >
                                                <CheckCircle2 size={15} />
                                            </button>
                                        )}

                                        {(prompt.status === "pending" || prompt.status === "approved") && (
                                            <button
                                            title="approved"
                                                onClick={() => handleReject(prompt._id,setPromptList)}
                                                className="p-2 rounded-lg bg-[#bfa054]/5 text-[#8a6f2d] hover:bg-[#bfa054]/15 transition cursor-pointer"
                                            >
                                                <XCircle size={15} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(prompt._id,setPromptList)}
                                            className="p-2 rounded-lg bg-[#a64b39]/5 text-[#823324] hover:bg-[#a64b39]/15 transition cursor-pointer"
                                            title="Delete"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PromptModerationTable;