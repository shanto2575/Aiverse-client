import PromptModerationTable from "@/components/Dashboard/admin/PromptModerationTable";
import { adminPrompts } from "@/lib/admin/data";

const AdminModerationPage = async () => {
    const data = await adminPrompts();

    return (
        <div>
            <div className="p-6 border-b border-[#dfcbaf]">
                <h2 className="text-3xl font-bold text-[#2c221e]">
                    Prompt Template Submissions Moderation
                </h2>
                <p className="text-[#2c221e]/70 mt-2 text-sm">
                    Approve templates, reject with feedback, or tag featured highlights.
                </p>
            </div>
            <section className="w-full min-h-screen py-3">
                <PromptModerationTable prompts={data.prompts} />
            </section>
        </div>
    );
};

export default AdminModerationPage;