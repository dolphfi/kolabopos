import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Users } from 'lucide-react';

interface Customer {
    id: number;
    name: string;
    location: string;
    orders: number;
    totalSpend: string;
    avatar: string;
}

export const TopCustomersCard: React.FC = () => {
    const customers: Customer[] = [
        {
            id: 1,
            name: 'Carlos Curran',
            location: 'USA',
            orders: 24,
            totalSpend: '$8,9645',
            avatar: 'https://i.pravatar.cc/150?u=1' // Placeholder or use local images if available
        },
        {
            id: 2,
            name: 'Stan Gaunter',
            location: 'UAE',
            orders: 22,
            totalSpend: '$16,985',
            avatar: 'https://i.pravatar.cc/150?u=2'
        },
        {
            id: 3,
            name: 'Richard Wilson',
            location: 'Germany',
            orders: 14,
            totalSpend: '$5,366',
            avatar: 'https://i.pravatar.cc/150?u=3'
        },
        {
            id: 4,
            name: 'Mary Bronson',
            location: 'Belgium',
            orders: 8,
            totalSpend: '$4,569',
            avatar: 'https://i.pravatar.cc/150?u=4'
        },
        {
            id: 5,
            name: 'Annie Tremblay',
            location: 'Greenland',
            orders: 14,
            totalSpend: '$3,5698',
            avatar: 'https://i.pravatar.cc/150?u=5'
        }
    ];

    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-6 -mx-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            {/* Changed icon to Users to match the design (or intent) */}
                            <Users className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Top Customers</h3>
                    </div>

                    <span className="text-sm text-slate-300 hover:text-white cursor-pointer hover:underline">
                        View All
                    </span>
                </div>

                {/* List */}
                <div className="flex-1 flex flex-col justify-between">
                    {customers.map((customer) => (
                        <div key={customer.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="h-10 w-10 rounded-lg bg-gray-600 overflow-hidden">
                                    <img src={customer.avatar} alt={customer.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                                        {customer.name}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                        <span>{customer.location}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                        <span className="text-orange-400">{customer.orders.toString().padStart(2, '0')} Orders</span>
                                    </div>
                                </div>
                            </div>

                            <span className="text-sm font-bold text-white">
                                {customer.totalSpend}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
