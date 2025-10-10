
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { generatePostIdea } from '../services/geminiService';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Checkbox } from './ui/Checkbox';
import { Spinner } from './ui/Spinner';
import { useTranslation } from '../context/LanguageContext';
import { Platform } from '../types';

type PublishMode = 'standard' | 'community';

const PostPublisher: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const { t } = useTranslation();

    // Component State
    const [publishMode, setPublishMode] = useState<PublishMode>('standard');
    const [postContent, setPostContent] = useState('');
    const [customContent, setCustomContent] = useState<Record<string, string>>({});
    const [customTitles, setCustomTitles] = useState<Record<string, string>>({});
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedTargets, setSelectedTargets] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<Platform | 'default'>('default');
    
    // Attachment State
    const [attachment, setAttachment] = useState<{type: 'image' | 'video', url: string} | null>(null);
    const [attachmentUrl, setAttachmentUrl] = useState('');
    const [showAttachmentInput, setShowAttachmentInput] = useState<'image' | 'video' | null>(null);

    const handleModeChange = (mode: PublishMode) => {
        setPublishMode(mode);
        setSelectedTargets(new Set()); // Clear selection when mode changes to avoid errors
        setActiveTab('default');
    };

    const selectedPlatforms = useMemo(() => {
        const platforms = new Set<Platform>();
        selectedTargets.forEach(id => {
            const target = state.targets.find(t => t.id === id);
            if (target) platforms.add(target.platform);
        });
        return Array.from(platforms);
    }, [selectedTargets, state.targets]);

    const filteredTargets = useMemo(() => {
        return state.targets.filter(target => {
            const matchesSearch = target.name.toLowerCase().includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            if (publishMode === 'standard') {
                return target.type === 'Profile' || target.type === 'Page';
            }
            if (publishMode === 'community') {
                return target.type === 'Group';
            }
            return false;
        });
    }, [state.targets, searchTerm, publishMode]);

    const handleGenerateIdea = async () => {
        if (!topic) return;
        setIsGenerating(true);
        const idea = await generatePostIdea(topic);
        setPostContent(idea);
        setCustomContent({});
        setCustomTitles({});
        setActiveTab('default');
        setIsGenerating(false);
    };

    const handlePublish = () => {
        if (postContent.trim() && selectedTargets.size > 0) {
            const targetNames = Array.from(selectedTargets).map(id => state.targets.find(g => g.id === id)?.name).filter(Boolean).join(', ');
            
            let details = `Targets: ${targetNames}. Content snippet: "${postContent.substring(0, 50)}..."`;
            if (attachment) {
                details += ` [Attachment: ${attachment.type}]`;
            }

            dispatch({
                type: 'ADD_LOG',
                payload: {
                    action: `Published Post to ${selectedTargets.size} Target(s)`,
                    details,
                    status: 'Success'
                }
            });
            setPostContent('');
            setCustomContent({});
            setCustomTitles({});
            setSelectedTargets(new Set());
            setActiveTab('default');
            setAttachment(null);
            setShowAttachmentInput(null);
            setAttachmentUrl('');
        }
    };
    
    const handleToggleTarget = (id: string) => {
        const newSelection = new Set(selectedTargets);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedTargets(newSelection);
        const newPlatforms = new Set<Platform>();
        newSelection.forEach(targetId => {
            const target = state.targets.find(t => t.id === targetId);
            if (target) newPlatforms.add(target.platform);
        });
        if (activeTab !== 'default' && !newPlatforms.has(activeTab)) {
            setActiveTab('default');
        }
    };

    const handleSelectAll = () => {
        if (selectedTargets.size === filteredTargets.length) {
            setSelectedTargets(new Set());
        } else {
            setSelectedTargets(new Set(filteredTargets.map(g => g.id)));
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (activeTab === 'default') {
            setPostContent(e.target.value);
        } else {
            setCustomContent(prev => ({ ...prev, [activeTab]: e.target.value }));
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (activeTab !== 'default') {
            setCustomTitles(prev => ({ ...prev, [activeTab]: e.target.value }));
        }
    };

    const handleSetAttachment = () => {
        if (showAttachmentInput && attachmentUrl) {
            setAttachment({ type: showAttachmentInput, url: attachmentUrl });
            setShowAttachmentInput(null);
            setAttachmentUrl('');
        }
    };
    
    const currentText = activeTab === 'default' ? postContent : customContent[activeTab] ?? postContent;
    const currentTitle = activeTab === 'default' ? '' : customTitles[activeTab] ?? '';

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">{t('publisher_title')}</h1>

            <div className="flex items-center gap-2 p-1 bg-gray-800 rounded-lg max-w-md">
                <button onClick={() => handleModeChange('standard')} className={`flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${publishMode === 'standard' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>{t('publisher_mode_standard')}</button>
                <button onClick={() => handleModeChange('community')} className={`flex-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${publishMode === 'community' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>{t('publisher_mode_community')}</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-gray-800 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">{t('publisher_compose_post')}</h2>
                        {selectedPlatforms.length > 0 && (
                            <div className="flex border-b border-gray-700 mb-4 overflow-x-auto">
                                <button onClick={() => setActiveTab('default')} className={`px-4 py-2 text-sm font-medium border-b-2 flex-shrink-0 ${activeTab === 'default' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400 hover:text-white'}`}>{t('publisher_default_content')}</button>
                                {selectedPlatforms.map(platform => (
                                    <button key={platform} onClick={() => setActiveTab(platform)} className={`px-4 py-2 text-sm font-medium border-b-2 flex-shrink-0 ${activeTab === platform ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400 hover:text-white'}`}>{platform}</button>
                                ))}
                            </div>
                        )}
                        <div className="space-y-4">
                            {activeTab !== 'default' && (
                                <input type="text" value={currentTitle} onChange={handleTitleChange} placeholder={t('publisher_title_placeholder', { platform: activeTab })} className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none" aria-label="Post title" />
                            )}
                            <textarea value={currentText} onChange={handleContentChange} placeholder={t('publisher_placeholder')} className="w-full h-48 bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none" aria-label="Post content"></textarea>
                            
                            {/* Attachment Section */}
                            <div className="space-y-4">
                                {!attachment && !showAttachmentInput && (
                                    <div className="flex items-center gap-4 pt-2">
                                        <button onClick={() => setShowAttachmentInput('image')} className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"><PhotoIcon /> {t('publisher_add_image')}</button>
                                        <button onClick={() => setShowAttachmentInput('video')} className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"><VideoIcon /> {t('publisher_add_video')}</button>
                                    </div>
                                )}
                                {showAttachmentInput && (
                                    <div className="flex gap-2">
                                        <input type="text" value={attachmentUrl} onChange={(e) => setAttachmentUrl(e.target.value)} onBlur={handleSetAttachment} placeholder={t(showAttachmentInput === 'image' ? 'publisher_attachment_url_placeholder_image' : 'publisher_attachment_url_placeholder_video')} className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"/>
                                        <Button onClick={handleSetAttachment} variant="secondary">Add</Button>
                                        <Button onClick={() => setShowAttachmentInput(null)} variant="secondary">X</Button>
                                    </div>
                                )}
                                {attachment && (
                                    <div className="relative w-full aspect-video bg-gray-700 rounded-lg overflow-hidden">
                                        {attachment.type === 'image' ? (
                                            <img src={attachment.url} alt="Attachment preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center"><VideoIcon className="w-16 h-16 text-gray-500" /></div>
                                        )}
                                        <button onClick={() => setAttachment(null)} className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors" aria-label={t('publisher_remove_attachment')}><XMarkIcon /></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-gray-800 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">{t('publisher_ai_generator')}</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={t('publisher_ai_topic_placeholder')} className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none" aria-label="AI post idea topic"/>
                            <Button onClick={handleGenerateIdea} disabled={isGenerating || !topic}>{isGenerating ? <Spinner /> : t('publisher_ai_generate_button')}</Button>
                        </div>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card className="bg-gray-800 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">{t('publisher_select_targets', { count: selectedTargets.size })}</h2>
                        <input type="text" placeholder={t('publisher_filter_placeholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-cyan-500 focus:outline-none" aria-label="Filter targets"/>
                        <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                            {filteredTargets.length > 0 && <div className="flex items-center justify-between p-2 rounded hover:bg-gray-700/50">
                                <label htmlFor="select-all-targets" className="font-semibold cursor-pointer">{t('publisher_select_all')}</label>
                                <Checkbox id="select-all-targets" checked={selectedTargets.size > 0 && selectedTargets.size === filteredTargets.length} onChange={handleSelectAll}/>
                            </div>}
                            {filteredTargets.map(target => (
                                <div key={target.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-700/50">
                                    <label htmlFor={`group-${target.id}`} className="text-sm cursor-pointer">{target.name}</label>
                                    <Checkbox id={`group-${target.id}`} checked={selectedTargets.has(target.id)} onChange={() => handleToggleTarget(target.id)}/>
                                </div>
                            ))}
                             {filteredTargets.length === 0 && (
                                <div className="text-center py-6 text-gray-500">
                                    <p>{t('group_manager_no_targets_found')}</p>
                                </div>
                            )}
                        </div>
                    </Card>
                    <Button onClick={handlePublish} disabled={!postContent.trim() || selectedTargets.size === 0} className="w-full">{t('publisher_publish_button', { count: selectedTargets.size })}</Button>
                </div>
            </div>
        </div>
    );
};

const PhotoIcon = ({className = "w-5 h-5"}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
const VideoIcon = ({className = "w-5 h-5"}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>;
const XMarkIcon = ({className = "w-5 h-5"}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

export default PostPublisher;