import { creatorPrompts } from "@/lib/api/user/data";
import { getUser } from "@/lib/session";
import { FileText, Copy, Bookmark } from "lucide-react";

const CreatorAnalytics = async () => {
    const user = await getUser();
    const data = await creatorPrompts(user.email);

    const totalCopies = data.prompts.reduce(
        (sum, item) => sum + (item.copies || 0),
        0
    );

    const totalBookmarks = data.prompts.reduce(
        (sum, item) => sum + (item.bookmarkCount || 0),
        0
    );

    const stats = [
        {
            title: "TOTAL PROMPTS",
            value: data.totalPrompts,
            icon: <FileText size={22} />,
        },
        {
            title: "TOTAL COPIES",
            value: totalCopies,
            icon: <Copy size={22} />,
        },
        {
            title: "TOTAL BOOKMARKS",
            value: totalBookmarks,
            icon: <Bookmark size={22} />,
        },
    ];

    return (
        <section className="w-full min-h-screen bg-[#ebdcc9] text-[#2c221e] p-8">
            <div className="mb-8 border-b-2 border-[#dfcbaf] pb-5">
                <h1 className="text-4xl font-black tracking-tight">
                    Creator Analytics Dashboard
                </h1>
                <p className="text-[#2c221e]/70 mt-2 text-sm font-semibold">
                    Real-time usage statistics and performance insights.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white/20 border-2 border-[#dfcbaf] rounded-2xl p-6 flex items-center gap-5 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-[#2c221e] bg-[#2c221e] text-[#ebdcc9]">
                            {stat.icon}
                        </div>

                        <div>
                            <p className="text-[#2c221e]/60 text-xs font-black uppercase tracking-wider">
                                {stat.title}
                            </p>
                            <h2 className="text-4xl font-black mt-1 text-[#2c221e]">
                                {stat.value}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CreatorAnalytics;