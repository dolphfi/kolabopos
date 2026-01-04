import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Triangle, ChevronDown, Calendar } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart";

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#14b8a6", // teal-500
    },
    expense: {
        label: "Expense",
        color: "#f97316", // orange-500
    },
} satisfies ChartConfig;

export const SalesStatisticsCard: React.FC = () => {
    // Transform data for Recharts
    // Recharts bars can take positive and negative values directly
    const monthlyData: any[] = [
        { month: 'Jan', revenue: 8000, expense: -5000 },
        { month: 'Feb', revenue: 22000, expense: -8000 },
        { month: 'Mar', revenue: 18000, expense: -12000 },
        { month: 'Apr', revenue: 25000, expense: -6000 },
        { month: 'May', revenue: 15000, expense: -18000 },
        { month: 'Jun', revenue: 28000, expense: -10000 },
        { month: 'Jul', revenue: 22000, expense: -15000 },
        { month: 'Aug', revenue: 20000, expense: -8000 },
        { month: 'Sep', revenue: 18000, expense: -12000 },
        { month: 'Oct', revenue: 12000, expense: -22000 },
        { month: 'Nov', revenue: 16000, expense: -8000 },
        { month: 'Dec', revenue: 10000, expense: -15000 },
    ];

    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-6 -mx-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Triangle className="h-5 w-5 text-orange-500 fill-orange-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Sales Statistics</h3>
                    </div>

                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white gap-2">
                        <Calendar className="h-3 w-3" />
                        2025
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-teal-400 truncate">$12,189</span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 shrink-0">
                                    ↗ 25%
                                </span>
                            </div>
                            <span className="text-xs text-slate-400">Revenue</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-white truncate">$48,988,078</span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-orange-500/20 text-orange-400 shrink-0">
                                    ↗ 25%
                                </span>
                            </div>
                            <span className="text-xs text-slate-400">Expense</span>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="flex-1 w-full min-h-[200px] overflow-hidden">
                    <div className="overflow-x-auto pb-2 no-scrollbar">
                        <div className="h-full w-full min-w-[500px]">
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <BarChart accessibilityLayer data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />

                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                    />

                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                        tickFormatter={(value) => `${value / 1000}K`}
                                    />

                                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent
                                                indicator="dot"
                                                className="bg-black/60 backdrop-blur-xl border border-white/10 text-white min-w-[120px] shadow-2xl [&_.text-foreground]:text-white"
                                                labelClassName="text-slate-300 mb-1 border-b border-white/10 pb-1"
                                            />
                                        }
                                    />

                                    <Bar
                                        dataKey="revenue"
                                        fill="var(--color-revenue)"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                    <Bar
                                        dataKey="expense"
                                        fill="var(--color-expense)"
                                        radius={[0, 0, 4, 4]}
                                        barSize={20}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
