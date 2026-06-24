"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";

const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#a855f7", "#f97316"];

const PromptDistributionChart = ({ prompts = [] }) => {
    const groupedData = prompts.reduce((acc, item) => {
        const engine = item.aiEngine || "Other";

        if (!acc[engine]) {
            acc[engine] = {
                name: engine,
                value: 0,
            };
        }

        acc[engine].value += 1;

        return acc;
    }, {});

    const chartData = Object.values(groupedData);

    return (
        <div className="w-full rounded-2xl border-2 border-[#dfcbaf] bg-white/20 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6">
                <PieIcon size={18} className="text-[#2c221e]" />
                <h2 className="text-xl font-black text-[#2c221e]">
                    Prompt Distribution Share
                </h2>
            </div>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={70}
                            outerRadius={110}
                            dataKey="value"
                            paddingAngle={4}
                        >
                            {chartData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

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
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PromptDistributionChart;