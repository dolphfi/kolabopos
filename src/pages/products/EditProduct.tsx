import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { ArrowLeft, RefreshCw, ChevronUp, Image as ImageIcon, Plus, Info, LifeBuoy, List, Bold, Italic, Underline, Link as LinkIcon, ListOrdered, Type, ChevronsUpDown, CirclePlus, Trash2, Minus, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { DatePickerInput } from '../../components/custom/date-picker-input';
import { products } from '../../context/data/dataProducts';

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState(products.find(p => p.id === id) || products[0]);

    // Form State
    const [description, setDescription] = useState(product?.description || '');
    const [productType, setProductType] = useState('single');
    const [manufacturedDate, setManufacturedDate] = useState<Date | undefined>(new Date());
    const [expiryDate, setExpiryDate] = useState<Date | undefined>(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    const [images, setImages] = useState<string[]>(product?.images || []);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Update state when ID changes or product is found
    useEffect(() => {
        const foundProduct = products.find(p => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setDescription(foundProduct.description || '');
            setImages(foundProduct.images || []);
            // In a real app, we would parse other fields here too
        }
    }, [id]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length <= 100) {
            setDescription(newText);
        }
    };

    if (!product) return <div>Product not found</div>;

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Edit Product</h1>
                    <p className="text-sm text-slate-400">Edit {product.name}</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-white/10 hover:text-white" title="Reset">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-white/10 hover:text-white" title="Collapse">
                        <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Link to="/products">
                        <Button className="bg-slate-900 border border-white/10 text-white hover:bg-slate-800 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Accordion Sections */}
            <div className="flex-1 overflow-auto space-y-4">
                <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3", "item-4"]} className="space-y-4">

                    {/* Product Information */}
                    <AccordionItem value="item-1" className="bg-slate-900 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden data-[state=open]:pb-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2 text-white font-medium">
                                <Info className="h-4 w-4 text-orange-500" />
                                Product Information
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2 text-slate-400">
                            {/* Placeholder for form fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Store & Warehouse */}
                                <div className="space-y-2">
                                    <Label className="text-white">Store <span className="text-red-500">*</span></Label>
                                    <Select defaultValue="store1">
                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="store1" className="focus:bg-white/10 focus:text-white">Store 1</SelectItem>
                                            <SelectItem value="store2" className="focus:bg-white/10 focus:text-white">Store 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white">Warehouse <span className="text-red-500">*</span></Label>
                                    <Select defaultValue="warehouse1">
                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="warehouse1" className="focus:bg-white/10 focus:text-white">Warehouse 1</SelectItem>
                                            <SelectItem value="warehouse2" className="focus:bg-white/10 focus:text-white">Warehouse 2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Product Name & Slug */}
                                <div className="space-y-2">
                                    <Label className="text-white">Product Name <span className="text-red-500">*</span></Label>
                                    <Input key={product.id} type="text" defaultValue={product.name} className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white">Slug <span className="text-red-500">*</span></Label>
                                    <Input key={product.id} type="text" defaultValue={product.name.toLowerCase().replace(/ /g, '-')} className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                </div>

                                {/* SKU & Selling Type */}
                                <div className="space-y-2">
                                    <Label className="text-white">SKU <span className="text-red-500">*</span></Label>
                                    <div className="relative">
                                        <Input key={product.id} type="text" defaultValue={product.sku} className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0 pr-24" />
                                        <Button className="absolute right-1 top-1 h-8 px-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded transition-colors">
                                            Generate
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white">Selling Type <span className="text-red-500">*</span></Label>
                                    <Select defaultValue="retail">
                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="retail" className="focus:bg-white/10 focus:text-white">Retail</SelectItem>
                                            <SelectItem value="wholesale" className="focus:bg-white/10 focus:text-white">Wholesale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Category & Sub Category */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-white">Category <span className="text-red-500">*</span></Label>
                                        <span className="text-xs text-orange-500 cursor-pointer hover:underline flex items-center gap-1">
                                            <CirclePlus className="h-3 w-3" /> Add New
                                        </span>
                                    </div>
                                    <Select key={product.category} defaultValue={product.category.toLowerCase()}>
                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="computers" className="focus:bg-white/10 focus:text-white">Computers</SelectItem>
                                            <SelectItem value="electronics" className="focus:bg-white/10 focus:text-white">Electronics</SelectItem>
                                            <SelectItem value="clothing" className="focus:bg-white/10 focus:text-white">Clothing</SelectItem>
                                            <SelectItem value="shoe" className="focus:bg-white/10 focus:text-white">Shoe</SelectItem>
                                            <SelectItem value="furnitures" className="focus:bg-white/10 focus:text-white">Furnitures</SelectItem>
                                            <SelectItem value="bags" className="focus:bg-white/10 focus:text-white">Bags</SelectItem>

                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white">Sub Category <span className="text-red-500">*</span></Label>
                                    <Select key={product.subCategory} defaultValue={product.subCategory?.toLowerCase() || "none"}>
                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="none" className="focus:bg-white/10 focus:text-white">None</SelectItem>
                                            <SelectItem value="laptops" className="focus:bg-white/10 focus:text-white">Laptops</SelectItem>
                                            <SelectItem value="headphones" className="focus:bg-white/10 focus:text-white">Headphones</SelectItem>
                                            <SelectItem value="sneakers" className="focus:bg-white/10 focus:text-white">Sneakers</SelectItem>
                                            <SelectItem value="watches" className="focus:bg-white/10 focus:text-white">Watches</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Brand & Unit */}
                                <div className="space-y-2">
                                    <Label className="text-white">Brand <span className="text-red-500">*</span></Label>
                                    <Select key={product.brand} defaultValue={product.brand.toLowerCase()}>
                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="lenovo" className="focus:bg-white/10 focus:text-white">Lenovo</SelectItem>
                                            <SelectItem value="apple" className="focus:bg-white/10 focus:text-white">Apple</SelectItem>
                                            <SelectItem value="nike" className="focus:bg-white/10 focus:text-white">Nike</SelectItem>
                                            <SelectItem value="amazon" className="focus:bg-white/10 focus:text-white">Amazon</SelectItem>
                                            <SelectItem value="dior" className="focus:bg-white/10 focus:text-white">Dior</SelectItem>
                                            <SelectItem value="beats" className="focus:bg-white/10 focus:text-white">Beats</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white">Unit <span className="text-red-500">*</span></Label>
                                    <Select key={product.unit} defaultValue={product.unit.toLowerCase()}>
                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="pc" className="focus:bg-white/10 focus:text-white">Piece</SelectItem>
                                            <SelectItem value="kg" className="focus:bg-white/10 focus:text-white">Kilogram</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Barcode Symbology & Item Barcode */}
                                <div className="space-y-2">
                                    <Label className="text-white">Barcode Symbology <span className="text-red-500">*</span></Label>
                                    <Select defaultValue="code128">
                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                            <SelectItem value="code128" className="focus:bg-white/10 focus:text-white">Code 128</SelectItem>
                                            <SelectItem value="ean13" className="focus:bg-white/10 focus:text-white">EAN-13</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white">Item Barcode <span className="text-red-500">*</span></Label>
                                    <div className="relative">
                                        <Input type="text" defaultValue="123456789" className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0 pr-24" />
                                        <Button className="absolute right-1 top-1 h-8 px-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded transition-colors">
                                            Generate
                                        </Button>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label className="text-white">Description</Label>
                                    <div className="rounded-md border border-white/10 bg-slate-900 overflow-hidden">
                                        {/* Toolbar Mockup */}
                                        <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-white/5 flex-wrap">
                                            <Button variant="ghost" size="sm" className="flex items-center gap-2 h-7 px-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded">
                                                Normal
                                                <ChevronsUpDown className="h-3 w-3 opacity-50" />
                                            </Button>
                                            <div className="w-px h-4 bg-white/10 mx-1"></div>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10 text-slate-400 hover:text-white" title="Bold">
                                                <Bold className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10 text-slate-400 hover:text-white" title="Italic">
                                                <Italic className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10 text-slate-400 hover:text-white" title="Underline">
                                                <Underline className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10 text-slate-400 hover:text-white" title="Link">
                                                <LinkIcon className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10 text-slate-400 hover:text-white" title="Unordered List">
                                                <List className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10 text-slate-400 hover:text-white" title="Ordered List">
                                                <ListOrdered className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10 text-slate-400 hover:text-white" title="Clear Formatting">
                                                <Type className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Textarea
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            className="flex min-h-[120px] w-full bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/50 focus-visible:ring-offset-0 border-none focus-visible:outline-none"
                                            placeholder="Product Description..."
                                        />
                                        <div className={`px-3 py-1 text-xs border-t border-white/10 text-right ${description.length >= 100 ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                                            {description.length} / 100 Characters
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Pricing & Stocks */}
                    <AccordionItem value="item-2" className="bg-slate-900 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2 text-white font-medium">
                                <LifeBuoy className="h-4 w-4 text-orange-500" />
                                Pricing & Stocks
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2 text-slate-400">
                            <div className="space-y-6">
                                {/* Product Type */}
                                <div className="space-y-2">
                                    <Label className="text-white">Product Type <span className="text-red-500">*</span></Label>
                                    <RadioGroup value={productType} onValueChange={setProductType} className="flex items-center gap-6">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="single" id="single" />
                                            <Label htmlFor="single" className={`cursor-pointer font-medium ${productType === 'single' ? 'text-white' : 'text-slate-400'}`}>Single Product</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="variable" id="variable" />
                                            <Label htmlFor="variable" className={`cursor-pointer font-medium ${productType === 'variable' ? 'text-white' : 'text-slate-400'}`}>Variable Product</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {productType === 'single' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Quantity */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Quantity <span className="text-red-500">*</span></Label>
                                            <Input key={product.id} type="text" defaultValue={product.qty} className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                        </div>

                                        {/* Price */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Price <span className="text-red-500">*</span></Label>
                                            <Input key={product.id} type="text" defaultValue={product.price} className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                        </div>

                                        {/* Tax Type */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Tax Type <span className="text-red-500">*</span></Label>
                                            <Select defaultValue="exclusive">
                                                <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    <SelectItem value="inclusive" className="focus:bg-white/10 focus:text-white">Inclusive</SelectItem>
                                                    <SelectItem value="exclusive" className="focus:bg-white/10 focus:text-white">Exclusive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Tax */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Tax <span className="text-red-500">*</span></Label>
                                            <Select key={product.tax} defaultValue={product.tax || "0"}>
                                                <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    <SelectItem value="0" className="focus:bg-white/10 focus:text-white">0%</SelectItem>
                                                    <SelectItem value="10" className="focus:bg-white/10 focus:text-white">10%</SelectItem>
                                                    <SelectItem value="15" className="focus:bg-white/10 focus:text-white">15%</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Discount Type */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Discount Type <span className="text-red-500">*</span></Label>
                                            <Select key={product.discountType} defaultValue={product.discountType?.toLowerCase() || "percentage"}>
                                                <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                    <SelectItem value="percentage" className="focus:bg-white/10 focus:text-white">Percentage</SelectItem>
                                                    <SelectItem value="fixed" className="focus:bg-white/10 focus:text-white">Fixed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Discount Value */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Discount Value <span className="text-red-500">*</span></Label>
                                            <Input key={product.id} type="text" defaultValue={product.discountValue || "0"} className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                        </div>

                                        {/* Quantity Alert */}
                                        <div className="space-y-2">
                                            <Label className="text-white">Quantity Alert <span className="text-red-500">*</span></Label>
                                            <Input key={product.id} type="text" defaultValue={product.minQty || "5"} className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-white">Variant Attribute <span className="text-red-500">*</span></Label>
                                                <div className="flex gap-2">
                                                    <Select>
                                                        <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                                            <SelectValue placeholder="Choose" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                            <SelectItem value="color" className="focus:bg-white/10 focus:text-white">Color</SelectItem>
                                                            <SelectItem value="size" className="focus:bg-white/10 focus:text-white">Size</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Button className="bg-slate-800 border border-white/10 hover:bg-slate-700 px-3">
                                                        <CirclePlus className="h-5 w-5 text-white" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-lg border border-white/10 overflow-x-auto bg-slate-900/50">
                                            <Table>
                                                <TableHeader className="bg-slate-900 border-b border-white/10">
                                                    <TableRow className="hover:bg-transparent border-white/10">
                                                        <TableHead className="text-white w-[15%]">Variantion</TableHead>
                                                        <TableHead className="text-white w-[20%]">Variant Value</TableHead>
                                                        <TableHead className="text-white w-[15%]">SKU</TableHead>
                                                        <TableHead className="text-white w-[20%]">Quantity</TableHead>
                                                        <TableHead className="text-white w-[15%]">Price</TableHead>
                                                        <TableHead className="text-white w-[15%]">Action</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {/* Row 1 */}
                                                    <TableRow className="hover:bg-transparent border-white/10">
                                                        <TableCell>
                                                            <Input value="color" readOnly className="h-9 bg-slate-900 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input value="red" readOnly className="h-9 bg-slate-900 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input value="1234" className="h-9 bg-slate-900 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center border border-white/10 rounded-md overflow-hidden bg-slate-900">
                                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none hover:bg-white/10 text-slate-400 hover:text-white"><Minus className="h-3 w-3" /></Button>
                                                                <Input type="text" value="2" className="w-full h-9 bg-transparent text-center text-sm text-white border-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0 rounded-none shadow-none" />
                                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none hover:bg-white/10 text-slate-400 hover:text-white"><Plus className="h-3 w-3" /></Button>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input value="50000" className="h-9 bg-slate-900 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-8 w-8 flex items-center justify-center">
                                                                    <Checkbox defaultChecked className="h-5 w-5 border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                                                                </div>
                                                                <div className="h-8 w-8 flex items-center justify-center rounded border border-white/10 hover:bg-white/10 text-white cursor-pointer transition-colors">
                                                                    <Plus className="h-4 w-4" />
                                                                </div>
                                                                <div className="h-8 w-8 flex items-center justify-center rounded border border-white/10 hover:bg-red-500/20 text-red-500 cursor-pointer transition-colors">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>

                                                    {/* Row 2 */}
                                                    <TableRow className="hover:bg-transparent border-white/10">
                                                        <TableCell>
                                                            <Input value="color" readOnly className="h-9 bg-slate-900 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input value="black" readOnly className="h-9 bg-slate-900 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input value="2345" className="h-9 bg-slate-900 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center border border-white/10 rounded-md overflow-hidden bg-slate-900">
                                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none hover:bg-white/10 text-slate-400 hover:text-white"><Minus className="h-3 w-3" /></Button>
                                                                <Input type="text" value="3" className="w-full h-9 bg-transparent text-center text-sm text-white border-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0 rounded-none shadow-none" />
                                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none hover:bg-white/10 text-slate-400 hover:text-white"><Plus className="h-3 w-3" /></Button>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Input value="50000" className="h-9 bg-slate-900 border-white/10 text-white focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-8 w-8 flex items-center justify-center">
                                                                    <Checkbox defaultChecked className="h-5 w-5 border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                                                                </div>
                                                                <div className="h-8 w-8 flex items-center justify-center rounded border border-white/10 hover:bg-white/10 text-white cursor-pointer transition-colors">
                                                                    <Plus className="h-4 w-4" />
                                                                </div>
                                                                <div className="h-8 w-8 flex items-center justify-center rounded border border-white/10 hover:bg-red-500/20 text-red-500 cursor-pointer transition-colors">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Images */}
                    <AccordionItem value="item-3" className="bg-slate-900 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2 text-white font-medium">
                                <ImageIcon className="h-4 w-4 text-orange-500" />
                                Images
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2 text-slate-400">
                            <div className="flex flex-wrap gap-4">
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
                                        <img src={image} alt={`Product ${index + 1}`} className="h-full w-full object-contain rounded-md" />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-1 right-1 h-4 w-4 rounded shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Custom Fields */}
                    <AccordionItem value="item-4" className="bg-slate-900 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2 text-white font-medium">
                                <List className="h-4 w-4 text-orange-500" />
                                Custom Fields
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-6 text-slate-400">
                            <div className="space-y-6">
                                {/* Checkboxes Row */}
                                <div className="flex items-center gap-6 p-4 border border-white/10 rounded-lg bg-white/5">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="warranties" checked className="border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                                        <Label
                                            htmlFor="warranties"
                                            className="text-slate-400"
                                        >
                                            Warranties
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="manufacturer" checked className="border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                                        <Label
                                            htmlFor="manufacturer"
                                            className="text-slate-400"
                                        >
                                            Manufacturer
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="expiry" checked className="border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500" />
                                        <Label
                                            htmlFor="expiry"
                                            className="text-slate-400"
                                        >
                                            Expiry
                                        </Label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Warranty */}
                                    <div className="space-y-2">
                                        <Label className="text-white">Warranty <span className="text-red-500">*</span></Label>
                                        <Select defaultValue="basic">
                                            <SelectTrigger className="w-full bg-slate-900 border-white/10 text-white focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-0">
                                                <SelectValue placeholder="Select Warranty Plan" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                <SelectItem value="basic" className="focus:bg-white/10 focus:text-white">Basic Warranty</SelectItem>
                                                <SelectItem value="extended" className="focus:bg-white/10 focus:text-white">Extended Warranty</SelectItem>
                                                <SelectItem value="accidental" className="focus:bg-white/10 focus:text-white">Accidental Protection Plan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Manufacturer */}
                                    <div className="space-y-2">
                                        <Label className="text-white">Manufacturer <span className="text-red-500">*</span></Label>
                                        <Input type="text" defaultValue="Apple Inc." className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0" />
                                    </div>

                                    {/* Manufactured Date */}
                                    <div className="space-y-2">
                                        <DatePickerInput
                                            id="manufactured-date"
                                            label="Manufactured Date"
                                            date={manufacturedDate}
                                            onDateChange={setManufacturedDate}
                                        />
                                    </div>
                                    {/* Expiry On */}
                                    <div className="space-y-2">
                                        <DatePickerInput
                                            id="expiry-on"
                                            label="Expiry On"
                                            date={expiryDate}
                                            onDateChange={setExpiryDate}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 mt-8 pb-4">
                    <Button variant="outline" className="bg-slate-900 border-white/10 text-white hover:bg-slate-800">
                        Cancel
                    </Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
