import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const LowStockProductsCard: React.FC = () => {
    const products = [
        {
            id: '665814',
            name: 'Dell XPS 13',
            count: '08',
            imageColor: 'bg-orange-500'
        },
        {
            id: '940004',
            name: 'Vacuum Cleaner Robot',
            count: '14',
            imageColor: 'bg-purple-500' // Using purple as placeholder for "Vacuum" image style
        },
        {
            id: '325569',
            name: 'KitchenAid Stand Mixer',
            count: '21',
            imageColor: 'bg-yellow-700'
        },
        {
            id: '124588',
            name: 'Levi\'s Trucker Jacket',
            count: '12',
            imageColor: 'bg-blue-800'
        },
        {
            id: '365586',
            name: 'Lay\'s Classic',
            count: '10',
            imageColor: 'bg-yellow-500'
        }
    ];

    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-6 -mx-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Low Stock Products</h3>
                    </div>

                    <a href="/dashboard" className="text-xs font-medium text-slate-400 hover:text-white underline decoration-slate-600 hover:decoration-white transition-all">
                        View All
                    </a>
                </div>

                {/* List */}
                <div className="flex flex-col gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                {/* Placeholder Image */}
                                <div className={`h-10 w-10 rounded-lg ${product.imageColor} flex items-center justify-center text-white/50 text-xs font-bold`}>
                                    IMG
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                                        {product.name}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        ID: #{product.id}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Instock</span>
                                <span className="text-sm font-bold text-orange-500">{product.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
