import React from "react";
import { Table } from "@heroui/react";
import { Eye, Lock, Globe, Terminal } from "lucide-react";
import MyPromptsEditsButton from "./MyPromptsEditsButton";
import { MyPromptsDeleteButton } from "./MyPromptsDeleteButton";
import Link from "next/link";

const MyPromptTable = ({ prompts = [] }) => {
    const safePrompts = Array.isArray(prompts) ? prompts : [];

    return (
        <div className="w-full border border-[#dfcbaf] bg-[#ebdcc9] rounded-2xl overflow-hidden shadow-xl shadow-[#2c221e]/5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 my-3">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#2c221e]">
                        <h2 className="text-4xl font-black tracking-tight sm:text-2xl">
                            My Prompt Workspace
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-[#2c221e]/60">
                        Manage, monitor, and deploy your custom-engineered AI prompt configurations.
                    </p>
                </div>

                <div className="self-start sm:self-center px-3 py-1.5 rounded-xl border border-[#dfcbaf] bg-[#ebdcc9]/40 text-xs font-bold text-[#2c221e]/80 shadow-sm whitespace-nowrap">
                    Total: <span className="text-[#78541c] font-black">{safePrompts.length}</span> Matrix
                </div>
            </div>

            {/* DESKTOP TABLE */}
            {safePrompts.length > 0 ? (
                <>
                    <div className="hidden lg:block overflow-x-auto">
                        <Table variant="secondary" className="min-w-full">
                            <Table.ScrollContainer>
                                <Table.Content className="bg-transparent">
                                    <Table.Header>
                                        <Table.Column isRowHeader>TITLE</Table.Column>
                                        <Table.Column>AI ENGINE</Table.Column>
                                        <Table.Column>VISIBILITY</Table.Column>
                                        <Table.Column>STATUS</Table.Column>
                                        <Table.Column>COPIES</Table.Column>
                                        <Table.Column>RATING</Table.Column>
                                        <Table.Column className="text-right">
                                            ACTIONS
                                        </Table.Column>
                                    </Table.Header>

                                    <Table.Body>
                                        {safePrompts.map((item) => (
                                            <Table.Row
                                                key={item._id}
                                                className="border-b border-[#dfcbaf]/30 last:border-0"
                                            >
                                                {/* TITLE */}
                                                <Table.Cell>
                                                    <div className="flex flex-col max-w-[260px]">
                                                        <span className="font-bold text-[#2c221e] text-sm truncate">
                                                            {item.title}
                                                        </span>
                                                        <span className="text-[11px] text-[#2c221e]/50 mt-1 font-semibold">
                                                            {item.category || "General"}
                                                        </span>
                                                    </div>
                                                </Table.Cell>

                                                {/* AI */}
                                                <Table.Cell>
                                                    <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase border border-[#dfcbaf] bg-[#2c221e]/5">
                                                        {item.aiEngine || "OTHER"}
                                                    </span>
                                                </Table.Cell>

                                                {/* VISIBILITY */}
                                                <Table.Cell>
                                                    <div className="flex items-center gap-2 text-xs font-bold uppercase">
                                                        {item.visibility?.toLowerCase() ===
                                                            "private" ? (
                                                            <>
                                                                <Lock size={12} />
                                                                Private
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Globe size={12} />
                                                                Public
                                                            </>
                                                        )}
                                                    </div>
                                                </Table.Cell>

                                                {/* STATUS */}
                                                <Table.Cell>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${item.status?.toLowerCase() ===
                                                            "approved"
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                            : item.status?.toLowerCase() ===
                                                                "rejected"
                                                                ? "bg-red-50 text-red-700 border-red-200"
                                                                : "bg-amber-50 text-amber-700 border-amber-200"
                                                            }`}
                                                    >
                                                        {item.status || "PENDING"}
                                                    </span>
                                                </Table.Cell>

                                                {/* COPIES */}
                                                <Table.Cell className="font-bold">
                                                    {item.copies ?? 0}
                                                </Table.Cell>

                                                {/* RATING */}
                                                <Table.Cell>
                                                    <div className="flex items-center gap-1 font-bold">
                                                        <span className="text-amber-500">
                                                            ★
                                                        </span>
                                                        {item.rating
                                                            ? Number(
                                                                item.rating
                                                            ).toFixed(1)
                                                            : "0.0"}
                                                    </div>
                                                </Table.Cell>

                                                {/* ACTIONS */}
                                                <Table.Cell>
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={`/all-prompts/${item._id}`}
                                                        >
                                                            <button className="p-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] rounded-xl transition">
                                                                <Eye size={14} />
                                                            </button>
                                                        </Link>

                                                        <MyPromptsEditsButton
                                                            item={item}
                                                        />
                                                        <MyPromptsDeleteButton
                                                            item={item}
                                                        />
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>

                    {/* MOBILE CARDS */}
                    <div className="lg:hidden p-4 space-y-4">
                        {safePrompts.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white/40 border border-[#dfcbaf] rounded-2xl p-4 shadow-sm"
                            >
                                {/* TITLE */}
                                <div>
                                    <h3 className="font-bold text-base text-[#2c221e] line-clamp-2">
                                        {item.title}
                                    </h3>

                                    <p className="text-xs text-[#2c221e]/60 mt-1">
                                        {item.category || "General"}
                                    </p>
                                </div>

                                {/* INFO GRID */}
                                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                    <div>
                                        <p className="text-xs text-[#2c221e]/50">
                                            AI Engine
                                        </p>
                                        <p className="font-semibold capitalize">
                                            {item.aiEngine}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-[#2c221e]/50">
                                            Visibility
                                        </p>
                                        <p className="font-semibold capitalize">
                                            {item.visibility}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-[#2c221e]/50">
                                            Copies
                                        </p>
                                        <p className="font-semibold">
                                            {item.copies ?? 0}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-[#2c221e]/50">
                                            Rating
                                        </p>
                                        <p className="font-semibold">
                                            ⭐{" "}
                                            {item.rating
                                                ? Number(item.rating).toFixed(1)
                                                : "0.0"}
                                        </p>
                                    </div>
                                </div>

                                {/* STATUS */}
                                <div className="mt-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${item.status?.toLowerCase() ===
                                            "approved"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            : item.status?.toLowerCase() ===
                                                "rejected"
                                                ? "bg-red-50 text-red-700 border-red-200"
                                                : "bg-amber-50 text-amber-700 border-amber-200"
                                            }`}
                                    >
                                        {item.status || "PENDING"}
                                    </span>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-[#dfcbaf]">
                                    <Link href={`/all-prompts/${item._id}`}>
                                        <button className="p-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] rounded-xl">
                                            <Eye size={14} />
                                        </button>
                                    </Link>

                                    <MyPromptsEditsButton item={item} />
                                    <MyPromptsDeleteButton item={item} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* EMPTY STATE */
                <div className="w-full min-h-[350px] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
                    <div className="absolute -top-20 -left-20 w-44 h-44 bg-[#78541c]/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-[#bfa054]/5 rounded-full blur-3xl" />

                    <div className="p-5 rounded-full bg-[#78541c]/10 text-[#78541c] animate-pulse mb-5">
                        <Eye className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#2c221e]">
                        No Prompt Templates Found
                    </h3>

                    <p className="text-sm text-[#2c221e]/60 mt-2 max-w-md leading-relaxed">
                        You haven’t created any prompt templates yet. Start
                        building your first AI prompt and it’ll appear here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyPromptTable;