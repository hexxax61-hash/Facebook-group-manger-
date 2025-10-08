
import React, { useState } from 'react';
import { Button } from './ui/Button';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const handleLoginClick = () => {
        setLoading(true);
        // Simulate API call for authentication
        setTimeout(() => {
            onLogin();
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-cyan-400">Social Group Manager</h1>
                    <p className="mt-2 text-gray-400">Your ultimate tool for group management.</p>
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-center text-gray-300">
                        To get started, please connect your Facebook and Google Drive accounts. We use these services to manage your groups and log your activity securely.
                    </p>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center p-4 bg-gray-700 rounded-lg">
                            <svg className="w-6 h-6 text-blue-500 mr-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            <span className="font-medium">Facebook Account</span>
                            <span className="ml-auto text-green-400 font-bold text-sm">Required</span>
                        </div>
                        <div className="flex items-center p-4 bg-gray-700 rounded-lg">
                            <svg className="w-6 h-6 text-yellow-400 mr-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.0001 2.00004L1.62512 21.375L12.0001 17.125L22.3751 21.375L12.0001 2.00004Z" /><path d="M12.0001 17.125L1.62512 21.375L6.81262 12L12.0001 17.125Z" fill="#34A853" /><path d="M12 17.125L22.375 21.375L17.1875 12L12 17.125Z" fill="#1A73E8" /></svg>
                            <span className="font-medium">Google Drive</span>
                            <span className="ml-auto text-green-400 font-bold text-sm">Required</span>
                        </div>
                    </div>
                </div>
                <Button onClick={handleLoginClick} disabled={loading} className="w-full">
                    {loading ? 'Connecting...' : 'Connect Accounts & Continue'}
                </Button>
            </div>
        </div>
    );
};

export default LoginScreen;
