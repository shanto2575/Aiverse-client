"use client";

import { showToast } from "@/components/Utility/toast";
import { baseUrl } from "@/lib/baseUrl";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookmarkButton({ promptId, userEmail, prompt }) {
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // CHECK
    useEffect(() => {
        const checkBookmark = async () => {
            try {
                const res = await fetch(
                    `${baseUrl}/api/bookmarks/${userEmail}/${promptId}`
                );
                const data = await res.json();
                setBookmarked(data.bookmarked);
            } catch (err) {
                showToast.error("Failed to check bookmark");
            }
        };

        if (userEmail && promptId) checkBookmark();
    }, [userEmail, promptId]);

    // TOGGLE
    const handleBookmark = async () => {
        if (loading) return;

        setLoading(true);

        try {
            if (!bookmarked) {
                const res = await fetch(`${baseUrl}/api/bookmarks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userEmail,
                        promptId,
                        prompt,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed");
                }

                setBookmarked(true);
                router.refresh()
                showToast.success("Added to bookmarks");
            } else {
                const res = await fetch(
                    `${baseUrl}/api/bookmarks?userEmail=${userEmail}&promptId=${promptId}`,
                    {
                        method: "DELETE",
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed");
                }

                setBookmarked(false);
                router.refresh()
                showToast.success("Bookmark removed");
            }
        } catch (err) {
            showToast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleBookmark}
            disabled={loading}
            className={`p-2.5 rounded-xl border transition-all duration-300
        ${bookmarked
                    ? "bg-yellow-100 border-yellow-400 text-yellow-600"
                    : "border-[#dfcbaf] hover:bg-[#2c221e]/5 text-[#2c221e]"
                }`}
        >
            <Bookmark
                className={`w-4 h-4 transition-all duration-300 ${bookmarked ? "fill-current scale-110" : ""
                    }`}
            />
        </button>
    );
}