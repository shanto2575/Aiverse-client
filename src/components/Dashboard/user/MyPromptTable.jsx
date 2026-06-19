import React from 'react'
import { Table } from "@heroui/react";
import { Eye, Pencil, Trash2, Lock, Globe } from 'lucide-react';
import MyPromptsEditsButton from './MyPromptsEditsButton';
import { MyPromptsDeleteButton } from './MyPromptsDeleteButton';
import Link from 'next/link';

const MyPromptTable = ({ prompts = [] }) => {
    const safePrompts = Array.isArray(prompts) ? prompts : [];
    // console.log(safePrompts)

    return (
        <div className="w-full rounded-2xl border border-[#dfcbaf] bg-[#ebdcc9] p-2 shadow-xl shadow-[#2c221e]/5 transition-all duration-300">

            <div className="p-6 bg-[#ebdcc9] rounded-t-2xl">
                <h2 className="text-2xl font-extrabold text-[#2c221e] tracking-tight sm:text-3xl">
                    My Prompt Templates
                </h2>
                <p className="text-xs sm:text-sm text-[#2c221e]/70 mt-1.5 font-medium">
                    Review approval statuses, change details, and check analytics.
                </p>
            </div>

            <Table variant='secondary'>
                <Table.ScrollContainer>
                    <Table.Content className="min-w-[700px] bg-transparent">
                        <Table.Header>
                            <Table.Column isRowHeader>TITLE</Table.Column>
                            <Table.Column>AI ENGINE</Table.Column>
                            <Table.Column>VISIBILITY</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>COPIES</Table.Column>
                            <Table.Column>RATING</Table.Column>
                            <Table.Column className="text-right">ACTIONS</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {safePrompts.map(item => (
                                <Table.Row key={item._id}>
                                    <Table.Cell>
                                        <div className="flex flex-col max-w-[280px]">
                                            <span className="font-bold text-[#2c221e] text-sm group-hover:text-[#4a3b35] transition-colors duration-150 line-clamp-1">
                                                {item.title}
                                            </span>
                                            <span className="text-[11px] text-[#2c221e]/50 mt-1 font-semibold tracking-wide">
                                                {item.category || "General"}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider bg-[#2c221e]/5 text-[#2c221e] border border-[#dfcbaf] uppercase shadow-sm">
                                            {item.aiEngine || "OTHER"}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2 text-[#2c221e]/80 text-xs font-bold uppercase tracking-wide">
                                            {item.visibility?.toLowerCase() === 'private' ? (
                                                <><Lock size={12} className="text-[#2c221e]/50" /> Private</>
                                            ) : (
                                                <><Globe size={12} className="text-[#2c221e]/50" /> Public</>
                                            )}
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider border uppercase shadow-xs ${item.status?.toLowerCase() === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status?.toLowerCase() === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                            {item.status || "PENDING"}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell className="text-sm font-bold text-[#2c221e]/90">
                                        {item.copies ?? 0}
                                    </Table.Cell>

                                    <Table.Cell className="text-sm font-bold text-[#2c221e]/90">
                                        <div className="flex items-center gap-1">
                                            <span className="text-amber-500 text-base">★</span>
                                            <span>{item.rating ? Number(item.rating).toFixed(1) : "0.0"}</span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Details Button */}
                                            <button className="p-2 bg-[#2c221e] hover:bg-[#4a3b35] text-[#ebdcc9] rounded-xl transition-all duration-200 shadow-sm active:scale-95" title="Details">
                                                <Eye size={14} />
                                            </button>

                                            <MyPromptsEditsButton item={item} />

                                            {/* Delete Button */}
                                            <MyPromptsDeleteButton  item={item}/>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    )
}

export default MyPromptTable;