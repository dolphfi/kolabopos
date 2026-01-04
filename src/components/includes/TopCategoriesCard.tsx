import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, ChevronDown, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '../../components/ui/chart';

export const TopCategoriesCard: React.FC = () => {
    const data = [
        { name: 'Electronics', value: 698, color: '#f97316' }, // orange-500
        { name: 'Sports', value: 545, color: '#ea580c' }, // orange-600 (darker) or similar
        { name: 'Lifestyles', value: 456, color: '#1e293b' }, // slate-800 / dark blue
    ];

    // Custom colors to match the design roughly
    const COLORS = ['#f97316', '#c2410c', '#0f172a'];

    const chartConfig = {
        electronics: { label: "Electronics", color: "#f97316" },
        sports: { label: "Sports", color: "#c2410c" },
        lifestyles: { label: "Lifestyles", color: "#0f172a" },
    } satisfies ChartConfig;

    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-6 -mx-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Users className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Top Categories</h3>
                    </div>

                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white gap-2">
                        <Calendar className="h-3 w-3" />
                        Weekly
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </div>

                <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Donut Chart */}
                    <div className="w-full md:w-1/2 h-[180px] relative">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            hideLabel
                                            nameKey="name"
                                            indicator="dot"
                                            className="bg-black/60 backdrop-blur-xl border border-white/10 text-white min-w-[120px] shadow-2xl [&_.text-foreground]:text-white"
                                            labelClassName="text-slate-300 mb-1 border-b border-white/10 pb-1"
                                        />
                                    }
                                />
                            </PieChart>
                        </ChartContainer>
                    </div>

                    {/* Legend */}
                    {/* Legend */}
                    <div className="w-full md:w-1/2 flex justify-start md:justify-end overflow-hidden">
                        <div className="flex flex-row md:flex-col flex-nowrap justify-start md:justify-end gap-4 w-full overflow-x-auto no-scrollbar pb-1">
                            {data.map((item, index) => (
                                <div key={item.name} className="flex flex-col items-start px-4 first:pl-0 md:px-0 border-r border-white/10 last:border-r-0 md:border-r-0 shrink-0">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                                        <span className="w-1.5 h-3 rounded-md" style={{ backgroundColor: COLORS[index] }}></span>
                                        {item.name}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-white">{item.value}</span>
                                        <span className="text-xs text-slate-500">Sales</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Statistics */}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-3">Category Statistics</h4>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></span>
                                <span className="text-xs text-slate-300 truncate">Total Number Of Categories</span>
                            </div>
                            <span className="text-sm font-bold text-white pl-2">698</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                                <span className="text-xs text-slate-300 truncate">Total Number Of Products</span>
                            </div>
                            <span className="text-sm font-bold text-white pl-2">7899</span>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};
