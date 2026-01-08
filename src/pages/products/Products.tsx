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
    Trash2,
    RotateCw,
    Edit
} from 'lucide-react';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

import { products } from '../../context/data/dataProducts';

const Products: React.FC = () => {


    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [selectedBrand, setSelectedBrand] = React.useState('All');

    // Extract unique categories and brands
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
    const brands = ['All', ...Array.from(new Set(products.map(p => p.brand)))];

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
        return matchesSearch && matchesCategory && matchesBrand;
    });

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedBrand]);

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
                    <h1 className="text-2xl font-bold text-white tracking-tight">Product List</h1>
                    <p className="text-sm text-slate-400">Manage your products</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
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

                    <Link to="/products/add">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Add Product</span>
                        </Button>
                    </Link>
                    <Button variant="outline" className="bg-slate-900 border-white/10 text-white hover:bg-slate-800 gap-2">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Import Product</span>
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500"
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white w-full sm:w-32 justify-between">
                                        {selectedCategory === 'All' ? 'Category' : selectedCategory}
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                                    {categories.map((category) => (
                                        <DropdownMenuItem
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className="focus:bg-white/10 focus:text-white cursor-pointer"
                                        >
                                            {category}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white w-full sm:w-32 justify-between">
                                        {selectedBrand === 'All' ? 'Brand' : selectedBrand}
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                                    {brands.map((brand) => (
                                        <DropdownMenuItem
                                            key={brand}
                                            onClick={() => setSelectedBrand(brand)}
                                            className="focus:bg-white/10 focus:text-white cursor-pointer"
                                        >
                                            {brand}
                                        </DropdownMenuItem>
                                    ))}
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
                                    <TableHead className="text-white">Product Name</TableHead>
                                    <TableHead className="text-white">Category</TableHead>
                                    <TableHead className="text-white">Brand</TableHead>
                                    <TableHead className="text-white">Price</TableHead>
                                    <TableHead className="text-white">Unit</TableHead>
                                    <TableHead className="text-white">Qty</TableHead>
                                    <TableHead className="text-white">Created By</TableHead>
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
                                            <TableCell className="text-slate-300">{product.category}</TableCell>
                                            <TableCell className="text-slate-300">{product.brand}</TableCell>
                                            <TableCell className="font-medium text-white">{product.price}</TableCell>
                                            <TableCell className="text-slate-300">{product.unit}</TableCell>
                                            <TableCell className="text-slate-300">{product.qty}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={product.createdBy.avatar} alt={product.createdBy.name} className="object-cover" />
                                                        <AvatarFallback>{product.createdBy.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-slate-300 truncate max-w-[100px]">{product.createdBy.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link to={`/products/details/${product.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link to={`/products/edit/${product.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
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
                                        <TableCell colSpan={10} className="text-center py-8 text-slate-400">
                                            No products found matching your filters.
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
export default Products;