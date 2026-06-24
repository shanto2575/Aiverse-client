"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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
    Home,
    Menu,
    X,
} from "lucide-react";

export default function DashboardSideBar() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (isPending) return null;

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
            { icon: User, label: "My Profile", link: "/dashboard/admin" },
            { icon: BarChart3, label: "Admin Analytics", link: "/dashboard/admin/analytics" },
            { icon: Users, label: "All Users", link: "/dashboard/admin/all-users" },
            { icon: BookOpen, label: "All Prompts", link: "/dashboard/admin/all-prompts" },
            { icon: CreditCard, label: "All Payments", link: "/dashboard/admin/all-payments" },
            { icon: AlertTriangle, label: "Reported Prompts", link: "/dashboard/admin/reported-prompts" },
        ],
    };

    const navItems = dashboardItems[role] || [];

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 flex items-center gap-2 bg-[#2c221e] text-[#ebdcc9] px-4 py-2 rounded-full shadow-lg"
            >
                <Menu size={18} />
                <span>Menu</span>
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-[#ebdcc9] z-50 transform transition-transform duration-300 lg:hidden
                ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#dfcbaf]">
                    <h2 className="font-black text-xl uppercase">AIverse</h2>
                    <button onClick={() => setOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-[calc(100%-70px)] p-4">
                    <div>
                        {/* User */}
                        <div className="mb-6 bg-white/30 rounded-xl p-3">
                            <p className="truncate font-semibold text-sm">
                                {user?.email || "anonymous@aiverse.com"}
                            </p>
                            <span className="uppercase text-[10px] bg-[#2c221e] text-[#ebdcc9] px-2 py-1 rounded mt-2 inline-block">
                                {role}
                            </span>
                        </div>

                        {/* Nav */}
                        <div className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.link;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.link}
                                        onClick={() => setOpen(false)}
                                    >
                                        <div
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                            ${isActive
                                                    ? "bg-[#2c221e] text-[#ebdcc9]"
                                                    : "hover:bg-black/5"
                                                }`}
                                        >
                                            <item.icon size={18} />
                                            <span>{item.label}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-[#dfcbaf] pt-4 mb-4 space-y-3">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 text-sm border border-[#cdbb9d] px-4 py-3 rounded-xl hover:bg-white/30 transition"
                        >
                            <Home size={16} />
                            Back to Site
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 text-sm text-red-600 border border-red-300 px-4 py-3 rounded-xl hover:bg-red-50 transition"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col h-screen w-64 justify-between bg-[#ebdcc9]/30 border-r border-[#dfcbaf] p-4">

                <div>
                    {/* Brand */}
                    <div className="mb-6">
                        <Link href="/">
                            <h2 className="font-black text-2xl uppercase tracking-wider">
                                AIverse
                            </h2>
                        </Link>

                        <div className="mt-4 bg-white/30 rounded-xl p-3 text-sm">
                            <p className="truncate font-semibold">
                                {user?.email || "anonymous@aiverse.com"}
                            </p>
                            <span className="uppercase text-[10px] bg-[#2c221e] text-[#ebdcc9] px-2 py-1 rounded mt-2 inline-block">
                                {role}
                            </span>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.link;

                            return (
                                <Link key={item.label} href={item.link}>
                                    <div
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                            ${isActive
                                                ? "bg-[#463f3d] text-[#ebdcc9]"
                                                : "hover:bg-black/5"
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom */}
                <div className="border-t border-[#dfcbaf] pt-4 mb-24 space-y-6">
                    <Link href="/" className="flex items-center gap-2 text-sm border border-[#cdbb9d] px-4 py-3 rounded-xl hover:bg-white/30 transition">
                        <Home size={16} />
                        Back to Site
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-sm text-red-600 border border-red-300 px-4 py-3 rounded-xl hover:bg-red-50 transition"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}