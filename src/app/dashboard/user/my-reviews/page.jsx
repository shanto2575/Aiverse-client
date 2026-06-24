"use client";

import React, { useEffect, useState } from "react";
import { baseUrl } from "@/lib/baseUrl";
import {
  Star,
  MessageSquare,
  Calendar,
  Eye,
} from "lucide-react";
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

        const res = await fetch(
          `${baseUrl}/api/user-reviews/${userEmail}`
        );

        const data = await res.json();

        setReviews(data.reviews || []);
        setTotalReviews(data.totalReviews || 0);
        setAverageRating(data.averageRating || 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-[#ebdcc9] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="border-b-2 border-[#dfcbaf] pb-5 mb-8">
          <h1 className="flex items-center gap-3 text-2xl sm:text-4xl font-black text-[#2c221e]">
            <MessageSquare size={30} />
            My Reviews
          </h1>

          <p className="mt-2 text-sm text-[#2c221e]/70 font-medium">
            Manage and review all feedback you've submitted.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm border border-[#dfcbaf] rounded-3xl p-5 shadow-md">
            <p className="text-xs uppercase tracking-wider text-[#2c221e]/60 font-bold">
              Total Reviews
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-[#2c221e] mt-2">
              {totalReviews}
            </h2>
          </div>

          <div className="bg-white/20 backdrop-blur-sm border border-[#dfcbaf] rounded-3xl p-5 shadow-md">
            <p className="text-xs uppercase tracking-wider text-[#2c221e]/60 font-bold">
              Average Rating
            </p>

            <h2 className="flex items-center gap-2 text-3xl sm:text-4xl font-black text-[#2c221e] mt-2">
              <Star
                className="fill-amber-400 text-amber-400"
                size={24}
              />
              {averageRating}
            </h2>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white/20 border border-[#dfcbaf] rounded-3xl p-10 text-center shadow-md">
            <p className="font-bold text-[#2c221e]">
              Loading reviews...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="bg-white/20 border border-[#dfcbaf] rounded-3xl p-10 text-center shadow-md">
            <MessageSquare
              size={50}
              className="mx-auto text-[#2c221e]/30 mb-4"
            />

            <h3 className="text-2xl font-black text-[#2c221e]">
              No Reviews Yet
            </h3>

            <p className="text-[#2c221e]/60 mt-2">
              Your submitted reviews will appear here.
            </p>
          </div>
        )}

        {/* Reviews Cards */}
        {!loading && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="bg-white/20 backdrop-blur-sm border border-[#dfcbaf] rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-black text-base text-[#2c221e] line-clamp-2">
                      {rev.promptTitle || "Unknown Prompt"}
                    </h3>

                    <span className="inline-block mt-2 bg-[#2c221e] text-[#ebdcc9] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {rev.promptaiEngine || "CHATGPT"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-black text-base text-[#2c221e] shrink-0">
                    <Star
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                    {Number(rev.rating).toFixed(1)}
                  </div>
                </div>

                {/* Review */}
                <div className="mt-4">
                  <p className="italic text-sm text-[#2c221e]/80 leading-6 line-clamp-3">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-[#dfcbaf]">
                  <div className="flex items-center gap-2 text-xs text-[#2c221e]/60 mb-3">
                    <Calendar size={13} />
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </div>

                  <Link
                    href={`/all-prompts/${rev.promptId}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] font-bold text-xs transition-all duration-300"
                  >
                    <Eye size={14} />
                    View Prompt
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;