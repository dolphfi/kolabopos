import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import {
    LayoutDashboard,
    Users,
    LucideIcon,
    Lock,
    Activity,
    Monitor,
    ShoppingCart,
    Package,
    Layers,
    Megaphone,
    Gift,
    Percent,
    Settings,
    Store,
    Receipt,
    ClockFading,
    Tags,
    LayoutList,
    ShieldCheck,
    Scan,
    History,
    ReceiptText,
    CornerDownLeft,
    ShoppingBasket,
    ShoppingBag,
    HandCoins,
    FileStack,
    Book,
    ChartLine,
    MonitorCog,
    DoorClosedLocked,
    Toolbox
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
                            Inventaire
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
                                                {isSidebarOpen && <span>Produits</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Produits
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
                                            <Link to="/products/expired">
                                                <ClockFading className="mr-2 h-4 w-4" />
                                                Produits Expirés
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/category">
                                                <LayoutList className="mr-2 h-4 w-4" />
                                                Catégories
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/brand">
                                                <Tags className="mr-2 h-4 w-4" />
                                                Marques
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/stock">
                                                <Layers className="mr-2 h-4 w-4" />
                                                Stock
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/warranty">
                                                <ShieldCheck className="mr-2 h-4 w-4" />
                                                Garantie
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/qr-barcode">
                                                <Scan className="mr-2 h-4 w-4" />
                                                QR & Barcode
                                            </Link>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                            <AccordionItem value="module" className="border-b-0">
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
                                                <Toolbox className="mr-2 h-4 w-4" />
                                                Services
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/services">
                                                <Toolbox className="mr-2 h-4 w-4" />
                                                Tous les services
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
                                                {isSidebarOpen && <span>Commandes</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Commandes
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/sales/history">
                                                <History className="mr-2 h-4 w-4" />
                                                Historique de Vente
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/sales/invoices">
                                                <ReceiptText className="mr-2 h-4 w-4" />
                                                Factures
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/sales/returns">
                                                <CornerDownLeft className="mr-2 h-4 w-4" />
                                                Retours
                                            </Link>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Point de Vente */}
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
                                                <Monitor className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
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
                                                <Activity className="mr-2 h-4 w-4" />
                                                Tous les Points
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
                            Marketing & Clients
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

                {/* Module Achat */}
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Achats & Dépenses
                        </h3>
                    )}
                    <div className="space-y-1">
                        <Accordion type="single" collapsible className="w-full" value={openAccordion} onValueChange={setOpenAccordion}>
                            <AccordionItem value="purchases" className="border-b-0">
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
                                                <ShoppingBasket className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Achats</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Achats
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/purchases">
                                                <ShoppingBag className="mr-2 h-4 w-4" />
                                                Achats
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/purchases/expenses">
                                                <HandCoins className="mr-2 h-4 w-4" />
                                                Dépenses
                                            </Link>
                                        </Button>
                                    </div>

                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* Module Rapports */}
                <div className="px-3 py-2">
                    {isSidebarOpen && (
                        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                            Rapports
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
                                                <FileStack className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Rapports</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Rapports
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                                <AccordionContent className="pb-0 pl-10">
                                    <div className="space-y-1 mt-1">
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/reports/sales-report">
                                                <Store className="mr-2 h-4 w-4" />
                                                Rapports de vente
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/reports/purchase-report">
                                                <Receipt className="mr-2 h-4 w-4" />
                                                Rapports d'achat
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/reports/expense-report">
                                                <Book className="mr-2 h-4 w-4" />
                                                Rapport de dépenses
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white" asChild onClick={handleLinkClick}>
                                            <Link to="/reports/profit-loss-report">
                                                <ChartLine className="mr-2 h-4 w-4" />
                                                Profit & Perte
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
                            Administration
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
                                                <Settings className={cn("h-4 w-4", isSidebarOpen ? "mr-2" : "")} />
                                                {isSidebarOpen && <span>Paramètres Généraux</span>}
                                            </div>
                                        </AccordionTrigger>
                                    </TooltipTrigger>
                                    {!isSidebarOpen && (
                                        <TooltipContent side="right" className="flex items-center gap-4">
                                            Paramètres Généraux
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
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                            <MonitorCog className="mr-2 h-4 w-4" />
                                            Système
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                            <Receipt className="mr-2 h-4 w-4" />
                                            Paramètres de Facturation
                                        </Button>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-white/10 hover:text-white">
                                            <DoorClosedLocked className="mr-2 h-4 w-4" />
                                            Parcerel de paiement
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>

            <div className="px-3 py-4 mt-auto">
                <SidebarItem icon={Settings} label="Paramètres" isSidebarOpen={isSidebarOpen} />
            </div>
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
