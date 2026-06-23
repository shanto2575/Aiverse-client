import BookmarkCard from "@/components/Dashboard/user/bookmarks/BookmarksCard";
import { Bookmarks as getBookmarks } from "@/lib/api/user/data";
import { getUser } from "@/lib/session";

const SavePromptsPage = async () => {
    const user = await getUser();

    if (!user?.email) {
        return <div>Please login first</div>;
    }

    const bookmarks = await getBookmarks(user.email);
    console.log(bookmarks)

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tight">Bookmarks</h1>
                <p className="text-sm text-[#2c221e]/70 mt-1">
                    Manage your plan, credentials, and published prompt details.
                </p>
            </div>
            {bookmarks?.length === 0 ? (
                <p className="text-gray-500">No bookmarks found</p>
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