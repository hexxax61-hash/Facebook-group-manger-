
import React from 'react';
import { Card } from './ui/Card';
import { useTranslation } from '../context/LanguageContext';
import { View } from '../types';

interface ActionCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, onClick }) => (
    <Card 
        className="bg-gray-800 p-6 group hover:bg-gray-700/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        onClick={onClick}
    >
        <div className="flex items-start">
            <div className="flex-shrink-0 p-3 bg-gray-700 group-hover:bg-cyan-500 rounded-lg text-cyan-400 group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
            <div className="ml-5">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
                <p className="mt-1 text-gray-400">{description}</p>
            </div>
        </div>
    </Card>
);


const Dashboard: React.FC<{ setCurrentView: (view: View) => void; }> = ({ setCurrentView }) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white">{t('dashboard_title')}</h1>
                <p className="mt-2 text-lg text-gray-400">{t('dashboard_subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                <ActionCard 
                    title={t('dashboard_action_publish_title')}
                    description={t('dashboard_action_publish_desc')}
                    icon={<PaperAirplaneIcon />}
                    onClick={() => setCurrentView('publish')}
                />
                <ActionCard 
                    title={t('dashboard_action_manage_title')}
                    description={t('dashboard_action_manage_desc')}
                    icon={<UsersIcon />}
                    onClick={() => setCurrentView('groups')}
                />
            </div>
        </div>
    );
};

const UsersIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PaperAirplaneIcon = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;

export default Dashboard;