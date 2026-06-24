"use client";

import Image from "next/image";
import { Calendar, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { baseUrl } from "@/lib/baseUrl";
import { UserDeleteButton } from "./UserDeleteButton";
import { showToast } from "@/components/Utility/toast";

const UserManagementTable = ({ users = [] }) => {

    const [userList, setUserList] = useState(users);

    const handleRoleChange = async (id, newRole) => {
        const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: newRole }),
        });

        const data = await res.json();

        if (data.modifiedCount > 0) {
            setUserList((prev) =>
                prev.map((user) =>
                    user._id === id
                        ? { ...user, role: newRole }
                        : user
                )
            );

            showToast.success("Role updated successfully");
        }
    };

    return (
        <div className="w-full rounded-2xl border border-[#dfcbaf] bg-white/10 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#dfcbaf]">
                <h2 className="text-3xl font-bold text-[#2c221e]">
                    User Role & Accounts Management
                </h2>
                <p className="text-[#2c221e]/70 mt-2 text-sm">
                    Review accounts, modify role scopes, and delete users.
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-[#dfcbaf] text-[#2c221e]/70 text-sm uppercase">
                        <tr>
                            <th className="p-5">Profile Details</th>
                            <th className="p-5">Email Address</th>
                            <th className="p-5">Subscription</th>
                            <th className="p-5">Role Level</th>
                            <th className="p-5">Registered Date</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-b border-[#dfcbaf] hover:bg-[#ebdcc9]/40 transition"
                            >
                                {/* Profile */}
                                <td className="p-5">
                                    <div className="flex items-center gap-3">
                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-[#2c221e] flex items-center justify-center text-white font-bold">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="font-semibold text-[#2c221e]">
                                            {user.name}
                                        </span>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="p-5 text-[#2c221e]/90">{user.email}</td>

                                {/* Subscription */}
                                <td className="p-5">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-black tracking-wider border ${user.plan === "premium" || user.plan === "pro"
                                                ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.3)] "
                                                : "bg-[#2c221e]/5 text-[#2c221e]/60 border-[#2c221e]/15 font-bold"
                                            }`}
                                    >
                                        {user.plan?.toUpperCase()}
                                    </span>
                                </td>

                                {/* Role */}
                                <td className="p-5">
                                    <select
                                        defaultValue={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="bg-[#ebdcc9]/30 border border-[#dfcbaf] text-[#2c221e] rounded-lg px-4 py-2 focus:outline-none"
                                    >
                                        <option value="user">User</option>
                                        <option value="creator">Creator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>

                                {/* Date */}
                                <td className="p-5 text-[#2c221e]/70">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={15} />
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="p-5 text-right">
                                    <UserDeleteButton
                                        userId={user._id}
                                        setUserList={setUserList}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagementTable;