import React from 'react'
import { Table } from "@heroui/react";
import { Eye, Lock, Globe } from 'lucide-react';
import MyPromptsEditsButton from './MyPromptsEditsButton';
import { MyPromptsDeleteButton } from './MyPromptsDeleteButton';
import Link from 'next/link';

const MyPromptTable = ({ prompts = [] }) => {
    const safePrompts = Array.isArray(prompts) ? prompts : [];

    return (
        <>
            <div className="p-4 sm:p-6 bg-[#ebdcc9] rounded-t-2xl">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2c221e] tracking-tight">
                    My Prompt Templates
                </h2>
                <p className="text-xs sm:text-sm text-[#2c221e]/70 mt-1.5 font-medium">
                    Review approval statuses, change details, and check analytics.
                </p>
            </div>

            <div className="w-full rounded-b-2xl border border-[#dfcbaf] bg-[#ebdcc9] shadow-xl shadow-[#2c221e]/5 overflow-hidden">

                {safePrompts.length > 0 ? (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <Table
                                variant="secondary"
                                className="min-w-full"
                            >
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
                                                    <Table.Cell>
                                                        <div className="flex flex-col max-w-[280px]">
                                                            <span className="font-bold text-[#2c221e] text-sm truncate">
                                                                {item.title}
                                                            </span>
                                                            <span className="text-[11px] text-[#2c221e]/50 mt-1 font-semibold tracking-wide">
                                                                {item.category || "General"}
                                                            </span>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider bg-[#2c221e]/5 text-[#2c221e] border border-[#dfcbaf] uppercase">
                                                            {item.aiEngine || "OTHER"}
                                                        </span>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex items-center gap-2 text-[#2c221e]/80 text-xs font-bold uppercase">
                                                            {item.visibility?.toLowerCase() ===
                                                                "private" ? (
                                                                <>
                                                                    <Lock
                                                                        size={12}
                                                                        className="text-[#2c221e]/50"
                                                                    />
                                                                    Private
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Globe
                                                                        size={12}
                                                                        className="text-[#2c221e]/50"
                                                                    />
                                                                    Public
                                                                </>
                                                            )}
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider border uppercase ${
                                                                item.status?.toLowerCase() ===
                                                                    "approved"
                                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                                    : item.status?.toLowerCase() ===
                                                                        "rejected"
                                                                        ? "bg-red-50 text-red-700 border-red-200"
                                                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                                    item.status?.toLowerCase() ===
                                                                        "approved"
                                                                        ? "bg-emerald-500"
                                                                        : item.status?.toLowerCase() ===
                                                                            "rejected"
                                                                            ? "bg-red-500"
                                                                            : "bg-amber-500"
                                                                    }`}
                                                            />
                                                            {item.status || "PENDING"}
                                                        </span>
                                                    </Table.Cell>

                                                    <Table.Cell className="font-bold">
                                                        {item.copies ?? 0}
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-amber-500">
                                                                ★
                                                            </span>
                                                            <span className="font-bold">
                                                                {item.rating
                                                                    ? Number(
                                                                        item.rating
                                                                    ).toFixed(1)
                                                                    : "0.0"}
                                                            </span>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                href={`/all-prompts/${item._id}`}
                                                            >
                                                                <button
                                                                    className="p-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] rounded-xl transition-all"
                                                                    title="Details"
                                                                >
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

                        {/* Mobile & Tablet Cards */}
                        <div className="lg:hidden p-4 space-y-4">
                            {safePrompts.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white/40 border border-[#dfcbaf] rounded-2xl p-4 space-y-4"
                                >
                                    <div>
                                        <h3 className="font-bold text-[#2c221e] text-base line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs text-[#2c221e]/60 mt-1">
                                            {item.category || "General"}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-[#2c221e]/50 text-xs mb-1">
                                                AI Engine
                                            </p>
                                            <span className="font-semibold capitalize">
                                                {item.aiEngine}
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-[#2c221e]/50 text-xs mb-1">
                                                Visibility
                                            </p>
                                            <span className="font-semibold capitalize">
                                                {item.visibility}
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-[#2c221e]/50 text-xs mb-1">
                                                Copies
                                            </p>
                                            <span className="font-semibold">
                                                {item.copies ?? 0}
                                            </span>
                                        </div>

                                        <div>
                                            <p className="text-[#2c221e]/50 text-xs mb-1">
                                                Rating
                                            </p>
                                            <span className="font-semibold">
                                                ⭐{" "}
                                                {item.rating
                                                    ? Number(
                                                        item.rating
                                                    ).toFixed(1)
                                                    : "0.0"}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider border uppercase ${
                                                item.status?.toLowerCase() ===
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

                                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#dfcbaf]">
                                        <Link
                                            href={`/all-prompts/${item._id}`}
                                        >
                                            <button
                                                className="p-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] rounded-xl"
                                                title="Details"
                                            >
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
                    <div className="flex items-center justify-center py-12 sm:py-16 px-4 text-center">
                        <p className="text-xl sm:text-3xl font-semibold text-[#2c221e]/60">
                            No prompt templates found.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyPromptTable;