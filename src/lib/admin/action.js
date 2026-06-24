import { showToast } from "@/components/Utility/toast";
import { baseUrl } from "../baseUrl";

export const handleApprove = async (id, setPromptList) => {
    const res = await fetch(`${baseUrl}/api/admin/prompts/${id}/approve`, {
        method: "PATCH",
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
        setPromptList((prev) =>
            prev.map((prompt) =>
                prompt._id === id
                    ? { ...prompt, status: "approved" }
                    : prompt
            )
        );

        showToast.success("Prompt approved successfully");
    }
};

export const handleReject = async (id, setPromptList) => {
    const res = await fetch(`${baseUrl}/api/admin/prompts/${id}/reject`, {
        method: "PATCH",
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
        setPromptList((prev) =>
            prev.map((prompt) =>
                prompt._id === id
                    ? { ...prompt, status: "rejected" }
                    : prompt
            )
        );

        showToast.error("Prompt rejected successfully");
    }
};
export const handleDelete = async (id, setPromptList) => {
    const res = await fetch(`${baseUrl}/api/admin/prompts/${id}`, {
        method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
        setPromptList((prev) =>
            prev.filter((prompt) => prompt._id !== id)
        );

        showToast.success("Prompt deleted successfully");
    }
};