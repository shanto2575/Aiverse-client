import ReportModerationQueue from "@/components/Dashboard/admin/ReportModerationQueue";
import { getAdminReports } from "@/lib/admin/data";
import { ShieldCheck } from "lucide-react";

const ReportsPage = async () => {
    const reports = await getAdminReports();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#2c221e]">
                    Reported Prompts Moderation Queue
                </h1>
                <p className="text-[#2c221e]/70 mt-2 text-sm">
                    Review community warnings, warn creators, dismiss complaints, or remove posts.
                </p>
            </div>
            <section className="w-full min-h-screen p-8">

                {/* Main Wrapper */}
                {reports?.length > 0 ? (
                    <ReportModerationQueue reports={reports} />
                ) : (
                    <div className="flex items-center justify-center min-h-[75vh]">
                        <div className="w-full max-w-xl rounded-2xl border border-[#dfcbaf] bg-[#f5ebd7]/60 shadow-md backdrop-blur-sm p-10 text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-[#486346]/10 flex items-center justify-center mb-6">
                                <ShieldCheck size={40} className="text-[#344a32]" />
                            </div>

                            <h2 className="text-3xl font-bold text-[#2c221e] mb-3">
                                No Reports Found
                            </h2>

                            <p className="text-[#2c221e]/70 text-sm leading-relaxed">
                                Great news! There are currently no reported prompts in the moderation queue.
                                Everything looks clean and under control.
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ReportsPage;