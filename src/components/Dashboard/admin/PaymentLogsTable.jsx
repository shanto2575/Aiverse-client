"use client";

import { Calendar, User } from "lucide-react";

const PaymentLogsTable = ({ payments = [] }) => {
    return (
        <div className="w-full rounded-2xl border border-[#dfcbaf] bg-[#f5ebd7]/60 shadow-md backdrop-blur-sm overflow-hidden">
            
            {/* 1. Desktop & Tablet View (Large Screens) */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left table-auto min-w-[900px]">
                    <thead className="border-b border-[#dfcbaf] text-[#2c221e]/60 text-sm uppercase tracking-wider bg-[#2c221e]/5">
                        <tr>
                            <th className="p-5 font-semibold">Transaction ID</th>
                            <th className="p-5 font-semibold">Purchaser Details</th>
                            <th className="p-5 font-semibold">Billing Email</th>
                            <th className="p-5 font-semibold">Amount Charged</th>
                            <th className="p-5 font-semibold">Payment Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment) => (
                            <tr
                                key={payment._id}
                                className="border-b border-[#dfcbaf] hover:bg-[#ebdcc9]/50 transition duration-200"
                            >
                                {/* Transaction ID */}
                                <td className="p-5 text-[#78541c] font-semibold text-sm break-all">
                                    {payment.sessionId}
                                </td>

                                {/* Purchaser */}
                                <td className="p-5">
                                    <div className="flex items-center gap-2">
                                        <User size={14} className="text-[#2c221e]/60" />
                                        <div>
                                            <p className="text-[#2c221e] font-medium">
                                                {payment.userName}
                                            </p>
                                            <p className="text-xs text-[#2c221e]/50">
                                                ID: {payment.userId}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="p-5 text-[#2c221e]/80">
                                    {payment.userEmail}
                                </td>

                                {/* Amount */}
                                <td className="p-5 text-[#344a32] font-bold">
                                    ${payment.Amouts?.toFixed(2)}
                                </td>

                                {/* Date */}
                                <td className="p-5 text-[#2c221e]/70 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-[#2c221e]/50" />
                                        {new Date(payment.date).toLocaleString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 2. Mobile View (Card-based Layout for Small Screens) */}
            <div className="block md:hidden divide-y divide-[#dfcbaf]">
                {payments.map((payment) => (
                    <div key={payment._id} className="p-4 flex flex-col gap-3 hover:bg-[#ebdcc9]/30 transition">
                        
                        {/* Header: Amount & Date */}
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[#344a32] font-black text-base">
                                ${payment.Amouts?.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-[#2c221e]/70">
                                <Calendar size={13} className="text-[#2c221e]/50" />
                                <span>{new Date(payment.date).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Transaction ID */}
                        <div className="text-xs">
                            <span className="font-semibold text-[#2c221e]/60 block mb-0.5">TXID:</span>
                            <span className="text-[#78541c] font-medium break-all selection:bg-[#78541c]/20">
                                {payment.sessionId}
                            </span>
                        </div>

                        {/* Purchaser Details */}
                        <div className="flex items-start gap-2 pt-1">
                            <User size={15} className="text-[#2c221e]/60 mt-0.5 shrink-0" />
                            <div className="text-xs">
                                <p className="text-[#2c221e] font-semibold">
                                    {payment.userName}
                                </p>
                                <p className="text-[#2c221e]/50 mt-0.5 break-all">
                                    UID: {payment.userId}
                                </p>
                            </div>
                        </div>

                        {/* Billing Email */}
                        <div className="text-xs pt-1 border-t border-[#dfcbaf]/40">
                            <span className="font-semibold text-[#2c221e]/60">Billing Email:</span>{" "}
                            <span className="text-[#2c221e]/80 break-all">{payment.userEmail}</span>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default PaymentLogsTable;