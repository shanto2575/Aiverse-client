import { baseUrl } from "../baseUrl";

export const adminAnalytics = async () => {
    const res = await fetch(`${baseUrl}/api/admin/analytics`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch admin analytics");
    }

    return res.json();
};
export const AllUser = async () => {
    const res = await fetch(`${baseUrl}/api/admin/users`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch admin analytics");
    }

    return res.json();
};


export const adminPrompts = async () => {
    const res = await fetch(`${baseUrl}/api/admin/prompts`, {
        cache: "no-store",
    });

    return res.json();
};


export const getAdminPayments = async () => {
    const res = await fetch(`${baseUrl}/api/admin/payments`, {
        cache: "no-store",
    });

    return res.json();
};


export const getAdminReports = async () => {
    const res = await fetch(`${baseUrl}/api/admin/reports`, {
        cache: "no-store",
    });

    return res.json();
};