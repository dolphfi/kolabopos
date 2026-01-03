import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ShoppingCart, ChevronDown, Calendar } from 'lucide-react';

type SaleStatus = 'Processing' | 'Completed' | 'Cancelled' | 'Onhold';

interface Sale {
    id: number;
    productName: string;
    category: string;
    price: string;
    date: string;
    status: SaleStatus;
    imageColor: string;
}

const getStatusStyles = (status: SaleStatus): string => {
    switch (status) {
        case 'Processing':
            return 'bg-blue-500/20 text-blue-400';
        case 'Completed':
            return 'bg-emerald-500/20 text-emerald-400';
        case 'Cancelled':
            return 'bg-rose-500/20 text-rose-400';
        case 'Onhold':
            return 'bg-amber-500/20 text-amber-400';
        default:
            return 'bg-slate-500/20 text-slate-400';
    }
};

export const RecentSalesCard: React.FC = () => {
    const sales: Sale[] = [
        {
            id: 1,
            productName: 'Apple Watch Series 9',
            category: 'Electronics',
            price: '$640',
            date: 'Today',
            status: 'Processing',
            imageColor: 'bg-slate-800'
        },
        {
            id: 2,
            productName: 'Gold Bracelet',
            category: 'Fashion',
            price: '$126',
            date: 'Today',
            status: 'Cancelled',
            imageColor: 'bg-amber-700'
        },
        {
            id: 3,
            productName: 'Parachute Down Duvet',
            category: 'Health',
            price: '$69',
            date: '15 Jan 2025',
            status: 'Onhold',
            imageColor: 'bg-rose-400'
        },
        {
            id: 4,
            productName: 'YETI Rambler Tumbler',
            category: 'Sports',
            price: '$65',
            date: '12 Jan 2025',
            status: 'Processing',
            imageColor: 'bg-yellow-500'
        },
        {
            id: 5,
            productName: 'Osmo Genius Starter Kit',
            category: 'Lifestyles',
            price: '$87.56',
            date: '11 Jan 2025',
            status: 'Completed',
            imageColor: 'bg-teal-500'
        }
    ];

    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-6 -mx-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-pink-500/10 rounded-lg">
                            <ShoppingCart className="h-5 w-5 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Recent Sales</h3>
                    </div>

                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white gap-2">
                        <Calendar className="h-3 w-3" />
                        Weekly
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </div>

                {/* List */}
                <div className="flex flex-col gap-4">
                    {sales.map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                {/* Placeholder Image */}
                                <div className={`h-10 w-10 rounded-lg ${sale.imageColor} flex items-center justify-center text-white/50 text-xs font-bold`}>
                                    IMG
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {sale.productName}
                                    </span>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className="text-pink-500/80">{sale.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                        <span className="flex items-center gap-2 text-xs text-slate-400">{sale.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <span className="text-xs text-slate-500">{sale.date}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusStyles(sale.status)}`}>
                                    {sale.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
