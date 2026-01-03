import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Box, Calendar, ChevronDown } from 'lucide-react';

export const OrderStatisticsCard: React.FC = () => {
    // Timestamps for Y-axis (from bottom up, matching the image)
    const timeSlots = [
        '18 Am', '16 Pm', '14 Pm', '12 Am', '10 Am', '8 Am', '6 Am', '4 Am', '2 Am'
    ];

    // Days for X-axis
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Mock data representing intensity: 0 (lightest/none) to 2 (darkest)
    // 9 rows x 7 cols
    const dataGrid = [
        // 18 Am
        [0, 0, 0, 0, 0, 1, 1],
        // 16 Pm
        [0, 0, 0, 0, 1, 0, 0],
        // 14 Pm
        [0, 0, 0, 0, 0, 0, 0],
        // 12 Am
        [0, 0, 0, 0, 0, 0, 0],
        // 10 Am
        [1, 1, 1, 0, 0, 0, 0],
        // 8 Am
        [0, 0, 0, 0, 0, 1, 1],
        // 6 Am
        [0, 0, 0, 0, 0, 0, 0],
        // 4 Am
        [1, 1, 1, 1, 0, 0, 0],
        // 2 Am
        [1, 1, 1, 0, 0, 0, 0],
    ];

    const getColor = (intensity: number) => {
        switch (intensity) {
            case 2: return 'bg-orange-500'; // Darkest
            case 1: return 'bg-orange-400'; // Medium (Active)
            default: return 'bg-orange-100/20'; // Inactive/Light (Glassy look)
        }
    };

    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-6 -mx-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Box className="h-5 w-5 text-indigo-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Order Statistics</h3>
                    </div>

                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white gap-2">
                        <Calendar className="h-3 w-3" />
                        Weekly
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </div>

                {/* Heatmap Grid */}
                <div className="flex-1 flex gap-4 min-h-[300px]">
                    {/* Y-Axis Labels */}
                    <div className="flex flex-col justify-between py-2 text-xs text-slate-400 font-medium">
                        {timeSlots.map((time) => (
                            <div key={time} className="h-8 flex items-center justify-end">
                                {time}
                            </div>
                        ))}
                    </div>

                    {/* Grid Container */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex-1 grid grid-rows-9 gap-1">
                            {dataGrid.map((row, rowIndex) => (
                                <div key={rowIndex} className="grid grid-cols-7 gap-1">
                                    {row.map((intensity, colIndex) => (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            className={`rounded-sm h-full w-full transition-colors hover:opacity-80 ${getColor(intensity)}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* X-Axis Labels */}
                        <div className="grid grid-cols-7 gap-1 mt-2">
                            {days.map((day) => (
                                <div key={day} className="text-xs text-slate-400 text-center font-medium">
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
