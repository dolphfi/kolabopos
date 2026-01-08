import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft, ChevronUp, Printer, RefreshCw } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel";
import { products } from '../../context/data/dataProducts';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="flex items-center justify-center h-full text-white">
                <p>Product not found.</p>
            </div>
        );
    }

    // Ensure images array exists, fallback to main image or placeholder
    const productImages = product.images && product.images.length > 0
        ? product.images
        : [product.image];

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Product Details</h1>
                    <p className="text-sm text-slate-400">Full details of {product.name}</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-auto space-y-4">
                {/* Left Column: Info */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Barcode Section */}
                    <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-md w-fit flex flex-col items-center gap-2">
                                    {/* Mock Barcode */}
                                    <div className="h-12 w-48 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/EAN13.svg/1200px-EAN13.svg.png')] bg-cover bg-center opacity-80 mix-blend-multiply"></div>
                                    <span className="text-white text-sm font-medium tracking-widest">{product.sku}</span>
                                </div>
                            </div>
                            <Button variant="outline" size="icon" className="h-10 w-10 border-white/10 hover:bg-white/10 text-slate-400 hover:text-orange-500">
                                <Printer className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Details Table */}
                    <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden flex-1">
                        <CardContent className="p-0">
                            <div className="divide-y divide-white/10 text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Product</div>
                                    <div className="sm:col-span-3 text-white">{product.name}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Category</div>
                                    <div className="sm:col-span-3 text-white">{product.category}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Sub Category</div>
                                    <div className="sm:col-span-3 text-white">{product.subCategory || 'None'}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Brand</div>
                                    <div className="sm:col-span-3 text-white">{product.brand}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Unit</div>
                                    <div className="sm:col-span-3 text-white">{product.unit}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">SKU</div>
                                    <div className="sm:col-span-3 text-white">{product.sku}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Minimum Qty</div>
                                    <div className="sm:col-span-3 text-white">{product.minQty || 0}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Quantity</div>
                                    <div className="sm:col-span-3 text-white">{product.qty}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Tax</div>
                                    <div className="sm:col-span-3 text-white">{product.tax ? `${product.tax}%` : '0%'}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Discount Type</div>
                                    <div className="sm:col-span-3 text-white">{product.discountType || 'None'}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Price</div>
                                    <div className="sm:col-span-3 text-white">{product.price}</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Status</div>
                                    <div className="sm:col-span-3 text-white">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                            {product.status || 'Active'}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 p-4 hover:bg-white/5 transition-colors">
                                    <div className="text-slate-400 font-medium">Description</div>
                                    <div className="sm:col-span-3 text-slate-300 leading-relaxed">{product.description || 'No description available.'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Carousel */}
                <div className="lg:col-span-1">
                    <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden relative h-fit sticky top-2">
                        <CardContent className="p-6">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {productImages.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <div className="flex items-center justify-center aspect-square bg-slate-900/50 rounded-lg p-6 border border-white/5">
                                                    <img
                                                        src={image}
                                                        alt={`${product.name} ${index + 1}`}
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>
                                                <div className="mt-4 text-center">
                                                    <p className="text-white font-medium">{product.name.toLowerCase().replace(/\s+/g, '_')}_{index + 1}.jpg</p>
                                                    <p className="text-xs text-slate-500">581kb</p>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="flex items-center justify-between mt-4 px-2">
                                    <CarouselPrevious className="static translate-y-0 h-8 w-8 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white" />
                                    <div className="flex gap-1.5">
                                        {productImages.map((_, i) => (
                                            <div key={i} className="h-1.5 w-1.5 rounded-full bg-white/20 first:bg-orange-500"></div>
                                        ))}
                                    </div>
                                    <CarouselNext className="static translate-y-0 h-8 w-8 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white" />
                                </div>
                            </Carousel>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
