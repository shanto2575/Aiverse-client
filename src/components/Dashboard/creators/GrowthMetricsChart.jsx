"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

const GrowthMetricsChart = ({ totalPrompts = 0, totalCopies = 0 }) => {
    const chartData = [
        {
            date: new Date().toISOString().split("T")[0],
            totalCopies,
            totalPrompts,
        },
    ];

    return (
        <div className="w-full rounded-2xl border-2 border-[#dfcbaf] bg-white/20 p-6 shadow-md mt-8">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={18} className="text-[#cd4611]" />
                <h2 className="text-xl font-black text-[#2c221e]">
                    Accumulative Growth Metrics
                </h2>
            </div>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#dfcbaf" opacity={0.5} />

                        <XAxis dataKey="date" stroke="#2c221e" tick={{ fontSize: 12, fontWeight: 'bold' }} />
                        <YAxis stroke="#2c221e" tick={{ fontSize: 12, fontWeight: 'bold' }} />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#ebdcc9",
                                border: "2px solid #dfcbaf",
                                borderRadius: "12px",
                                color: "#2c221e",
                                fontWeight: "bold"
                            }}
                        />

                        <Legend wrapperStyle={{ fontWeight: 'bold', fontSize: '12px' }} />

                        <Line
                            type="monotone"
                            dataKey="totalCopies"
                            stroke="#2c221e"
                            strokeWidth={3}
                            dot={{ r: 6, fill: "#2c221e" }}
                        />

                        <Line
                            type="monotone"
                            dataKey="totalPrompts"
                            stroke="#4a3b35"
                            strokeWidth={3}
                            dot={{ r: 6, fill: "#4a3b35" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GrowthMetricsChart;