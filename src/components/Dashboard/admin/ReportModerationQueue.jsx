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
            <div className="space-y-4 md:space-y-6">
                {reportList.map((report) => (
                    <div
                        key={report._id}
                        className="rounded-2xl border border-[#dfcbaf] bg-[#f5ebd7]/60 p-4 md:p-6 shadow-md backdrop-blur-sm"
                    >
                        {/* Reason / Top Row */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 md:mb-5">
                            <span className="self-start px-3 py-1 rounded-full text-[10px] md:text-xs font-bold bg-[#a64b39]/10 text-[#823324] border border-[#a64b39]/20 uppercase tracking-wider break-all">
                                Reason: {report.reason}
                            </span>

                            <div className="flex items-center gap-1.5 text-[#2c221e]/60 text-xs md:text-sm">
                                <Calendar size={14} className="text-[#2c221e]/50" />
                                <span>Reported on {new Date(report.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Prompt Title */}
                        <h2 className="text-xl md:text-2xl font-bold text-[#2c221e] mb-3 break-words">
                            Prompt: {report.promptTitle}
                        </h2>

                        {/* Report Description */}
                        <div className="p-3 md:p-4 rounded-xl bg-[#ebdcc9]/50 border border-[#dfcbaf]/60 mb-5 md:mb-6">
                            <p className="text-[#2c221e]/90 text-xs md:text-sm leading-relaxed break-words">
                                <span className="font-bold text-[#2c221e]">Report Details:</span>{" "}
                                "{report.description}"
                            </p>
                        </div>

                        {/* Footer & Actions */}
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 pt-3 border-t border-[#dfcbaf]/40">
                            <div className="text-[#2c221e]/60 text-xs md:text-sm break-all">
                                Reported by: <span className="font-medium text-[#2c221e]/80">{report.userName}</span> ({report.userEmail})
                            </div>

                            {/* Actions Buttons Container */}
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3">
                                {/* Inspect (View) */}
                                <Link href={`/all-prompts/${report.promptId}`} className="w-full sm:w-auto">
                                    <button className="w-full px-3 md:px-4 py-2 rounded-lg bg-[#2c221e]/5 text-[#2c221e]/80 hover:bg-[#2c221e]/15 hover:text-[#2c221e] transition text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer border border-[#2c221e]/10">
                                        <Eye size={14} className="shrink-0" />
                                        <span>Inspect</span>
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
                                    className="px-3 md:px-4 py-2 rounded-lg bg-[#486346]/5 text-[#344a32] hover:bg-[#486346]/15 transition text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer border border-[#486346]/10"
                                >
                                    <CheckCircle2 size={14} className="shrink-0" />
                                    <span>Dismiss</span>
                                </button>

                                {/* Warn Creator */}
                                <button
                                    onClick={() =>
                                        handleWarnCreator(
                                            report._id,
                                            setReportList
                                        )
                                    }
                                    className="px-3 md:px-4 py-2 rounded-lg bg-[#bfa054]/5 text-[#8a6f2d] hover:bg-[#bfa054]/15 transition text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer border border-[#bfa054]/10"
                                >
                                    <AlertTriangle size={14} className="shrink-0" />
                                    <span className="truncate">Warn Creator</span>
                                </button>

                                {/* Remove Prompt */}
                                <button
                                    onClick={() =>
                                        handleRemovePrompt(
                                            report._id,
                                            setReportList
                                        )
                                    }
                                    className="col-span-2 sm:col-span-1 px-3 md:px-4 py-2 rounded-lg bg-[#a64b39]/5 text-[#823324] hover:bg-[#a64b39]/15 transition text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer border border-[#a64b39]/10"
                                >
                                    <Trash2 size={14} className="shrink-0" />
                                    <span>Remove Prompt</span>
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