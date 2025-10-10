
import React from 'react';
import { useTranslation } from '../context/LanguageContext';

interface HeaderProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
    const { language, setLanguage } = useTranslation();

    const genericHamburgerLine = `h-0.5 w-6 my-1 rounded-full bg-gray-400 transition ease transform duration-300`;

    return (
        <header className="flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 p-4 flex items-center justify-between">
            <button
                onClick={toggleSidebar}
                className="p-2 flex flex-col h-12 w-12 justify-center items-center group"
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
                <div className={`${genericHamburgerLine} ${isSidebarOpen ? "rotate-45 translate-y-2 group-hover:bg-cyan-400" : "group-hover:bg-white"}`} />
                <div className={`${genericHamburgerLine} ${isSidebarOpen ? "opacity-0" : "group-hover:bg-white"}`} />
                <div className={`${genericHamburgerLine} ${isSidebarOpen ? "-rotate-45 -translate-y-2 group-hover:bg-cyan-400" : "group-hover:bg-white"}`} />
            </button>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-sm rounded-md ${language === 'en' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    EN
                </button>
                <button 
                    onClick={() => setLanguage('ar')}
                    className={`px-3 py-1 text-sm rounded-md ${language === 'ar' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    AR
                </button>
            </div>
        </header>
    );
};

export default Header;