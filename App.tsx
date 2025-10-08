
import React, { useState, useCallback } from 'react';
import { AppProvider } from './context/AppContext';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import GroupManager from './components/GroupManager';
import PostPublisher from './components/PostPublisher';
import ActivityLog from './components/ActivityLog';
import Dashboard from './components/Dashboard';

type View = 'dashboard' | 'groups' | 'publish' | 'logs';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentView, setCurrentView] = useState<View>('dashboard');

    const handleLogin = useCallback(() => {
        setIsAuthenticated(true);
    }, []);

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard />;
            case 'groups':
                return <GroupManager />;
            case 'publish':
                return <PostPublisher />;
            case 'logs':
                return <ActivityLog />;
            default:
                return <Dashboard />;
        }
    };

    if (!isAuthenticated) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <AppProvider>
            <div className="flex h-screen bg-gray-900 text-gray-100">
                <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
                <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                    {renderView()}
                </main>
            </div>
        </AppProvider>
    );
};

export default App;
