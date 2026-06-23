"use client";

import React, { useEffect, useState } from "react";
import { baseUrl } from "@/lib/baseUrl";
import { Star, MessageSquare, Calendar, Eye } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchMyReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/user-reviews/${userEmail}`);
        const data = await res.json();
        setReviews(data.reviews || []);
        setTotalReviews(data.totalReviews || 0);
        setAverageRating(data.averageRating || 0);
      } catch (error) {
        console.log("Error loading reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyReviews();
  }, [userEmail]);

  return (
    <div className="max-w-7xl mx-auto p-6 text-[#2c221e] min-h-screen bg-[#ebdcc9]">

      {/* HEADER */}
      <div className="space-y-2 mb-8 border-b-2 border-[#dfcbaf] pb-5">
        <h1 className="text-3xl font-black flex items-center gap-3">
          <MessageSquare size={28} className="text-[#2c221e]" />
          My Product Reviews ({totalReviews})
        </h1>
        <p className="text-sm font-semibold opacity-70">Feedback and ratings you've posted on the marketplace.</p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-[#dfcbaf] bg-white/50 shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-[#2c221e] text-[#ebdcc9] text-[11px] uppercase tracking-widest font-bold">
            <tr>
              <th className="p-4 text-left">Prompt Title</th>
              <th className="p-4 text-center">AI Tool</th>
              <th className="p-4 text-center">Rating</th>
              <th className="p-4 text-left">Comments</th>
              <th className="p-4 text-center">Submitted Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#dfcbaf]">
            {loading ? (
              <tr><td colSpan="6" className="p-10 text-center font-bold">Loading...</td></tr>
            ) : reviews.length === 0 ? (
              <tr><td colSpan="6" className="p-10 text-center font-bold opacity-50">No reviews found</td></tr>
            ) : (
              reviews.map((rev) => (
                <tr key={rev._id} className="hover:bg-[#dfcbaf]/20 transition">
                  <td className="p-4 font-black text-sm">{rev.promptTitle || "Unknown"}</td>
                  
                  <td className="p-4 text-center">
                    <span className="bg-[#2c221e] text-[#ebdcc9] text-[10px] px-3 py-1 rounded-full font-bold">
                      {rev.aiTool || "CHATGPT"}
                    </span>
                  </td>

                  <td className="p-4 text-center font-bold text-[#2c221e] flex items-center justify-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    {Number(rev.rating).toFixed(1)}
                  </td>

                  <td className="p-4 text-sm font-medium italic">`{rev.comment}`</td>

                  <td className="p-4 text-center text-xs opacity-70">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar size={12} /> {new Date(rev.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <Link
                      href={`/all-prompts/${rev.promptId}`}
                      className="bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] px-4 py-1.5 rounded-lg text-xs font-black flex items-center justify-center gap-1 transition-all"
                    >
                      <Eye size={14} /> View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviewsPage;