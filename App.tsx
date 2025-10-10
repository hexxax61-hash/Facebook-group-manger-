
import React, { useState, useCallback } from 'react';
import { AppProvider } from './context/AppContext';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GroupManager from './components/GroupManager';
import PostPublisher from './components/PostPublisher';
import ActivityLog from './components/ActivityLog';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import { View } from './types';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const handleLogin = useCallback(() => {
        setIsAuthenticated(true);
    }, []);
    
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard setCurrentView={setCurrentView} />;
            case 'groups':
                return <GroupManager />;
            case 'publish':
                return <PostPublisher />;
            case 'logs':
                return <ActivityLog />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard setCurrentView={setCurrentView} />;
        }
    };

    if (!isAuthenticated) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <AppProvider>
            <div className="flex h-screen bg-gray-900 text-gray-100">
                <Sidebar 
                    currentView={currentView} 
                    setCurrentView={setCurrentView} 
                    isOpen={isSidebarOpen} 
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header 
                        isSidebarOpen={isSidebarOpen} 
                        toggleSidebar={toggleSidebar} 
                    />
                    <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                        {renderView()}
                    </main>
                </div>
            </div>
        </AppProvider>
    );
};

export default App;