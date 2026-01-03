import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Wallet } from 'lucide-react';

type TransactionStatus = 'Completed' | 'Draft' | 'Pending' | 'Cancelled';
type TabType = 'Sale' | 'Purchase' | 'Quotation' | 'Expenses' | 'Invoices';

interface Transaction {
    id: number;
    date: string;
    customerName: string;
    customerId: string;
    status: TransactionStatus;
    total: string;
    avatarColor: string;
}

const getStatusStyles = (status: TransactionStatus): string => {
    switch (status) {
        case 'Completed':
            return 'bg-emerald-500/20 text-emerald-400';
        case 'Draft':
            return 'bg-orange-500/20 text-orange-400';
        case 'Pending':
            return 'bg-blue-500/20 text-blue-400';
        case 'Cancelled':
            return 'bg-rose-500/20 text-rose-400';
        default:
            return 'bg-slate-500/20 text-slate-400';
    }
};

export const RecentTransactionsCard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Sale');

    const tabs: TabType[] = ['Sale', 'Purchase', 'Quotation', 'Expenses', 'Invoices'];

    const transactions: Transaction[] = [
        {
            id: 1,
            date: '24 May 2025',
            customerName: 'Andrea Willer',
            customerId: '#114589',
            status: 'Completed',
            total: '$4,560',
            avatarColor: 'bg-slate-700'
        },
        {
            id: 2,
            date: '23 May 2025',
            customerName: 'Timothy Sandsr',
            customerId: '#114589',
            status: 'Completed',
            total: '$3,569',
            avatarColor: 'bg-amber-700'
        },
        {
            id: 3,
            date: '22 May 2025',
            customerName: 'Bonnie Rodrigues',
            customerId: '#114589',
            status: 'Draft',
            total: '$4,560',
            avatarColor: 'bg-pink-700'
        },
        {
            id: 4,
            date: '21 May 2025',
            customerName: 'Randy McCree',
            customerId: '#114589',
            status: 'Completed',
            total: '$2,155',
            avatarColor: 'bg-slate-600'
        },
        {
            id: 5,
            date: '21 May 2025',
            customerName: 'Dennis Anderson',
            customerId: '#114589',
            status: 'Completed',
            total: '$5,123',
            avatarColor: 'bg-emerald-700'
        }
    ];

    return (
        <Card className="shadow-sm h-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 px-6 -mx-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Wallet className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                    </div>

                    <span className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer hover:underline">
                        View All
                    </span>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mb-4 border-b border-white/10 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === tab
                                    ? 'text-orange-500'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 text-xs text-slate-400 font-medium mb-3 px-2">
                    <div className="col-span-3">Date</div>
                    <div className="col-span-4">Customer</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Transactions List */}
                <div className="flex flex-col gap-3">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="grid grid-cols-12 gap-4 items-center py-2 px-2 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="col-span-3 text-sm text-slate-300 whitespace-nowrap">
                                {transaction.date}
                            </div>
                            <div className="col-span-4 flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-full ${transaction.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                    {transaction.customerName.charAt(0)}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                        {transaction.customerName}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {transaction.customerId}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <span className={`px-3 py-1 rounded text-[11px] font-semibold ${getStatusStyles(transaction.status)}`}>
                                    {transaction.status}
                                </span>
                            </div>
                            <div className="col-span-2 text-right text-sm font-bold text-white">
                                {transaction.total}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
