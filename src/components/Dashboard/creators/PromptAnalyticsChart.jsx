"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from "recharts";
import { Copy } from "lucide-react";

const PromptAnalyticsChart = ({ prompts = [] }) => {
    const chartData = prompts.map((item) => ({
        name: item.title.length > 15
            ? item.title.slice(0, 15) + "..."
            : item.title,
        copies: item.copies || 0,
        bookmarks: item.bookmarks || 0,
    }));

    return (
        <div className="w-full rounded-2xl border-2 border-[#dfcbaf] bg-white/20 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <Copy size={18} className="text-[#2c221e]" />
                <h2 className="text-xl font-black text-[#2c221e]">
                    Prompt Templates Copies vs Bookmarks
                </h2>
            </div>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#dfcbaf" opacity={0.5} />
                        <XAxis dataKey="name" stroke="#2c221e" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                        <YAxis stroke="#2c221e" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ebdcc9',
                                borderColor: '#dfcbaf',
                                borderRadius: '12px',
                                color: '#2c221e',
                                fontWeight: 'bold'
                            }}
                        />
                        <Legend wrapperStyle={{ fontWeight: 'bold', fontSize: '12px' }} />

                        <Bar dataKey="bookmarks" fill="#4a3b35" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="copies" fill="#ff7a00" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PromptAnalyticsChart;