import PromptModerationTable from "@/components/Dashboard/admin/PromptModerationTable";
import { adminPrompts } from "@/lib/admin/data";
import Link from "next/link";

const AdminModerationPage = async ({ searchParams }) => {
    const params = await searchParams; // এটা add করতে হবে
    const page = Number(params?.page) || 1;
    const limit = 5;

    const data = await adminPrompts(page, limit);

    return (
        <div>
            <div className="p-4 md:p-6 border-b border-[#dfcbaf]">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2c221e]">
                    Prompt Template Submissions Moderation
                </h2>

                <p className="text-[#2c221e]/70 mt-2 text-sm md:text-base">
                    Approve templates, reject with feedback, or tag featured highlights.
                </p>
            </div>

            <section className="w-full min-h-screen py-3 px-2 md:px-0">
                <PromptModerationTable prompts={data.prompts} key={page} />

                <div className="flex justify-center items-center gap-2 mt-10 mb-6">
                    {page > 1 && (
                        <Link
                            href={`/dashboard/admin/all-prompts?page=${page - 1}`}
                            className="px-3.5 py-2 bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] font-semibold text-sm rounded-xl transition duration-200 shadow-sm active:scale-95"
                        >
                            Prev
                        </Link>
                    )}

                    {[...Array(data.totalPages)].map((_, index) => {
                        const isCurrent = page === index + 1;
                        return (
                            <Link
                                key={index}
                                href={`/dashboard/admin/all-prompts?page=${index + 1}`}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-200 border ${isCurrent
                                        ? "bg-[#2c221e] text-[#ebdcc9] border-[#2c221e] shadow-md shadow-[#2c221e]/10 scale-105"
                                        : "bg-[#ebdcc9]/40 text-[#2c221e]/80 border-[#dfcbaf] hover:bg-[#ebdcc9]/80"
                                    }`}
                            >
                                {index + 1}
                            </Link>
                        );
                    })}

                    {page < data.totalPages && (
                        <Link
                            href={`/dashboard/admin/all-prompts?page=${page + 1}`}
                            className="px-3.5 py-2 bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] font-semibold text-sm rounded-xl transition duration-200 shadow-sm active:scale-95"
                        >
                            Next
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminModerationPage;