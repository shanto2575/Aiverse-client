"use client";

import { useRouter } from "next/navigation";
import { baseUrl } from "@/lib/baseUrl";
import Image from "next/image";
import { Trash2, Calendar, ArrowUpRight } from "lucide-react";

export default function BookmarkCard({ item, onDelete }) {
    const router = useRouter();
    const prompt = item?.prompt;

    const handleDetails = () => {
        router.push(`/all-prompts/${item?.promptId}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();

        try {
            const res = await fetch(
                `${baseUrl}/api/bookmarks?userEmail=${item.userEmail}&promptId=${item.promptId}`,
                { method: "DELETE" }
            );

            if (res.ok) {
                // better than reload
                if (onDelete) {
                    onDelete(item.promptId);
                } else {
                    router.refresh();
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            onClick={handleDetails}
            className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#ebdcc9]/20 border border-[#dfcbaf]/40 hover:border-[#dfcbaf] shadow-sm hover:shadow-[0_8px_30px_rgb(44,34,30,0.06)] transition-all duration-300 cursor-pointer relative"
        >
            {/* IMAGE */}
            <div className="w-full sm:w-24 sm:h-24 h-32 rounded-xl overflow-hidden flex-shrink-0 relative bg-[#2c221e]/5">
                <Image
                    src={prompt?.image || "/fallback-placeholder.png"}
                    width={300}
                    height={300}
                    alt={prompt?.title || "prompt"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col justify-between space-y-2">
                <div>
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#2c221e] text-[#ebdcc9]">
                            {prompt?.category || "uncategorized"}
                        </span>

                        <button
                            onClick={handleDelete}
                            className="text-[#2c221e]/50 hover:text-red-600 p-1.5 rounded-lg"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <h2 className="text-base font-black text-[#2c221e] mt-2 line-clamp-1">
                        {prompt?.title}
                    </h2>

                    <p className="text-xs text-[#2c221e]/70 mt-1 line-clamp-2">
                        {prompt?.shortDescription || prompt?.description}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#dfcbaf]/20">
                    <div className="flex items-center gap-1 text-[#2c221e]/50 text-[10px]">
                        <Calendar size={12} />
                        <span>
                            {item?.createdAt
                                ? new Date(item.createdAt).toLocaleDateString()
                                : "Recent"}
                        </span>
                    </div>

                    <span className="text-xs font-bold text-[#2c221e] flex items-center gap-1">
                        View Details <ArrowUpRight size={14} />
                    </span>
                </div>
            </div>
        </div>
    );
}