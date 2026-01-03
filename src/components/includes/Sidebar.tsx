import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import {
    LayoutDashboard,
    Users,
    LucideIcon,
    Shield,
    Lock,
    Activity,
    Monitor,
    FileText,
    ShoppingCart,
    Package,
    PlusCircle,
    Layers,
    Wallet,
    ArrowRightLeft,
    Megaphone,
    Gift,
    Percent,
    Settings,
    Store,
    Receipt,
    Printer,
    Tag
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../components/ui/tooltip"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../components/ui/accordion"
import { Link } from "react-router-dom"
import { useSidebar } from "../layout/SidebarContext";


interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: LucideIcon
    label: string
    isSidebarOpen: boolean
    isActive?: boolean
    expanded?: boolean
    href?: string
}

const SidebarItem = ({ icon: Icon, label, isSidebarOpen, isActive, className, href, ...props }: SidebarItemProps) => {
    const { isMobile, closeSidebar } = useSidebar();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) props.onClick(e);
        if (isMobile && href) {
            closeSidebar();
        }
    }

    const buttonContent = (
        <>
            <Icon className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
            {isSidebarOpen && <span>{label}</span>}
            {!isSidebarOpen && <span className="sr-only">{label}</span>}
        </>
    )

    const buttonClasses = cn(
        "w-full justify-start hover:bg-white/10 hover:text-white",
        !isSidebarOpen && "justify-center px-2",
        isActive && "bg-white/10 text-white",
        isSidebarOpen ? "pl-4" : "",
        className
    )

    if (href) {
        return (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        className={buttonClasses}
                        asChild
                        onClick={handleClick}
                        {...props}
                    >
                        <Link to={href}>
                            {buttonContent}
                        </Link>
                    </Button>
                </TooltipTrigger>
                {!isSidebarOpen && (
                    <TooltipContent side="right" className="flex items-center gap-4">
                        {label}
                    </TooltipContent>
                )}
            </Tooltip>
        )
    }

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    className={buttonClasses}
                    onClick={handleClick}
                    {...props}
                >
                    {buttonContent}
                </Button>
            </TooltipTrigger>
            {!isSidebarOpen && (
                <TooltipContent side="right" className="flex items-center gap-4">
                    {label}
                </TooltipContent>
            )}
        </Tooltip>
    )
}
export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const { isSidebarOpen, toggleSidebar, isMobile, closeSidebar } = useSidebar();
    const [openAccordion, setOpenAccordion] = React.useState<string>("");

    React.useEffect(() => {
        if (!isSidebarOpen) {
            setOpenAccordion("");
        }
    }, [isSidebarOpen]);

    const handleAccordionTriggerClick = () => {
        if (!isSidebarOpen) {
            toggleSidebar();
        }
    };

    const handleLinkClick = () => {
        if (isMobile) closeSidebar();
    };

    const sidebarContent = (
        <div className={cn(
            "bg-black/40 backdrop-blur-xl border-r border-white/10 text-white h-full transition-all duration-300 flex flex-col",
            isMobile
                ? cn("fixed inset-y-0 left-0 z-50 w-64", !isSidebarOpen && "-translate-x-full")
                : cn("relative", isSidebarOpen ? "w-64" : "w-20"),
            className
        )}>
            <div className={cn("h-16 flex items-center border-b border-white/10 shrink-0", isSidebarOpen ? "px-6" : "px-0 justify-center")}>
                <img src="/logo.webp" alt="" className="w-8 h-8" />
                {isSidebarOpen && (
                    <h2 className="text-lg font-semibold tracking-tight ml-2 text-white mr-auto">
                        Kolabo POS
                    </h2>
                )}
            </div>

            <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Général
                        </h3>
                    )}
                    <div className="space-y-1">
                        <SidebarItem icon={LayoutDashboard} label="Tableau de bord" href="/dashboard" isSidebarOpen={isSidebarOpen} />
                    </div>
                </div>


                {/* Module Produits */}
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Produits
                        </h3>
                    )}
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                            <AccordionItem value="produits" className="border-b-0">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <AccordionTrigger
                                            className={cn(
                                                "py-2 hover:bg-white/10 hover:text-white hover:no-underline rounded-md px-4 text-sm font-medium",
                                                !isSidebarOpen && "justify-center px-2 [&>svg]:hidden"
                                            )}
                                            onClick={handleAccordionTriggerClick}
                                        >
                                            <div className="flex items-center">
                                                <Package className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Catalogue</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Catalogue
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/products">
                                                <Package className="mr-2 h-4 w-4" />
                                                Tous les produits
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/categories">
                                                <Tag className="mr-2 h-4 w-4" />
                                                Catégories
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/products/add">
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Ajouter un produit
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/inventory">
                                                <Layers className="mr-2 h-4 w-4" />
                                                Stock & Inventaire
                                            </Link>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Module Vente (POS) */}
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Vente
                        </h3>
                    )}
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                            <AccordionItem value="vente" className="border-b-0">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <AccordionTrigger
                                            className={cn(
                                                "py-2 hover:bg-white/10 hover:text-white hover:no-underline rounded-md px-4 text-sm font-medium",
                                                !isSidebarOpen && "justify-center px-2 [&>svg]:hidden"
                                            )}
                                            onClick={handleAccordionTriggerClick}
                                        >
                                            <div className="flex items-center">
                                                <ShoppingCart className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Point de Vente</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Point de Vente
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/pos">
                                                <Monitor className="mr-2 h-4 w-4" />
                                                Terminal de Caisse
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/pos/orders">
                                                <FileText className="mr-2 h-4 w-4" />
                                                Commandes
                                            </Link>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Module Caisse */}
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Caisse
                        </h3>
                    )}
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                            <AccordionItem value="caisse" className="border-b-0">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <AccordionTrigger
                                            className={cn(
                                                "py-2 hover:bg-white/10 hover:text-white hover:no-underline rounded-md px-4 text-sm font-medium",
                                                !isSidebarOpen && "justify-center px-2 [&>svg]:hidden"
                                            )}
                                            onClick={handleAccordionTriggerClick}
                                        >
                                            <div className="flex items-center">
                                                <Wallet className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Gestion Caisse</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Gestion Caisse
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/pos/sessions">
                                                <Activity className="mr-2 h-4 w-4" />
                                                Sessions
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/pos/movements">
                                                <ArrowRightLeft className="mr-2 h-4 w-4" />
                                                Mouvements
                                            </Link>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Module Marketing & Clients */}
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Marketing
                        </h3>
                    )}
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                            <AccordionItem value="marketing" className="border-b-0">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <AccordionTrigger
                                            className={cn(
                                                "py-2 hover:bg-white/10 hover:text-white hover:no-underline rounded-md px-4 text-sm font-medium",
                                                !isSidebarOpen && "justify-center px-2 [&>svg]:hidden"
                                            )}
                                            onClick={handleAccordionTriggerClick}
                                        >
                                            <div className="flex items-center">
                                                <Megaphone className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Marketing</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Marketing
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/clients">
                                                <Users className="mr-2 h-4 w-4" />
                                                Clients
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/marketing/rewards">
                                                <Gift className="mr-2 h-4 w-4" />
                                                Fidélité
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/marketing/promos">
                                                <Percent className="mr-2 h-4 w-4" />
                                                Promotions
                                            </Link>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Module Configuration */}
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Configuration
                        </h3>
                    )}
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                            <AccordionItem value="settings" className="border-b-0">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <AccordionTrigger
                                            className={cn(
                                                "py-2 hover:bg-white/10 hover:text-white hover:no-underline rounded-md px-4 text-sm font-medium",
                                                !isSidebarOpen && "justify-center px-2 [&>svg]:hidden"
                                            )}
                                            onClick={handleAccordionTriggerClick}
                                        >
                                            <div className="flex items-center">
                                                <Settings className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Paramètres</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Paramètres
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/settings/general">
                                                <Store className="mr-2 h-4 w-4" />
                                                Boutique
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/settings/receipts">
                                                <Receipt className="mr-2 h-4 w-4" />
                                                Reçus
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/settings/devices">
                                                <Printer className="mr-2 h-4 w-4" />
                                                Périphériques
                                            </Link>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Administration */}
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Système
                        </h3>
                    )}
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                            <AccordionItem value="admin" className="border-b-0">
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <AccordionTrigger
                                            className={cn(
                                                "py-2 hover:bg-white/10 hover:text-white hover:no-underline rounded-md px-4 text-sm font-medium",
                                                !isSidebarOpen && "justify-center px-2 [&>svg]:hidden"
                                            )}
                                            onClick={handleAccordionTriggerClick}
                                        >
                                            <div className="flex items-center">
                                                <Shield className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Administration</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Administration
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                            <Lock className="mr-2 h-4 w-4" />
                                            Rôles & Permissions
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                            <Activity className="mr-2 h-4 w-4" />
                                            Journal d'audit
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                            <Users className="mr-2 h-4 w-4" />
                                            Utilisateurs
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                            <Monitor className="mr-2 h-4 w-4" />
                                            Surveillance
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>

            {/* <div className="px-3 py-4 mt-auto">
                    <SidebarItem icon={Settings} label="Paramètres" isSidebarOpen={isSidebarOpen} />
                </div> */}
        </div>
    )

    return (
        <TooltipProvider>
            <>
                {isMobile && isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
                        onClick={closeSidebar}
                    />
                )}
                {sidebarContent}
            </>
        </TooltipProvider>
    )
}
