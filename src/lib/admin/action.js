'use client'
import { showToast } from "@/components/Utility/toast";
import { baseUrl } from "../baseUrl";
import { authClient } from "../auth-client";

export const handleApprove = async (id, setPromptList) => {
    const tokenData = await authClient.token();

    const token = tokenData?.data?.token;
    const res = await fetch(`${baseUrl}/api/admin/prompts/${id}/approve`, {
        method: "PATCH",
        headers:{
            authorization:`Bearer ${token}`
        }
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
    const tokenData = await authClient.token();

    const token = tokenData?.data?.token;
    const res = await fetch(`${baseUrl}/api/admin/prompts/${id}/reject`, {
        method: "PATCH",
        headers:{
            authorization:`Bearer ${token}`
        }
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
    const tokenData = await authClient.token();

    const token = tokenData?.data?.token;
    // console.log(token,'bbb')
    const res = await fetch(`${baseUrl}/api/admin/prompts/${id}`, {
        method: "DELETE",
        headers:{
            authorization:`Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
        setPromptList((prev) =>
            prev.filter((prompt) => prompt._id !== id)
        );
        showToast.success("Prompt deleted successfully");
    }
};



export const handleDismissReport = async (id, setReports) => {
    const tokenData = await authClient.token();

    const token = tokenData?.data?.token;
    const res = await fetch(`${baseUrl}/api/admin/reports/${id}`, {
        method: "DELETE",
        headers:{
            authorization:`Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
        setReports((prev) =>
            prev.filter((report) => report._id !== id)
        );

        showToast.success("Report dismissed");
    }
};

export const handleRemovePrompt = async (id, setReports) => {
    const tokenData = await authClient.token();

    const token = tokenData?.data?.token;
    const res = await fetch(
        `${baseUrl}/api/admin/reports/${id}/remove-prompt`,
        {
            method: "DELETE",
            headers:{
            authorization:`Bearer ${token}`
        }
        }
    );

    const data = await res.json();

    if (data.success) {
        setReports((prev) =>
            prev.filter((report) => report._id !== id)
        );

        showToast.success("Prompt removed successfully");
    }
};
export const handleWarnCreator = async (id, setReports) => {
    const tokenData = await authClient.token();

    const token = tokenData?.data?.token;
    const res = await fetch(
        `${baseUrl}/api/admin/reports/${id}/remove-prompt`,
        {
            method: "DELETE",
            headers:{
            authorization:`Bearer ${token}`
        }
        }
    );

    const data = await res.json();

    if (data.success) {
        setReports((prev) =>
            prev.filter((report) => report._id !== id)
        );

        showToast.success("Warn Creator successfully");
    }
};