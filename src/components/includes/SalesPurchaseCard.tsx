import React from 'react';
import { Card, CardContent } from "../ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

const chartConfig = {
    sales: {
        label: "Sales",
        color: "#f97316", // orange-500
    },
    purchase: {
        label: "Purchase",
        color: "#fdba74", // orange-300
    },
} satisfies ChartConfig;

export const SalesPurchaseCard: React.FC = () => {
    // Mock data for the chart
    const data = [
        { time: '2 am', sales: 40, purchase: 60 },
        { time: '4 am', sales: 50, purchase: 45 },
        { time: '6 am', sales: 30, purchase: 35 },
        { time: '8 am', sales: 45, purchase: 70 },
        { time: '10 am', sales: 60, purchase: 65 },
        { time: '12 am', sales: 45, purchase: 40 },
        { time: '14 pm', sales: 25, purchase: 30 },
        { time: '16 pm', sales: 50, purchase: 45 },
        { time: '18 pm', sales: 90, purchase: 80 },
        { time: '20 pm', sales: 20, purchase: 35 },
        { time: '22 pm', sales: 70, purchase: 60 },
        { time: '24 pm', sales: 50, purchase: 45 },
    ];

    return (
        <Card className="shadow-sm flex-1 bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 -mx-6 pb-4 border-b border-white/10 mb-0">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-100/10 rounded-lg">
                            <ShoppingCart className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Sales & Purchase</h3>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                        {['1D', '1W', '1M', '3M', '6M', '1Y'].map((period) => (
                            <Button
                                key={period}
                                variant="ghost"
                                size="sm"
                                className={`h-7 px-3 text-xs font-medium rounded-md ${period === '1Y' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                {period}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Legend / Stats */}
                <div className="flex gap-4 mb-2 pt-2">
                    <div className="border border-white/10 rounded-xl p-3 bg-white/5 min-w-[140px]">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-orange-300"></span>
                            {/* Note: bg-orange-300 matches the 'purchase' color defined in config */}
                            <span className="text-slate-400 text-xs font-medium">Total Purchase</span>
                        </div>
                        <h4 className="text-xl font-bold text-white ml-4">3K</h4>
                    </div>
                    <div className="border border-white/10 rounded-xl p-3 bg-white/5 min-w-[140px]">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            <span className="text-slate-400 text-xs font-medium">Total Sales</span>
                        </div>
                        <h4 className="text-xl font-bold text-white ml-4">1K</h4>
                    </div>
                </div>

                {/* Recharts Implementation */}
                {/* min-h ensures the chart has space to render */}
                <div className="w-full h-[230px] px-6 pb-2">
                    <ChartContainer config={chartConfig} className="h-full w-full max-h-full">
                        <BarChart accessibilityLayer data={data} width={undefined} height={undefined} style={{ width: '100%', height: '100%' }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 10 }}
                            />
                            <YAxis
                                width={30}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: '#94a3b8', fontSize: 10 }}
                                tickFormatter={(value) => `${value}`}
                            />
                            {/* 
                                Recharts Tooltip:
                                - cursor={false} removes the hover bar.
                                - Custom styling for tooltip to match the dark glassmorphism design.
                            */}
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

                            {/* Stacked Bars: Sales on bottom, Purchase on top */}
                            <Bar
                                dataKey="sales"
                                stackId="a"
                                fill="var(--color-sales)"
                                radius={[0, 0, 4, 4]}
                                barSize={32}
                            />
                            <Bar
                                dataKey="purchase"
                                stackId="a"
                                fill="var(--color-purchase)"
                                radius={[4, 4, 0, 0]}
                                fillOpacity={0.3} // Phantom effect
                                barSize={32}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
};
