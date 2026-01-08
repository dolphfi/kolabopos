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
import { category, subCategory } from '../../context/data/dataCategory';

const Category: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedStatus, setSelectedStatus] = React.useState('All');
    const [searchTermSub, setSearchTermSub] = React.useState('');
    const [selectedStatusSub, setSelectedStatusSub] = React.useState('All');
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [currentPageSub, setCurrentPageSub] = React.useState(1);
    const [itemsPerPageSub, setItemsPerPageSub] = React.useState(10);

    // Extract unique status
    const categories = ['All', ...Array.from(new Set(category.map(p => p.status)))];
    const subCategories = ['All', ...Array.from(new Set(subCategory.map(p => p.status)))];


    // Filter Category
    const filteredCategory = category.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.category_slug.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedStatus === 'All' || category.status === selectedStatus;
        return matchesSearch && matchesCategory;
    });

    // Filter SubCategory
    const filteredSubCategory = subCategory.filter(subCategory => {
        const matchesSearch = subCategory.name.toLowerCase().includes(searchTermSub.toLowerCase()) ||
            subCategory.description.toLowerCase().includes(searchTermSub.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || category.find(c => c.id === subCategory.category_id)?.name === selectedCategory;
        const matchesStatusSub = selectedStatusSub === 'All' || subCategory.status === selectedStatusSub;
        return matchesSearch && matchesCategory && matchesStatusSub;
    });

    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedStatus]);



    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCategory = filteredCategory.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredCategory.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    React.useEffect(() => {
        setCurrentPageSub(1);
    }, [searchTermSub, selectedStatusSub]);

    const startIndexSub = (currentPageSub - 1) * itemsPerPageSub;
    const endIndexSub = startIndexSub + itemsPerPageSub;
    const currentSubCategory = filteredSubCategory.slice(startIndexSub, endIndexSub);
    const totalPagesSub = Math.ceil(filteredSubCategory.length / itemsPerPageSub);

    const handlePageChangeSub = (page: number) => {
        if (page >= 1 && page <= totalPagesSub) {
            setCurrentPageSub(page);
        }
    };

    const [newCategory, setNewCategory] = React.useState({
        name: '',
        slug: '',
        status: true // default active
    });

    const [newSubCategory, setNewSubCategory] = React.useState({
        image: '',
        name: '',
        category_id: '',
        description: '',
        status: true // default active
    });

    const genSlug = (name: string) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special chars
            .replace(/\s+/g, '-'); // Replace spaces with -
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setNewCategory({
            ...newCategory,
            name,
            slug: genSlug(name)
        });
    }

    const [editingCategory, setEditingCategory] = React.useState<{ id: string, name: string, slug: string, status: boolean } | null>(null);
    const [editingSubCategory, setEditingSubCategory] = React.useState<{ id: string, image: string, name: string, status: boolean, category_id: string, description: string } | null>(null);
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const [isAddSubOpen, setIsAddSubOpen] = React.useState(false);
    const [isEditSubOpen, setIsEditSubOpen] = React.useState(false);
    const [images, setImages] = React.useState<string[]>([]);

    const handleEditClick = (category: any) => {
        setEditingCategory({
            id: category.id,
            name: category.name,
            slug: category.category_slug,
            status: category.status === 'Active'
        });
    }

    const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingCategory) {
            const name = e.target.value;
            setEditingCategory({
                ...editingCategory,
                name,
                slug: genSlug(name)
            });
        }
    }

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const handleEditSubClick = (sub: any) => {
        setEditingSubCategory({
            id: sub.id,
            name: sub.name,
            status: sub.status === 'Active',
            image: sub.image,
            category_id: sub.category_id,
            description: sub.description
        });
        setImages(sub.image ? [sub.image] : []);
        setIsEditSubOpen(true);
    };

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Category and Sub Category List</h1>
                    <p className="text-sm text-slate-400">Manage your categories and sub categories</p>
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
                                <span className="hidden sm:inline">Add Category</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Category</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Fill in the details to create a new category.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-white">Category <span className="text-rose-500">*</span></Label>
                                    <Input
                                        id="category"
                                        value={newCategory.name}
                                        onChange={handleNameChange}
                                        className="bg-white/5 border-white/10 text-white focus-visible:ring-orange-500/50"
                                        placeholder="e.g. Electronics"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-white">Category Slug <span className="text-rose-500">*</span></Label>
                                    <Input
                                        id="slug"
                                        value={newCategory.slug}
                                        readOnly
                                        className="bg-white/5 border-white/10 text-slate-400 cursor-not-allowed focus-visible:ring-0"
                                        placeholder="Auto-generated"
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <Label htmlFor="status" className="text-white">Status <span className="text-rose-500">*</span></Label>
                                    <Switch
                                        id="status"
                                        checked={newCategory.status}
                                        onCheckedChange={(checked) => setNewCategory({ ...newCategory, status: checked })}
                                        className="bg-white/5 border border-white/10 backdrop-blur-sm data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/5"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" className="bg-slate-800 border-white/10 text-white hover:bg-slate-700 hover:text-white" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Add Category</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isAddSubOpen} onOpenChange={setIsAddSubOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Add Sub Category</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-slate-900 border-white/10 text-white">
                            <DialogHeader>
                                <DialogTitle>Add Sub Category</DialogTitle>
                                <DialogDescription>
                                    Add a new sub category
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
                                                <img src={image} alt={`Sub Category ${index + 1}`} className="h-full w-full object-contain rounded-md" />
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="category" className="text-white">Category <span className="text-rose-500">*</span></Label>
                                            <Select
                                                value={newSubCategory.category_id}
                                                onValueChange={(value) => setNewSubCategory({ ...newSubCategory, category_id: value })}
                                            >
                                                <SelectTrigger className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    {category.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id} className="focus:bg-white/10 focus:text-white cursor-pointer">
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="name" className="text-white">Name <span className="text-rose-500">*</span></Label>
                                            <Input
                                                id="name"
                                                value={newSubCategory.name}
                                                onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="description" className="text-white">Description</Label>
                                            <Input
                                                id="description"
                                                value={newSubCategory.description}
                                                onChange={(e) => setNewSubCategory({ ...newSubCategory, description: e.target.value })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <Label htmlFor="sub-status" className="text-white">Status</Label>
                                            <Switch
                                                id="sub-status"
                                                checked={newSubCategory.status}
                                                onCheckedChange={(checked) => setNewSubCategory({ ...newSubCategory, status: checked })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" className="bg-slate-800 border-white/10 text-white hover:bg-slate-700 hover:text-white" onClick={() => setIsAddSubOpen(false)}>Cancel</Button>
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Add Sub Category</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Category card */}
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
                                        {categories.map((status) => (
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
                                        <TableHead className="text-white">Category</TableHead>
                                        <TableHead className="text-white">Category Slug</TableHead>
                                        <TableHead className="text-white">Status</TableHead>
                                        <TableHead className="text-right text-white">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentCategory.length > 0 ? (
                                        currentCategory.map((category) => (
                                            <TableRow key={category.id} className="hover:bg-white/5 transition-colors border-white/5 group">
                                                <TableCell className='font-medium text-slate-300'>{category.name}</TableCell>
                                                <TableCell className='font-medium text-slate-300'>{category.category_slug}</TableCell>
                                                <TableCell className='font-medium text-slate-300'>
                                                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${category.status === 'Active'
                                                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                        : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                                        }`}>
                                                        {category.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10" onClick={() => handleEditClick(category)}>
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
                                                                        This action cannot be undone. This will permanently delete the category
                                                                        <span className="font-medium text-white"> "{category.name}" </span>
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
                                                No Category found matching your filters.
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
                                    {filteredCategory.length > 0 ? Math.min(startIndex + 1, filteredCategory.length) : 0} - {Math.min(endIndex, filteredCategory.length)} of {filteredCategory.length}
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

                {/* Edit Category Dialog */}
                <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
                    <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Make changes to your category here.
                            </DialogDescription>
                        </DialogHeader>
                        {editingCategory && (
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-category" className="text-white">Category <span className="text-rose-500">*</span></Label>
                                    <Input
                                        id="edit-category"
                                        value={editingCategory.name}
                                        onChange={handleEditNameChange}
                                        className="bg-white/5 border-white/10 text-white focus-visible:ring-orange-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-slug" className="text-white">Category Slug <span className="text-rose-500">*</span></Label>
                                    <Input
                                        id="edit-slug"
                                        value={editingCategory.slug}
                                        readOnly
                                        className="bg-white/5 border-white/10 text-slate-400 cursor-not-allowed focus-visible:ring-0"
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <Label htmlFor="edit-status" className="text-white">Status <span className="text-rose-500">*</span></Label>
                                    <Switch
                                        id="edit-status"
                                        checked={editingCategory.status}
                                        onCheckedChange={(checked) => setEditingCategory({ ...editingCategory, status: checked })}
                                        className="bg-white/5 border border-white/10 backdrop-blur-sm data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/5"
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" className="bg-slate-800 border-white/10 text-white hover:bg-slate-700 hover:text-white" onClick={() => setEditingCategory(null)}>Cancel</Button>
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Main Sub-Category card */}
                <Card className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 text-white overflow-hidden flex flex-col">
                    <CardContent className="p-0 flex flex-col h-full">
                        {/* Toolbar / Filters */}
                        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10">
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search..."
                                    value={searchTermSub}
                                    onChange={(e) => setSearchTermSub(e.target.value)}
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
                                        <DropdownMenuItem onClick={() => setSelectedCategory('All')} className="focus:bg-white/10 focus:text-white cursor-pointer">All</DropdownMenuItem>
                                        {category.map((cat) => (
                                            <DropdownMenuItem
                                                key={cat.id}
                                                onClick={() => setSelectedCategory(cat.name)}
                                                className="focus:bg-white/10 focus:text-white cursor-pointer"
                                            >
                                                {cat.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white w-full sm:w-32 justify-between">
                                            {selectedStatusSub === 'All' ? 'Status' : selectedStatusSub}
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-slate-900 border-white/10 text-white">
                                        {subCategories.map((status) => (
                                            <DropdownMenuItem
                                                key={status}
                                                onClick={() => setSelectedStatusSub(status)}
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
                                        <TableHead className="text-white">Image</TableHead>
                                        <TableHead className="text-white">Sub Category</TableHead>
                                        <TableHead className="text-white">Category</TableHead>
                                        <TableHead className="text-white">Status</TableHead>
                                        <TableHead className="text-right text-white">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentSubCategory.length > 0 ? (
                                        currentSubCategory.map((sub) => (
                                            <TableRow key={sub.id} className="hover:bg-white/5 transition-colors border-white/5 group">
                                                <TableCell>
                                                    <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/10">
                                                        <img src={sub.image} alt={sub.name} className="h-full w-full object-cover" />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-slate-200">{sub.name}</span>
                                                        <span className="text-xs text-slate-500">{sub.description}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-slate-300">
                                                    {category.find(c => c.id === sub.category_id)?.name || 'Unknown'}
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${sub.status === 'Active'
                                                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                        : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                                                        }`}>
                                                        {sub.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10" onClick={() => handleEditSubClick(sub)}>
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
                                                                        This action cannot be undone. This will permanently delete the sub category
                                                                        <span className="font-medium text-white"> "{sub.name}" </span>
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
                                                No sub-categories found matching your filters.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>




                        {/* Pagination sub*/}
                        <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <span>Row Per Page</span>
                                <Select defaultValue="10" onValueChange={(value) => { setItemsPerPageSub(Number(value)); setCurrentPageSub(1); }}>
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
                                    {filteredSubCategory.length > 0 ? Math.min(startIndexSub + 1, filteredSubCategory.length) : 0} - {Math.min(endIndexSub, filteredSubCategory.length)} of {filteredSubCategory.length}
                                </span>
                                <Pagination className="w-auto">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href="#"
                                                onClick={(e) => { e.preventDefault(); handlePageChangeSub(currentPageSub - 1); }}
                                                className={`text-slate-400 hover:text-white hover:bg-white/10 ${currentPageSub === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                            />
                                        </PaginationItem>

                                        {Array.from({ length: totalPagesSub }, (_, i) => i + 1).map((page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={currentPageSub === page}
                                                    onClick={(e) => { e.preventDefault(); handlePageChangeSub(page); }}
                                                    className={currentPageSub === page ? "text-white bg-orange-500 hover:bg-orange-600 border-none" : "text-slate-400 hover:text-white hover:bg-white/10"}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                href="#"
                                                onClick={(e) => { e.preventDefault(); handlePageChangeSub(currentPageSub + 1); }}
                                                className={`text-slate-400 hover:text-white hover:bg-white/10 ${currentPageSub === totalPagesSub ? 'pointer-events-none opacity-50' : ''}`}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Sub Category Dialog */}
                <Dialog open={isEditSubOpen} onOpenChange={setIsEditSubOpen}>
                    <DialogContent className="max-w-2xl bg-slate-900 border-white/10 text-white">
                        <DialogHeader>
                            <DialogTitle>Edit Sub Category</DialogTitle>
                            <DialogDescription>
                                Update sub category details
                            </DialogDescription>
                        </DialogHeader>
                        <div className="p-4">
                            {editingSubCategory && (
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
                                                <img src={image} alt={`Sub Category ${index + 1}`} className="h-full w-full object-contain rounded-md" />
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="edit-category" className="text-white">Category <span className="text-rose-500">*</span></Label>
                                            <Select
                                                value={editingSubCategory.category_id}
                                                onValueChange={(value) => setEditingSubCategory({ ...editingSubCategory, category_id: value })}
                                            >
                                                <SelectTrigger className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    {category.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id} className="focus:bg-white/10 focus:text-white cursor-pointer">
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="edit-name" className="text-white">Name <span className="text-rose-500">*</span></Label>
                                            <Input
                                                id="edit-name"
                                                value={editingSubCategory.name}
                                                onChange={(e) => setEditingSubCategory({ ...editingSubCategory, name: e.target.value })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="edit-description" className="text-white">Description</Label>
                                            <Input
                                                id="edit-description"
                                                value={editingSubCategory.description}
                                                onChange={(e) => setEditingSubCategory({ ...editingSubCategory, description: e.target.value })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm text-white focus:ring-orange-500 mt-2"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <Label htmlFor="edit-status" className="text-white">Status</Label>
                                            <Switch
                                                id="edit-status"
                                                checked={editingSubCategory.status}
                                                onCheckedChange={(checked) => setEditingSubCategory({ ...editingSubCategory, status: checked })}
                                                className="bg-white/5 border border-white/10 backdrop-blur-sm data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-white/5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" className="bg-slate-800 border-white/10 text-white hover:bg-slate-700 hover:text-white" onClick={() => setIsEditSubOpen(false)}>Cancel</Button>
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
};
export default Category;