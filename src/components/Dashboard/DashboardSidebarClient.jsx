"use client";

import dynamic from "next/dynamic";

const DashboardSideBar = dynamic(
    () => import("@/components/dashboard/DashboardSideBar"),
    { ssr: false }
);

export default function DashboardSidebarClient() {
    return <DashboardSideBar />;
}