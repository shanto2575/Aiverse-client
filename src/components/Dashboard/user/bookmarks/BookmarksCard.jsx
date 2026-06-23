"use client";

import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/baseUrl";
import Image from "next/image";
import { Trash2, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function BookmarkCard({ item }) {
    const router = useRouter();
    const prompt = item?.prompt;
    // console.log(prompt)

    const handleDetails = () => {
        router.push(`/all-prompts/${item?.promptId}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();

        const res = await fetch(
            `${baseUrl}/api/bookmarks?userEmail=${item.userEmail}&promptId=${item.promptId}`,
            { method: "DELETE" }
        );

        if (res.ok) {
            location.reload();
        }
    };

    return (
        <div
            onClick={handleDetails}
            className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#ebdcc9]/20 border border-[#dfcbaf]/40 hover:border-[#dfcbaf] shadow-sm hover:shadow-[0_8px_30px_rgb(44,34,30,0.06)] transition-all duration-300 cursor-pointer relative"
        >
            {/* IMAGE AREA WITH PREMIUM BLUR OVERLAY */}
            <div className="w-full sm:w-24 sm:h-24 h-32 rounded-xl overflow-hidden flex-shrink-0 relative bg-[#2c221e]/5">
                <Image
                    src={prompt?.image || "/fallback-placeholder.png"} 
                    width={300}
                    height={300}
                    alt={prompt?.title || "prompt"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#2c221e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 flex flex-col justify-between space-y-2">
                <div>
                    <div className="flex items-center justify-between gap-2">
                        {/* CATEGORY BADGE */}
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#2c221e] text-[#ebdcc9]">
                            {prompt?.category || "uncategorized"}
                        </span>

                        {/* DELETE BUTTON - MODERN & SUBTLE */}
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="text-[#2c221e]/50 hover:text-red-600 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors duration-200 cursor-pointer z-10"
                            title="Remove Bookmark"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    {/* TITLE */}
                    <h2 className="text-base font-black text-[#2c221e] mt-2 line-clamp-1 tracking-tight group-hover:text-[#4a3b35] transition-colors">
                        {prompt?.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-xs text-[#2c221e]/70 mt-1 line-clamp-2 leading-relaxed">
                        {prompt?.shortDescription || prompt?.description || "No description available."}
                    </p>
                </div>

                {/* FOOTER METADATA */}
                <div className="flex items-center justify-between pt-2 border-t border-[#dfcbaf]/20 mt-1">
                    {/* DATE */}
                    <div className="flex items-center gap-1 text-[#2c221e]/50 text-[10px] font-medium">
                        <Calendar size={12} />
                        <span>{item?.createdAt ? new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "Recent"}</span>
                    </div>

                    {/* ACTION TEXT/BUTTON */}

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2c221e] group-hover:translate-x-0.5 transition-transform duration-200">
                        <span>View Details</span>
                        <ArrowUpRight size={14} className="text-[#2c221e]/70" />
                    </span>

                </div>
            </div>
        </div>
    );
}