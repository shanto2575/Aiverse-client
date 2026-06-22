"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

import {
    LayoutDashboard,
    PlusCircle,
    BookOpen,
    Bookmark,
    MessageSquare,
    User,
    Users,
    CreditCard,
    AlertTriangle,
    BarChart3,
    LogOut,
    Home
} from "lucide-react";

export default function DashboardSideBar() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (isPending) return <div className="p-4 text-sm"></div>;
    const user = session?.user;
    const role = user?.role || "user";

    const dashboardItems = {
        user: [
            { icon: User, label: "Profile", link: "/dashboard/user/profile" },
            { icon: PlusCircle, label: "Add Prompt", link: "/dashboard/user/add-prompt" },
            { icon: BookOpen, label: "My Prompts", link: "/dashboard/user/my-prompts" },
            { icon: Bookmark, label: "Saved Prompts", link: "/dashboard/user/saved-prompts" },
            { icon: MessageSquare, label: "My Reviews", link: "/dashboard/user/my-reviews" },
        ],
        creator: [
            { icon: User, label: "Profile", link: "/dashboard/creator/profile" },
            { icon: LayoutDashboard, label: "Creator Home", link: "/dashboard/creator" },
            { icon: PlusCircle, label: "Add Prompt", link: "/dashboard/creator/add-prompt" },
            { icon: BookOpen, label: "My Prompts", link: "/dashboard/creator/my-prompts" },
        ],
        admin: [
            { icon: User, label: "Profile", link: "/dashboard/admin/profile" },
            { icon: Users, label: "All Users", link: "/dashboard/admin/all-users" },
            { icon: BookOpen, label: "All Prompts", link: "/dashboard/admin/all-prompts" },
            { icon: CreditCard, label: "All Payments", link: "/dashboard/admin/all-payments" },
            { icon: AlertTriangle, label: "Reported Prompts", link: "/dashboard/admin/reported-prompts" },
            { icon: BarChart3, label: "Analytics", link: "/dashboard/admin/analytics" },
        ],
    };

    const navItems = dashboardItems[role] || [];

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <>
            {/* Mobile Trigger */}
            <Button
                className="lg:hidden fixed top-4 left-4 z-50 bg-[#2c221e] text-[#ebdcc9]"
                variant="flat"
                onClick={() => setOpen(true)}
            >
                <Bars />
                <span>Menu</span>
            </Button>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex flex-col h-full justify-between text-[#2c221e] bg-[#ebdcc9]/30 border-r border-[#dfcbaf]/50 w-64 min-h-screen p-4">

                <div className="space-y-6">

                    {/* Brand */}
                    <div className="p-2 space-y-3">
                        <Link href="/">
                            <h2 className="font-black text-2xl uppercase tracking-wider">
                                AIverse
                            </h2>
                        </Link>

                        <div className="text-xs font-medium bg-[#ebdcc9]/50 border border-[#dfcbaf]/40 p-3 rounded-xl">
                            <p className="truncate font-semibold">
                                {user?.email || "anonymous@alverse.com"}
                            </p>
                            <span className="uppercase text-[10px] bg-[#2c221e] text-[#ebdcc9] px-2 py-0.5 rounded">
                                {role}
                            </span>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link key={item.label} href={item.link}>
                                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm hover:bg-black/5">
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </button>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom */}
                <div className="space-y-2 border-t pt-3">

                    <Link href="/" className="flex gap-2 items-center text-sm">
                        <Home size={16} />
                        Back to Site
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex gap-2 items-center text-sm text-red-600"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Mobile Drawer (SAFE VERSION) */}
            <Drawer open={open} onOpenChange={setOpen}>
                <Drawer.Content className="w-72 bg-[#ebdcc9]">

                    <div className="p-4 border-b font-bold">
                        AIverse Menu
                    </div>

                    <div className="p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link key={item.label} href={item.link} onClick={() => setOpen(false)}>
                                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/5">
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </button>
                            </Link>
                        ))}
                    </div>

                </Drawer.Content>
            </Drawer>
        </>
    );
}