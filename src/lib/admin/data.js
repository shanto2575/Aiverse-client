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