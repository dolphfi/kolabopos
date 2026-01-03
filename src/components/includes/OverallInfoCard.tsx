import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Info, User, Users, ShoppingCart, ChevronDown } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { RadialBarChart, RadialBar, PolarGrid } from "recharts";

const chartData = [
    { category: "return", customers: 3500, fill: "#10b981" },
    { category: "firstTime", customers: 5500, fill: "#f97316" }
];

const chartConfig = {
    customers: {
        label: "Customers"
    },
    firstTime: {
        label: "First Time",
        color: "#f97316"
    },
    return: {
        label: "Return",
        color: "#10b981"
    }
} satisfies ChartConfig;

export const OverallInfoCard: React.FC = () => {
    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 px-6 -mx-6 pb-4 border-b border-white/10 mb-2 min-h-[38px]">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Info className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Overall Information</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 px-6 -mx-6 pb-4 border-b border-white/10">
                    <div className="flex flex-col items-center justify-center p-4 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <User className="h-5 w-5 text-blue-500 mb-2" />
                        <span className="text-xs text-slate-400 font-medium mb-1">Suppliers</span>
                        <span className="text-lg font-bold text-white">6987</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Users className="h-5 w-5 text-orange-500 mb-2" />
                        <span className="text-xs text-slate-400 font-medium mb-1">Customer</span>
                        <span className="text-lg font-bold text-white">4896</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <ShoppingCart className="h-5 w-5 text-emerald-500 mb-2" />
                        <span className="text-xs text-slate-400 font-medium mb-1">Orders</span>
                        <span className="text-lg font-bold text-white">487</span>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-slate-200">Customers Overview</h4>
                        <Button variant="outline" size="sm" className="h-8 text-xs bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white gap-2">
                            Today
                            <ChevronDown className="h-3 w-3" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Recharts Radial Chart */}
                        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                            <ChartContainer config={chartConfig} className="w-full h-full">
                                <RadialBarChart
                                    data={chartData}
                                    innerRadius={30}
                                    outerRadius={60}
                                >
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent
                                                hideLabel
                                                nameKey="category"
                                                indicator="dot"
                                                className="bg-black/60 backdrop-blur-xl border border-white/10 text-white min-w-[120px] shadow-2xl [&_.text-foreground]:text-white"
                                                labelClassName="text-slate-300 mb-1 border-b border-white/10 pb-1"
                                            />
                                        }
                                    />
                                    <PolarGrid gridType="circle" />
                                    <RadialBar dataKey="customers" />
                                </RadialBarChart>
                            </ChartContainer>
                        </div>

                        <div className="flex-1 flex items-center justify-around pl-4">
                            <div className="flex flex-col items-center">
                                <h5 className="text-2xl font-bold text-white mb-1">5.5K</h5>
                                <p className="text-xs text-orange-500 font-medium mb-2">First Time</p>
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/20">
                                    +25%
                                </span>
                            </div>

                            <div className="h-12 w-px bg-white/10 mx-2"></div>

                            <div className="flex flex-col items-center">
                                <h5 className="text-2xl font-bold text-white mb-1">3.5K</h5>
                                <p className="text-xs text-emerald-500 font-medium mb-2">Return</p>
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/20">
                                    +21%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
