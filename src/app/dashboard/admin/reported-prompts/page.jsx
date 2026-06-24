import ReportModerationQueue from "@/components/Dashboard/admin/ReportModerationQueue";
import { getAdminReports } from "@/lib/admin/data";
import { ShieldCheck } from "lucide-react";

const ReportsPage = async () => {
    const reports = await getAdminReports();

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2c221e]">
                    Reported Prompts Moderation Queue
                </h1>
                <p className="text-[#2c221e]/70 mt-2 text-xs md:text-sm">
                    Review community warnings, warn creators, dismiss complaints, or remove posts.
                </p>
            </div>
            
            <section className="w-full min-h-screen">
                {/* Main Wrapper */}
                {reports?.length > 0 ? (
                    <ReportModerationQueue reports={reports} />
                ) : (
                    <div className="flex items-center justify-center min-h-[50vh] md:min-h-[65vh]">
                        <div className="w-full max-w-xl rounded-2xl border border-[#dfcbaf] bg-[#f5ebd7]/60 shadow-md backdrop-blur-sm p-6 md:p-10 text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-[#486346]/10 flex items-center justify-center mb-4 md:mb-6">
                                <ShieldCheck size={32} className="text-[#344a32] md:scale-125" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-[#2c221e] mb-3">
                                No Reports Found
                            </h2>

                            <p className="text-[#2c221e]/70 text-xs md:text-sm leading-relaxed">
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