import BookmarkCard from "@/components/Dashboard/user/bookmarks/BookmarksCard";
import { Bookmarks as getBookmarks } from "@/lib/api/user/data";
import { getUser } from "@/lib/session";

const SavePromptsPage = async () => {
    const user = await getUser();

    if (!user?.email) {
        return <div>Please login first</div>;
    }

    const bookmarks = await getBookmarks(user.email);
    // console.log(bookmarks)

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tight">Bookmarks</h1>
                <p className="text-sm text-[#2c221e]/70 mt-1">
                    Manage your plan, credentials, and published prompt details.
                </p>
            </div>
            {bookmarks?.length === 0 ? (
                <div className="max-w-7xl mx-auto h-[500px] flex flex-col justify-center items-center 
    border border-[#dfcbaf] rounded-2xl bg-[#ebdcc9]/30 backdrop-blur-xs
    relative overflow-hidden p-6 text-center shadow-inner">

                    {/* Subtle Background Decorative Glows */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#78541c]/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#bfa054]/5 rounded-full blur-2xl pointer-events-none" />

                    {/* Modern Animated/Subtle Icon Placeholder */}
                    <div className="mb-4 p-4 rounded-full bg-[#78541c]/10 text-[#78541c] animate-pulse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-10 h-10"
                        >
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                    </div>

                    {/* Main Text Content */}
                    <h3 className="text-xl font-bold text-[#2c221e] tracking-tight">
                        No Bookmarks Found
                    </h3>

                    <p className="text-xs sm:text-sm text-[#2c221e]/60 max-w-sm mt-1.5 font-medium leading-relaxed">
                        You haven`t saved any prompt templates yet. Explore trending prompts and bookmark your favorites for quick access!
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {bookmarks.map((item) => (
                        <BookmarkCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavePromptsPage;