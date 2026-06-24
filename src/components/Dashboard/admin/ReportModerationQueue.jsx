"use client";

import { useState } from "react";
import {
    Calendar,
    Eye,
    CheckCircle2,
    AlertTriangle,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { handleDismissReport, handleRemovePrompt, handleWarnCreator } from "@/lib/admin/action";

const ReportModerationQueue = ({ reports = [] }) => {
    const [reportList, setReportList] = useState(reports);

    return (
        <div className="w-full">
            <div className="space-y-6">
                {reportList.map((report) => (
                    <div
                        key={report._id}
                        className="rounded-2xl border border-[#dfcbaf] bg-[#f5ebd7]/60 p-6 shadow-md backdrop-blur-sm"
                    >
                        {/* Reason / Top Row */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
                            <span className="self-start px-4 py-1 rounded-full text-xs font-bold bg-[#a64b39]/10 text-[#823324] border border-[#a64b39]/20 uppercase tracking-wider">
                                Reason: {report.reason}
                            </span>

                            <div className="flex items-center gap-2 text-[#2c221e]/60 text-sm">
                                <Calendar size={14} className="text-[#2c221e]/50" />
                                <span>Reported on {new Date(report.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Prompt Title */}
                        <h2 className="text-2xl font-bold text-[#2c221e] mb-4">
                            Prompt: {report.promptTitle}
                        </h2>

                        <div className="p-4 rounded-xl bg-[#ebdcc9]/50 border border-[#dfcbaf]/60 mb-6">
                            <p className="text-[#2c221e]/90 text-sm leading-relaxed">
                                <span className="font-bold text-[#2c221e]">Report Details:</span>{" "}
                                "{report.description}"
                            </p>
                        </div>

                        {/* Footer & Actions */}
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 pt-2 border-t border-[#dfcbaf]/40">
                            <div className="text-[#2c221e]/60 text-xs sm:text-sm">
                                Reported by: <span className="font-medium text-[#2c221e]/80">{report.userName}</span> ({report.userEmail})
                            </div>

                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {/* Inspect (View) */}
                                <Link href={`/all-prompts/${report.promptId}`}>
                                    <button className="px-4 py-2 rounded-lg bg-[#2c221e]/5 text-[#2c221e]/80 hover:bg-[#2c221e]/15 hover:text-[#2c221e] transition text-sm font-medium flex items-center gap-2 cursor-pointer border border-[#2c221e]/10">
                                        <Eye size={14} />
                                        Inspect
                                    </button>
                                </Link>

                                {/* Dismiss */}
                                <button
                                    onClick={() =>
                                        handleDismissReport(
                                            report._id,
                                            setReportList
                                        )
                                    }
                                    className="px-4 py-2 rounded-lg bg-[#486346]/5 text-[#344a32] hover:bg-[#486346]/15 transition text-sm font-medium flex items-center gap-2 cursor-pointer border border-[#486346]/10"
                                >
                                    <CheckCircle2 size={14} />
                                    Dismiss
                                </button>

                                {/* Warn Creator */}
                                <button
                                    onClick={() =>
                                        handleWarnCreator(
                                            report._id,
                                            setReportList
                                        )
                                    }
                                    className="px-4 py-2 rounded-lg bg-[#bfa054]/5 text-[#8a6f2d] hover:bg-[#bfa054]/15 transition text-sm font-medium flex items-center gap-2 cursor-pointer border border-[#bfa054]/10">
                                    <AlertTriangle size={14} />
                                    Warn Creator
                                </button>

                                {/* Remove Prompt */}
                                <button
                                    onClick={() =>
                                        handleRemovePrompt(
                                            report._id,
                                            setReportList
                                        )
                                    }
                                    className="px-4 py-2 rounded-lg bg-[#a64b39]/5 text-[#823324] hover:bg-[#a64b39]/15 transition text-sm font-medium flex items-center gap-2 cursor-pointer border border-[#a64b39]/10"
                                >
                                    <Trash2 size={14} />
                                    Remove Prompt
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportModerationQueue;