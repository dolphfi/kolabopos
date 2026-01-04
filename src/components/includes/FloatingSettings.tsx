import { Button } from "../../components/ui/button";
import { Settings } from "lucide-react";

export function FloatingSettings() {
    return (
        <Button
            size="icon"
            className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600 shadow-xl z-50 transition-transform hover:scale-110"
        >
            <Settings className="h-6 w-6 text-white animate-spin-slow" />
        </Button>
    );
}
