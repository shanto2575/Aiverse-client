"use client";

import React from "react";
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
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const role = user?.role || "user";

    // Strict Routing Matrix as per defined requirements
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
        <Drawer>
            {/* Mobile Sidebar Trigger Toggle */}
            <Button className="lg:hidden fixed top-4 left-4 z-50 bg-[#2c221e] text-[#ebdcc9]" variant="flat">
                <Bars />
                <span>Menu</span>
            </Button>

            {/* Modern Desktop Sidebar Box */}
            <div className="flex flex-col h-full justify-between text-[#2c221e] bg-[#ebdcc9]/30 border-r border-[#dfcbaf]/50 w-64 min-h-screen p-4 hidden lg:flex">
                <div className="space-y-6">

                    {/* Top Brand & Context Layer */}
                    <div className="p-2 space-y-3">
                        <Link href="/">
                            <h2 className="font-black text-2xl uppercase tracking-wider bg-gradient-to-r from-[#2c221e] via-[#4a3b35] to-[#2c221e] bg-clip-text text-transparent">
                                AIverse
                            </h2>
                        </Link>

                        {/* Logged in User Meta Info Card */}
                        <div className="text-xs font-medium text-[#2c221e]/60 space-y-1 bg-[#ebdcc9]/50 border border-[#dfcbaf]/40 p-3 rounded-xl shadow-sm">
                            <p className="truncate font-semibold text-[#2c221e]">{user?.email || "anonymous@alverse.com"}</p>
                            <span className="uppercase tracking-widest text-[9px] bg-[#2c221e] text-[#ebdcc9] px-2 py-0.5 rounded-md inline-block font-bold">
                                {role}
                            </span>
                        </div>
                    </div>

                    {/* Core Dynamic Navigation Routes Mapping */}
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link key={item.label} href={item.link}>
                                <button
                                    className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#2c221e]/80 transition-all duration-200 hover:text-[#2c221e] hover:bg-[#2c221e]/5 group"
                                    type="button"
                                >
                                    <item.icon className="size-4.5 text-[#2c221e]/50 group-hover:text-[#2c221e] transition-colors duration-200" />
                                    <span>{item.label}</span>
                                </button>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Global Bottom Actions Container */}
                <div className="px-1 py-4 border-t border-[#dfcbaf]/60 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#2c221e]/70 hover:text-[#2c221e] hover:bg-[#2c221e]/5 transition-all duration-200 group"
                    >
                        <span className="w-8 h-8 rounded-lg bg-[#2c221e]/5 flex items-center justify-center text-[#2c221e]/60 group-hover:bg-[#2c221e] group-hover:text-[#ebdcc9] transition-all duration-200 border border-[#dfcbaf]/30">
                            <Home size={14} />
                        </span>
                        <span>Back to Site</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-[#2c221e]/70 hover:text-red-700 hover:bg-red-500/10 transition-all duration-200 cursor-pointer group"
                    >
                        <span className="w-8 h-8 rounded-lg bg-[#2c221e]/5 flex items-center justify-center text-[#2c221e]/60 group-hover:bg-red-600 group-hover:text-[#ebdcc9] transition-all duration-200 border border-[#dfcbaf]/30">
                            <LogOut size={14} />
                        </span>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Navigation Context */}
            <Drawer.Backdrop>
                <Drawer.Content placement="left" className="bg-[#ebdcc9] w-72">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header className="border-b border-[#dfcbaf]/60">
                            <Drawer.Heading className="text-[#2c221e] font-bold uppercase tracking-wide">Alverse Menu</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body className="py-4">
                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <Link key={item.label} href={item.link}>
                                        <button
                                            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#2c221e]/80 hover:bg-[#2c221e]/5 transition-colors"
                                            type="button"
                                        >
                                            <item.icon className="size-4.5 text-[#2c221e]/50" />
                                            <span>{item.label}</span>
                                        </button>
                                    </Link>
                                ))}
                            </nav>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}