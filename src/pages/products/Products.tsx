import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
    Plus,
    Download,
    FileText,
    FileSpreadsheet,
    Printer,
    Search,
    ChevronDown,
    Eye,
    Pencil,
    Trash2,
    RotateCw
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Checkbox } from "../../components/ui/checkbox";

interface Product {
    id: string;
    sku: string;
    name: string;
    image: string;
    category: string;
    brand: string;
    price: string;
    unit: string;
    qty: number;
    createdBy: {
        name: string;
        avatar: string;
    };
}

const Products: React.FC = () => {
    // Mock Data
    const products: Product[] = [
        {
            id: '1',
            sku: 'PT001',
            name: 'Lenovo IdeaPad 3',
            image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&h=100&fit=crop',
            category: 'Computers',
            brand: 'Lenovo',
            price: '$600',
            unit: 'Pc',
            qty: 100,
            createdBy: { name: 'James Kirwin', avatar: 'https://i.pravatar.cc/150?u=1' }
        },
        {
            id: '2',
            sku: 'PT002',
            name: 'Beats Pro',
            image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop',
            category: 'Electronics',
            brand: 'Beats',
            price: '$160',
            unit: 'Pc',
            qty: 140,
            createdBy: { name: 'Francis Chang', avatar: 'https://i.pravatar.cc/150?u=2' }
        },
        {
            id: '3',
            sku: 'PT003',
            name: 'Nike Jordan',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
            category: 'Shoe',
            brand: 'Nike',
            price: '$110',
            unit: 'Pc',
            qty: 300,
            createdBy: { name: 'Antonio Engle', avatar: 'https://i.pravatar.cc/150?u=3' }
        },
        {
            id: '4',
            sku: 'PT004',
            name: 'Apple Series 5 Watch',
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop',
            category: 'Electronics',
            brand: 'Apple',
            price: '$120',
            unit: 'Pc',
            qty: 450,
            createdBy: { name: 'Leo Kelly', avatar: 'https://i.pravatar.cc/150?u=4' }
        },
        {
            id: '5',
            sku: 'PT005',
            name: 'Amazon Echo Dot',
            image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=100&h=100&fit=crop',
            category: 'Electronics',
            brand: 'Amazon',
            price: '$80',
            unit: 'Pc',
            qty: 320,
            createdBy: { name: 'Annette Walker', avatar: 'https://i.pravatar.cc/150?u=5' }
        },
        {
            id: '6',
            sku: 'PT006',
            name: 'Sanford Chair Sofa',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
            category: 'Furnitures',
            brand: 'Modern Wave',
            price: '$320',
            unit: 'Pc',
            qty: 650,
            createdBy: { name: 'John Weaver', avatar: 'https://i.pravatar.cc/150?u=6' }
        },
        {
            id: '7',
            sku: 'PT007',
            name: 'Red Premium Satchel',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop',
            category: 'Bags',
            brand: 'Dior',
            price: '$60',
            unit: 'Pc',
            qty: 700,
            createdBy: { name: 'Gary Hennessy', avatar: 'https://i.pravatar.cc/150?u=7' }
        },
    ];

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Product List</h1>
                    <p className="text-sm text-slate-400">Manage your products</p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Action Icons */}
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 mr-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-white/10 hover:text-rose-400" title="PDF">
                            <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 hover:bg-white/10 hover:text-emerald-400" title="Excel">
                            <FileSpreadsheet className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-white/10 hover:text-white" title="Print">
                            <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-white/10 hover:text-white" title="Refresh">
                            <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-white/10 hover:text-white" title="Toggle">
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Button>
                    <Button variant="outline" className="bg-slate-900 border-white/10 text-white hover:bg-slate-800 gap-2">
                        <Download className="h-4 w-4" />
                        Import Product
                    </Button>
                </div>
            </div>

            {/* Main Content Card */}
            <Card className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 text-white overflow-hidden flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                    {/* Toolbar / Filters */}
                    <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500"
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:text-white w-full sm:w-32 justify-between">
                                        Category
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                                    <DropdownMenuItem>Computers</DropdownMenuItem>
                                    <DropdownMenuItem>Electronics</DropdownMenuItem>
                                    <DropdownMenuItem>Shoes</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:text-white w-full sm:w-32 justify-between">
                                        Brand
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                                    <DropdownMenuItem>Lenovo</DropdownMenuItem>
                                    <DropdownMenuItem>Nike</DropdownMenuItem>
                                    <DropdownMenuItem>Apple</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 uppercase bg-slate-900 border-b border-white/10 sticky top-0 z-10">
                                <tr>
                                    <th className="p-4 w-10">
                                        <Checkbox />
                                    </th>
                                    <th className="p-4 font-medium">SKU</th>
                                    <th className="p-4 font-medium">Product Name</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium">Brand</th>
                                    <th className="p-4 font-medium">Price</th>
                                    <th className="p-4 font-medium">Unit</th>
                                    <th className="p-4 font-medium">Qty</th>
                                    <th className="p-4 font-medium">Created By</th>
                                    <th className="p-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <Checkbox />
                                        </td>
                                        <td className="p-4 font-medium text-slate-300">{product.sku}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 bg-white rounded flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                                    <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply" />
                                                </div>
                                                <span className="font-medium text-white group-hover:text-orange-400 transition-colors">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-300">{product.category}</td>
                                        <td className="p-4 text-slate-300">{product.brand}</td>
                                        <td className="p-4 font-medium text-white">{product.price}</td>
                                        <td className="p-4 text-slate-300">{product.unit}</td>
                                        <td className="p-4 text-slate-300">{product.qty}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full overflow-hidden">
                                                    <img src={product.createdBy.avatar} alt={product.createdBy.name} className="h-full w-full object-cover" />
                                                </div>
                                                <span className="text-slate-300 truncate max-w-[100px]">{product.createdBy.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <span>Row Per Page</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-7 gap-1 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white font-normal">
                                        10
                                        <ChevronDown className="h-3 w-3 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 text-white min-w-[3rem]">
                                    <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">10</DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">25</DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">50</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <span>Entries</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>1 - 10 of 10</span>
                            <div className="flex items-center gap-1">
                                <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0 bg-white/5 border-white/10 text-slate-500">
                                    &lt;
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-orange-500 border-none text-white hover:bg-orange-600">
                                    1
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white">
                                    2
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white">
                                    3
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white">
                                    &gt;
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
export default Products;