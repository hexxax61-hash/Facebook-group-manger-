
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { PublishTarget, Platform } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Checkbox } from './ui/Checkbox';
import { useTranslation } from '../context/LanguageContext';

const PlatformIcon: React.FC<{ platform: Platform; className?: string }> = ({ platform, className = "w-5 h-5" }) => {
    const icons: Record<Platform, React.ReactNode> = {
        Facebook: <svg className={`${className} text-blue-500`} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>,
        Twitter: <svg className={`${className} text-gray-300`} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
        LinkedIn: <svg className={`${className} text-blue-400`} fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 114.75 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>,
        Instagram: <svg className={`${className} text-pink-500`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.802c-3.116 0-3.483.01-4.71.068-2.68.122-3.832 1.27-3.955 3.955-.058 1.226-.068 1.593-.068 4.71s.01 3.484.068 4.71c.122 2.68 1.27 3.833 3.955 3.955 1.227.058 1.593.068 4.71.068s3.484-.01 4.71-.068c2.68-.122 3.833-1.27 3.955-3.955.058-1.226.068-1.593.068-4.71s-.01-3.484-.068-4.71c-.122-2.68-1.27-3.832-3.955-3.955-1.227-.058-1.593-.068-4.71-.068zm0 4.418c-2.404 0-4.35 1.946-4.35 4.35s1.946 4.35 4.35 4.35 4.35-1.946 4.35-4.35-1.946-4.35-4.35-4.35zm0 7.098c-1.518 0-2.75-1.232-2.75-2.75s1.232-2.75 2.75-2.75 2.75 1.232 2.75 2.75-1.232 2.75-2.75 2.75zm4.91-7.85c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" /></svg>,
        TikTok: <svg className={`${className} text-cyan-300`} fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.69-2.81-1.77-1.8-2.6-4.28-2.5-6.75s.76-4.67 2.48-6.41c1.77-1.76 4.2-2.61 6.6-2.52h.01z" /></svg>,
    };
    return icons[platform] || null;
};

const platforms: Platform[] = ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'TikTok'];

const GroupManager: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const { t } = useTranslation();
    const [selectedTargets, setSelectedTargets] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [platformFilter, setPlatformFilter] = useState<Platform | 'All'>('All');

    const filteredTargets = useMemo(() => {
        return state.targets.filter(target => {
            const matchesSearch = target.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPlatform = platformFilter === 'All' || target.platform === platformFilter;
            return matchesSearch && matchesPlatform;
        });
    }, [state.targets, searchTerm, platformFilter]);

    const handleToggle = (id: string) => {
        const newSelection = new Set(selectedTargets);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedTargets(newSelection);
    };

    const handleSelectAll = () => {
        if (selectedTargets.size === filteredTargets.length) {
            setSelectedTargets(new Set());
        } else {
            setSelectedTargets(new Set(filteredTargets.map(g => g.id)));
        }
    };

    const handleRemoveSelected = () => {
        if (selectedTargets.size > 0) {
            dispatch({ type: 'REMOVE_TARGETS', payload: Array.from(selectedTargets) });
            setSelectedTargets(new Set());
        }
    };
    
    const isAllSelected = selectedTargets.size > 0 && selectedTargets.size === filteredTargets.length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h1 className="text-4xl font-bold text-white">{t('group_manager_title')}</h1>
                <Button 
                    variant="destructive"
                    onClick={handleRemoveSelected}
                    disabled={selectedTargets.size === 0}
                >
                    {t('group_manager_remove_button', { count: selectedTargets.size })}
                </Button>
            </div>

            <Card className="bg-gray-800 p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                    <div className="relative w-full sm:w-auto">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            type="text"
                            placeholder={t('group_manager_filter_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none w-full"
                        />
                    </div>
                    <div className="flex items-center gap-2 p-1 bg-gray-900/50 rounded-lg">
                        <button onClick={() => setPlatformFilter('All')} className={`px-3 py-1 text-sm rounded-md transition-colors ${platformFilter === 'All' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>{t('filter_all')}</button>
                        {platforms.map(p => (
                             <button key={p} onClick={() => setPlatformFilter(p)} className={`p-2 rounded-md transition-colors ${platformFilter === p ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                                <PlatformIcon platform={p} className="w-5 h-5" />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-12">
                                    <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
                                </th>
                                <th scope="col" className="px-6 py-3">{t('table_header_target_name')}</th>
                                <th scope="col" className="px-6 py-3">{t('table_header_members')}</th>
                                <th scope="col" className="px-6 py-3">{t('table_header_platform')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTargets.map(target => (
                                <tr key={target.id} className="border-b border-gray-700 hover:bg-gray-700/40 transition-colors duration-150">
                                    <td className="px-6 py-4 w-12">
                                        <Checkbox checked={selectedTargets.has(target.id)} onChange={() => handleToggle(target.id)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-lg object-cover" src={target.imageUrl} alt={target.name} />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">{target.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-300">{target.memberCount?.toLocaleString() ?? 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                         <PlatformIcon platform={target.platform} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredTargets.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <p className="text-lg">{t('group_manager_no_targets_found')}</p>
                            <p>{t('group_manager_no_targets_suggestion')}</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default GroupManager;