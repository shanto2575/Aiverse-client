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
import { FileText } from "lucide-react";

const EngineDensityChart = ({ prompts = [] }) => {
    const groupedData = prompts.reduce((acc, item) => {
        const engine = item.aiEngine || "Other";

        if (!acc[engine]) {
            acc[engine] = {
                name: engine,
                prompts: 0,
                copies: 0,
            };
        }

        acc[engine].prompts += 1;
        acc[engine].copies += item.copies || 0;

        return acc;
    }, {});

    const chartData = Object.values(groupedData);

    return (
        <div className="w-full rounded-2xl border-2 border-[#dfcbaf] bg-white/20 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <FileText size={18} className="text-[#2c221e]" />
                <h2 className="text-xl font-black text-[#2c221e]">
                    Engine Prompts Density vs Total Copies
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

                        <Bar dataKey="copies" fill="#ef4444" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="prompts" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EngineDensityChart;