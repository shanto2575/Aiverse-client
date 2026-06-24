"use client";

import { Calendar, User } from "lucide-react";

const PaymentLogsTable = ({ payments = [] }) => {
    return (
        <div className="w-full rounded-2xl border border-[#dfcbaf] bg-[#f5ebd7]/60 shadow-md backdrop-blur-sm overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
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
                                {/* Transaction ID - নিয়ন সায়ানের বদলে একটি ক্লাসি কফি-অ্যাম্বার টোন */}
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
        </div>
    );
};

export default PaymentLogsTable;