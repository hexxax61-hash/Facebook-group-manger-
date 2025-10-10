
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { useTranslation } from '../context/LanguageContext';

const SocialAccount: React.FC<{ name: string; icon: React.ReactNode }> = ({ name, icon }) => (
    <div className="flex items-center p-4 bg-gray-700 rounded-lg">
        {icon}
        <span className="font-medium">{name}</span>
        <span className="ml-auto text-green-400 font-bold text-sm">Required</span>
    </div>
);

const LoginScreen: React.FC<{ onLogin: () => void; }> = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleLoginClick = () => {
        setLoading(true);
        setTimeout(() => {
            onLogin();
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-cyan-400">{t('login_title')}</h1>
                    <p className="mt-2 text-gray-400">{t('login_subtitle')}</p>
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-center text-gray-300">{t('login_instructions')}</p>
                    <div className="flex flex-col space-y-4">
                        <SocialAccount name="Facebook" icon={<svg className="w-6 h-6 text-blue-500 mr-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>} />
                        <SocialAccount name="Twitter (X)" icon={<svg className="w-6 h-6 text-gray-300 mr-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>} />
                        <SocialAccount name="LinkedIn" icon={<svg className="w-6 h-6 text-blue-400 mr-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 114.75 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>} />
                        <SocialAccount name="Instagram" icon={<svg className="w-6 h-6 text-pink-500 mr-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.802c-3.116 0-3.483.01-4.71.068-2.68.122-3.832 1.27-3.955 3.955-.058 1.226-.068 1.593-.068 4.71s.01 3.484.068 4.71c.122 2.68 1.27 3.833 3.955 3.955 1.227.058 1.593.068 4.71.068s3.484-.01 4.71-.068c2.68-.122 3.833-1.27 3.955-3.955.058-1.226.068-1.593.068-4.71s-.01-3.484-.068-4.71c-.122-2.68-1.27-3.832-3.955-3.955-1.227-.058-1.593-.068-4.71-.068zm0 4.418c-2.404 0-4.35 1.946-4.35 4.35s1.946 4.35 4.35 4.35 4.35-1.946 4.35-4.35-1.946-4.35-4.35-4.35zm0 7.098c-1.518 0-2.75-1.232-2.75-2.75s1.232-2.75 2.75-2.75 2.75 1.232 2.75 2.75-1.232 2.75-2.75 2.75zm4.91-7.85c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" /></svg>} />
                        <SocialAccount name="TikTok" icon={<svg className="w-6 h-6 text-cyan-300 mr-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.69-2.81-1.77-1.8-2.6-4.28-2.5-6.75s.76-4.67 2.48-6.41c1.77-1.76 4.2-2.61 6.6-2.52h.01z" /></svg>} />
                        <SocialAccount name="Google Drive" icon={<svg className="w-6 h-6 text-yellow-400 mr-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.0001 2.00004L1.62512 21.375L12.0001 17.125L22.3751 21.375L12.0001 2.00004Z" /><path d="M12.0001 17.125L1.62512 21.375L6.81262 12L12.0001 17.125Z" fill="#34A853" /><path d="M12 17.125L22.375 21.375L17.1875 12L12 17.125Z" fill="#1A73E8" /></svg>} />
                    </div>
                </div>
                <Button onClick={handleLoginClick} disabled={loading} className="w-full">
                    {loading ? t('login_connecting') : t('login_connect_button')}
                </Button>
            </div>
        </div>
    );
};

export default LoginScreen;