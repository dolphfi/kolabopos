import React from 'react';

export const SystemsFooter: React.FC = () => {
    return (
        <footer className="py-2 px-6 border-t border-white/10 bg-black/40 backdrop-blur-xl z-30 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400/60">
            <div>
                <p>2024 - {new Date().getFullYear()} &copy; KolaboPOS. All Right Reserved</p>
            </div>
            <div>
                <p>Designed & Developed By <a href="https://kolabotech.com" target="_blank" rel="noopener noreferrer" className="text-orange-500/80 font-medium cursor-pointer hover:text-orange-500">Kolabo Tech</a></p>
            </div>
        </footer>
    );
};
