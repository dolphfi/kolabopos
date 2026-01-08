
import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
    FileText,
    FileSpreadsheet,
    RotateCw,
    Search,
    ChevronDown,
    Printer,
    Edit,
    Trash2
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../components/ui/pagination';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { DatePickerInput } from '../../components/custom/date-picker-input';
import { Label } from '../../components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

// Mock data for expired products
const expiredProducts = [
    {
        id: 1,
        sku: 'PT006',
        name: 'Red Premium Handy',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80',
        manufacturedDate: '17 Jan 2023',
        expiredDate: '29 Mar 2023',
    },
    {
        id: 2,
        sku: 'PT007',
        name: 'iPhone 14 Pro',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=150&q=80',
        manufacturedDate: '22 Feb 2023',
        expiredDate: '04 Apr 2023',
    },
    {
        id: 3,
        sku: 'PT008',
        name: 'Black Shamppo',
        image: 'https://images.unsplash.com/photo-1585232561025-016298a0c84e?w=150&q=80',
        manufacturedDate: '27 Feb 2023',
        expiredDate: '24 May 2023',
    },
    {
        id: 4,
        sku: 'PT009',
        name: 'Sunglasses',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150&q=80',
        manufacturedDate: '29 Mar 2023',
        expiredDate: '27 May 2023',
    },
    {
        id: 5,
        sku: 'PT010',
        name: 'Unpaired Gray',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80',
        manufacturedDate: '31 Mar 2023',
        expiredDate: '23 Jun 2023',
    }
];

const ExpiredProducts: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedProduct, setSelectedProduct] = React.useState('All');
    const [sortOption, setSortOption] = React.useState('date-desc');

    // Edit Dialog State
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState<any>(null);
    const [manufacturedDate, setManufacturedDate] = React.useState<Date | undefined>();
    const [expiryDate, setExpiryDate] = React.useState<Date | undefined>();

    const uniqueProducts = Array.from(new Set(expiredProducts.map(p => p.name)));

    const handleEditClick = (product: any) => {
        setEditingProduct(product);
        setManufacturedDate(new Date(product.manufacturedDate));
        setExpiryDate(new Date(product.expiredDate));
        setIsEditOpen(true);
    };

    const handleSave = () => {
        // Implement save logic here
        console.log("Saving", editingProduct, manufacturedDate, expiryDate);
        setIsEditOpen(false);
    };

    // Filter products
    const filteredProducts = expiredProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProduct = selectedProduct === 'All' || product.name === selectedProduct;
        return matchesSearch && matchesProduct;
    }).sort((a, b) => {
        if (sortOption === 'date-desc') return new Date(b.expiredDate).getTime() - new Date(a.expiredDate).getTime();
        if (sortOption === 'date-asc') return new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime();
        if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
        if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
    });

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedProduct, sortOption]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Expired Products</h1>
                    <p className="text-sm text-slate-400">Manage your expired products</p>
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-orange-500 focus-visible:ring-offset-0"
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white w-full sm:w-auto justify-between gap-2">
                                        {selectedProduct === 'All' ? 'Product' : selectedProduct}
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                                    <DropdownMenuItem onClick={() => setSelectedProduct('All')} className="focus:bg-white/10 focus:text-white cursor-pointer">
                                        All Products
                                    </DropdownMenuItem>
                                    {uniqueProducts.map((name) => (
                                        <DropdownMenuItem key={name} onClick={() => setSelectedProduct(name)} className="focus:bg-white/10 focus:text-white cursor-pointer">
                                            {name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white w-full sm:w-auto justify-between gap-2">
                                        Sort By : {sortOption === 'date-desc' ? 'Newest' : sortOption === 'date-asc' ? 'Oldest' : sortOption === 'name-asc' ? 'Name (A-Z)' : 'Name (Z-A)'}
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                                    <DropdownMenuItem onClick={() => setSortOption('date-desc')} className="focus:bg-white/10 focus:text-white cursor-pointer">Date: Newest</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('date-asc')} className="focus:bg-white/10 focus:text-white cursor-pointer">Date: Oldest</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('name-asc')} className="focus:bg-white/10 focus:text-white cursor-pointer">Name: A-Z</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOption('name-desc')} className="focus:bg-white/10 focus:text-white cursor-pointer">Name: Z-A</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-auto rounded-lg border border-white/10 bg-slate-900/50">
                        <Table>
                            <TableHeader className="bg-slate-900 border-b border-white/10">
                                <TableRow className="hover:bg-transparent border-white/10">
                                    <TableHead className="text-white">SKU</TableHead>
                                    <TableHead className="text-white">Product</TableHead>
                                    <TableHead className="text-white">Manufactured Date</TableHead>
                                    <TableHead className="text-white">Expired Date</TableHead>
                                    <TableHead className="text-right text-white">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <TableRow key={product.id} className="hover:bg-white/5 transition-colors border-white/5 group">
                                            <TableCell className="font-medium text-slate-300">{product.sku}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9  rounded-lg border border-white/10flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                                        <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply" />
                                                    </div>
                                                    <span className="font-medium text-white group-hover:text-orange-400 transition-colors">{product.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-300">{product.manufacturedDate}</TableCell>
                                            <TableCell className="text-slate-300">{product.expiredDate}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Dialog open={isEditOpen && editingProduct?.id === product.id} onOpenChange={(open) => {
                                                        if (!open) {
                                                            setIsEditOpen(false);
                                                            setEditingProduct(null);
                                                        }
                                                    }}>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                                                                onClick={() => handleEditClick(product)}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Expired Product</DialogTitle>
                                                                <DialogDescription className="text-slate-400">
                                                                    Make changes to the expired product here. Click save when you're done.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="flex flex-col gap-3">
                                                                    <Label htmlFor="sku" className="text-white">
                                                                        SKU <span className="text-red-500">*</span>
                                                                    </Label>
                                                                    <Input
                                                                        id="sku"
                                                                        value={editingProduct?.sku || ''}
                                                                        onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                                                                        className="bg-slate-900 border-white/10 text-white focus-visible:ring-0 focus-visible:border-orange-500 focus-visible:ring-offset-0"
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col gap-3">
                                                                    <Label htmlFor="name" className="text-white">
                                                                        Product Name <span className="text-red-500">*</span>
                                                                    </Label>
                                                                    {/* Using a simple Select for now or Input as placeholder since dynamic select needs data */}
                                                                    <div className="relative">
                                                                        <Input
                                                                            id="name"
                                                                            value={editingProduct?.name || ''}
                                                                            readOnly // Assuming product reference shouldn't change easily or needs a complex select
                                                                            className="bg-slate-900 border-white/10 text-white focus-visible:ring-0 focus-visible:border-orange-500 focus-visible:ring-offset-0"
                                                                        />
                                                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                                                    </div>
                                                                </div>
                                                                <DatePickerInput
                                                                    id="manufactured-date"
                                                                    label="Manufacturer Date"
                                                                    date={manufacturedDate}
                                                                    onDateChange={setManufacturedDate}
                                                                />
                                                                <DatePickerInput
                                                                    id="expiry-date"
                                                                    label="Expiry Date"
                                                                    date={expiryDate}
                                                                    onDateChange={setExpiryDate}
                                                                />
                                                            </div>
                                                            <DialogFooter>
                                                                <Button variant="outline" onClick={() => setIsEditOpen(false)} className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-white">
                                                                    Cancel
                                                                </Button>
                                                                <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
                                                                    Save Changes
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="bg-slate-900 border-white/10">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription className="text-slate-400">
                                                                    This action cannot be undone. This will permanently delete the product
                                                                    <span className="font-medium text-white"> "{product.name}" </span>
                                                                    and remove it from our servers.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-white">Cancel</AlertDialogCancel>
                                                                <AlertDialogAction className="bg-rose-500 hover:bg-rose-600 text-white border-0">Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                                            No expired products found matching your search.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <span>Row Per Page</span>
                            <Select defaultValue="10" onValueChange={(value) => { setItemsPerPage(Number(value)); setCurrentPage(1); }}>
                                <SelectTrigger className="w-[70px] h-8 bg-white/5 border-white/10 text-white focus:ring-orange-500/50">
                                    <SelectValue placeholder="10" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="5" className="focus:bg-white/10 focus:text-white">5</SelectItem>
                                    <SelectItem value="10" className="focus:bg-white/10 focus:text-white">10</SelectItem>
                                    <SelectItem value="25" className="focus:bg-white/10 focus:text-white">25</SelectItem>
                                    <SelectItem value="50" className="focus:bg-white/10 focus:text-white">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>Entries</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>
                                {filteredProducts.length > 0 ? Math.min(startIndex + 1, filteredProducts.length) : 0} - {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
                            </span>
                            <Pagination className="w-auto">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                                            className={`text-slate-400 hover:text-white hover:bg-white/10 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                href="#"
                                                isActive={currentPage === page}
                                                onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                                                className={currentPage === page ? "text-white bg-orange-500 hover:bg-orange-600 border-none" : "text-slate-400 hover:text-white hover:bg-white/10"}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                                            className={`text-slate-400 hover:text-white hover:bg-white/10 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ExpiredProducts;
