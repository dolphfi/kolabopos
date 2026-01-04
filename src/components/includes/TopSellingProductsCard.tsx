import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Package, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';

export const TopSellingProductsCard: React.FC = () => {
    const products = [
        {
            id: 1,
            name: 'Charger Cable - Lighting',
            price: '$187',
            sales: '247+ Sales',
            growth: '+25%',
            positive: true,
            imageColor: 'bg-orange-500'
        },
        {
            id: 2,
            name: 'Yves Saint Eau De Parfum',
            price: '$145',
            sales: '289+ Sales',
            growth: '+25%',
            positive: true,
            imageColor: 'bg-rose-500'
        },
        {
            id: 3,
            name: 'Apple Airpods 2',
            price: '$458',
            sales: '300+ Sales',
            growth: '+25%',
            positive: true,
            imageColor: 'bg-emerald-600'
        },
        {
            id: 4,
            name: 'Vacuum Cleaner',
            price: '$139',
            sales: '225+ Sales',
            growth: '-21%',
            positive: false,
            imageColor: 'bg-slate-600'
        },
        {
            id: 5,
            name: 'Samsung Galaxy S21 Fe 5g',
            price: '$898',
            sales: '365+ Sales',
            growth: '+25%',
            positive: true,
            imageColor: 'bg-blue-600'
        }
    ];

    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-6 -mx-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-pink-500/10 rounded-lg">
                            <Package className="h-5 w-5 text-pink-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Top Selling Products</h3>
                    </div>

                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white gap-2">
                        Today
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </div>

                {/* List */}
                <div className="flex flex-col gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3 overflow-hidden">
                                {/* Product Image */}
                                <Avatar className={`h-10 w-10 rounded-lg ${product.imageColor}`}>
                                    <AvatarFallback className="bg-transparent text-white/50 text-xs font-bold">IMG</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                                        {product.name}
                                    </span>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span>{product.price}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                        <span className="truncate">{product.sales}</span>
                                    </div>
                                </div>
                            </div>


                            <div className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 shrink-0 ${product.positive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {product.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {product.growth}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
