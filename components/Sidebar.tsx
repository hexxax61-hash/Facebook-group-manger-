
import React from 'react';
import { View } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface SidebarProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    isOpen: boolean;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
    isOpen: boolean;
}> = ({ icon, label, isActive, onClick, isOpen }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
        >
            {icon}
            <span className={`ml-4 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
        </button>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen }) => {
    const { t } = useTranslation();

    const navItems = [
        { id: 'dashboard', label: t('nav_dashboard'), icon: <HomeIcon /> },
        { id: 'groups', label: t('nav_group_manager'), icon: <UsersIcon /> },
        { id: 'publish', label: t('nav_post_publisher'), icon: <PaperAirplaneIcon /> },
        { id: 'logs', label: t('nav_activity_log'), icon: <DocumentTextIcon /> },
    ];
    
    const settingsItem = { id: 'settings', label: t('nav_settings'), icon: <CogIcon /> };

    return (
        <aside className={`bg-gray-800 p-4 flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className={`flex items-center mb-10 px-2 ${!isOpen && 'justify-center'}`}>
                <svg className="w-8 h-8 text-cyan-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H7.5A2.25 2.25 0 005.25 7.5v9.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <h1 className={`text-xl font-bold ml-2 text-white transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Social Manager</h1>
            </div>
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavItem
                        key={item.id}
                        label={item.label}
                        icon={item.icon}
                        isActive={currentView === item.id}
                        onClick={() => setCurrentView(item.id as View)}
                        isOpen={isOpen}
                    />
                ))}
            </nav>
            <div className="space-y-2">
                <NavItem
                    key={settingsItem.id}
                    label={settingsItem.label}
                    icon={settingsItem.icon}
                    isActive={currentView === settingsItem.id}
                    onClick={() => setCurrentView(settingsItem.id as View)}
                    isOpen={isOpen}
                />
                 <div className={`p-3 bg-gray-700/50 rounded-lg overflow-hidden ${!isOpen && 'p-2'}`}>
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full flex-shrink-0" src="https://picsum.photos/seed/user/100/100" alt="User" />
                        <div className={`ml-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <p className="text-sm font-semibold text-white whitespace-nowrap">Jane Doe</p>
                            <p className="text-xs text-gray-400 whitespace-nowrap">jane.doe@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023-.19-2.357-1.462-2.357-1.272 0-2.033 1.334-1.462 2.357m12.452 0c.57-1.023-.19-2.357-1.462-2.357-1.272 0-2.033 1.334-1.462 2.357m-6.897 1.653c.225.485.364.996.364 1.535A4.502 4.502 0 0112 21.75a4.502 4.502 0 01-4.136-3.033m10.272-4.195c-.225.485-.364.996-.364 1.535a4.502 4.502 0 01-4.136 3.033m-7.5-2.962c-.57 1.023.19 2.357 1.462 2.357 1.272 0 2.033-1.334 1.462-2.357m-3.34-4.782c-.57-1.023.19-2.357 1.462-2.357 1.272 0 2.033 1.334 1.462-2.357" /></svg>;
const PaperAirplaneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5" /></svg>;

export default Sidebar;
