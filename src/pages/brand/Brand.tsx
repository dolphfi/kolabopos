import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
    Plus,
    FileText,
    FileSpreadsheet,
    Printer,
    Search,
    ChevronDown,
    Trash2,
    RotateCw,
    Edit,
    CirclePlus,
    X
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { brand } from '../../context/data/dataBrand';

const Brand = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState('All');
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const [images, setImages] = React.useState<string[]>([]);

    // Extract unique status
    const brandStatus = ['All', ...Array.from(new Set(brand.map(p => p.status)))];

    // Filter Brand
    const filteredBrand = brand.filter(brand => {
        const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedStatus === 'All' || brand.status === selectedStatus;
        return matchesSearch && matchesBrand;
    });

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedStatus]);


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBrand = filteredBrand.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredBrand.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    const [newBrand, setNewBrand] = React.useState({
        image: '',
        name: '',
        description: '',
        status: true // default active
    });
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [editingBrand, setEditingBrand] = React.useState<any>(null); // Using any for now to avoid import issues, or infer from data

    const handleEditClick = (brand: any) => {
        setEditingBrand(brand);
        setImages(brand.image ? [brand.image] : []);
        setIsEditOpen(true);
    };
    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Brand List</h1>
                    <p className="text-sm text-slate-400">Manage your brands</p>
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
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Add Brand</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Brand</DialogTitle>
                                <DialogDescription>
                                    Add a new brand
                                </DialogDescription>
                            </DialogHeader>
                            <div className="p-4">
                                <div>
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <Input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                        />
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="h-24 w-24 rounded-lg border border-dashed border-white/20 hover:border-orange-500/50 hover:bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all group"
                                        >
                                            <CirclePlus className="h-4 w-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                                            <span className="text-[10px] font-semibold text-slate-500 group-hover:text-orange-500 mt-2">Add Images</span>
                                        </div>
                                        {images.map((image, index) => (
                                            <div key={index} className="h-24 w-24 rounded-lg border border-white/10 p-1 relative group">
                                                <img src={image} alt={`Brand ${index + 1}`} className="h-full w-full object-contain rounded-md" />
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-4 w-4 rounded shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all"
                                                    onClick={() => {
                                                        const newImages = [...images];
                                                        newImages.splice(index, 1);
                                                        setImages(newImages);
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid gap-4">
                                        <div>
                                            <Label htmlFor="name" className="text-white">Name <span className="text-rose-500">*</span></Label>
                                            <Input
                                                id="name"
                                                value={newBrand.name}
                                                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="description" className="text-white">Description</Label>
                                            <Input
                                                id="description"
                                                value={newBrand.description}
                                                onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <Label htmlFor="sub-status" className="text-white">Status</Label>
                                            <Switch
                                                id="sub-status"
                                                checked={newBrand.status}
                                                onCheckedChange={(checked) => setNewBrand({ ...newBrand, status: checked })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" className="bg-slate-800 border-white/10 text-white hover:bg-slate-700 hover:text-white" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Add Brand</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Edit Brand Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Brand</DialogTitle>
                            <DialogDescription>
                                Update brand details
                            </DialogDescription>
                        </DialogHeader>
                        <div className="p-4">
                            {editingBrand && (
                                <div>
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <Input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                        />
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="h-24 w-24 rounded-lg border border-dashed border-white/20 hover:border-orange-500/50 hover:bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all group"
                                        >
                                            <CirclePlus className="h-4 w-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                                            <span className="text-[10px] font-semibold text-slate-500 group-hover:text-orange-500 mt-2">Change Image</span>
                                        </div>
                                        {images.map((image, index) => (
                                            <div key={index} className="h-24 w-24 rounded-lg border border-white/10 p-1 relative group">
                                                <img src={image} alt={`Brand ${index + 1}`} className="h-full w-full object-contain rounded-md" />
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-4 w-4 rounded shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all"
                                                    onClick={() => {
                                                        const newImages = [...images];
                                                        newImages.splice(index, 1);
                                                        setImages(newImages);
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid gap-4">
                                        <div>
                                            <Label htmlFor="edit-name" className="text-white">Name <span className="text-rose-500">*</span></Label>
                                            <Input
                                                id="edit-name"
                                                value={editingBrand.name}
                                                onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="edit-description" className="text-white">Description</Label>
                                            <Input
                                                id="edit-description"
                                                value={editingBrand.description}
                                                onChange={(e) => setEditingBrand({ ...editingBrand, description: e.target.value })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <Label htmlFor="edit-status" className="text-white">Status</Label>
                                            <Switch
                                                id="edit-status"
                                                checked={editingBrand.status === 'Active'}
                                                onCheckedChange={(checked) => setEditingBrand({ ...editingBrand, status: checked ? 'Active' : 'Inactive' })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" className="bg-slate-800 border-white/10 text-white hover:bg-slate-700 hover:text-white" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/*Main conten Card  */}
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
                                        {selectedStatus === 'All' ? 'Status' : selectedStatus}
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                                    {brandStatus.map((status) => (
                                        <DropdownMenuItem
                                            key={status}
                                            onClick={() => setSelectedStatus(status)}
                                            className="focus:bg-white/10 focus:text-white cursor-pointer"
                                        >
                                            {status}
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
                                    <TableHead className="text-white">Brand</TableHead>
                                    <TableHead className="text-white">Created Date</TableHead>
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-right text-white">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentBrand.length > 0 ? (
                                    currentBrand.map((brand) => (
                                        <TableRow key={brand.id} className="hover:bg-white/10 border-white/10">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/10">
                                                        <img src={brand.image} alt={brand.name} className="h-full w-full object-cover" />
                                                    </div>
                                                    <span className="font-medium text-white group-hover:text-orange-400 transition-colors">{brand.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-white">{brand.created_at}</TableCell>
                                            <TableCell className='font-medium text-slate-300'>
                                                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${brand.status === 'Active'
                                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                    : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                                    }`}>
                                                    {brand.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10" onClick={() => handleEditClick(brand)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
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
                                                                    This action cannot be undone. This will permanently delete the brand
                                                                    <span className="font-medium text-white"> "{brand.name}" </span>
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
                                            No brand found matching your filters.
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
                                {filteredBrand.length > 0 ? Math.min(startIndex + 1, filteredBrand.length) : 0} - {Math.min(endIndex, filteredBrand.length)} of {filteredBrand.length}
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

export default Brand;
