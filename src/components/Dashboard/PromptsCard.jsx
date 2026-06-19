import { Copy, Eye, Layers, Lock, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PromptsCard = ({cardData,ratingValue}) => {
    return (
        <div>
            <div
                
                className="w-full bg-white/60 backdrop-blur-md rounded-[24px] border border-[#dfcbaf] p-4 flex flex-col justify-between space-y-4 shadow-[0_4px_20px_rgba(44,34,30,0.02)] hover:shadow-[0_10px_30px_rgba(44,34,30,0.08)] transition-all duration-300 group"
            >
                <div className="space-y-4">

                    <div className="relative w-full h-40 rounded-[16px] overflow-hidden bg-[#2c221e]/5 shrink-0">
                        <Image
                            src={cardData.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"}
                            alt={cardData.title}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute top-2.5 right-2.5">
                            <span className="bg-[#2c221e]/90 backdrop-blur-md text-[#ebdcc9] p-1.5 rounded-full inline-block border border-white/10">
                                {cardData.visibility === "private" ? <Lock className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2c221e]/10 text-[#2c221e] px-2.5 py-1 rounded-full border border-[#2c221e]/10">
                            {cardData.aiEngine || "CLAUDE"}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-transparent text-[#2c221e]/60 px-2.5 py-1 rounded-full border border-[#dfcbaf]">
                            {cardData.difficulty || "INTERMEDIATE"}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-black tracking-tight leading-snug text-[#2c221e] line-clamp-2">
                            {cardData.title}
                        </h3>
                        <p className="text-xs font-semibold text-[#2c221e]/60 line-clamp-2 leading-relaxed">
                            {cardData.shortDescription}
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2c221e]/50 pt-1">
                        <Layers className="w-3.5 h-3.5 text-[#2c221e]/70" />
                        <span>{cardData.category || "DESIGN"}</span>
                    </div>
                </div>
                <div className="space-y-3 pt-3 border-t border-[#dfcbaf]">

                    <div className="flex items-center justify-between text-[11px] font-bold text-[#2c221e]/60">
                        <span className="truncate max-w-[140px]">
                            👤 {cardData.userEmail ? cardData.userEmail.split('@')[0] : "Creator"}
                        </span>

                        <div className="flex items-center gap-2.5 text-[#2c221e]/70">
                            <span className="flex items-center gap-1">
                                <Copy className="w-3 h-3 opacity-60" /> {cardData.copies || 0}
                            </span>
                            <span className="flex items-center gap-0.5 text-amber-700">
                                <Star className="w-3 h-3 fill-current" /> {ratingValue.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <Link href={`/all-prompts/${cardData._id}`}>
                        <button className="w-full flex items-center justify-center gap-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-colors duration-300">
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PromptsCard