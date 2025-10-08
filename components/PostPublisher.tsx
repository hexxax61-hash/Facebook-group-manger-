
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { generatePostIdea } from '../services/geminiService';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Checkbox } from './ui/Checkbox';
import { Spinner } from './ui/Spinner';

const PostPublisher: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [postContent, setPostContent] = useState('');
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredGroups = useMemo(() => {
        return state.groups.filter(group =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [state.groups, searchTerm]);

    const handleGenerateIdea = async () => {
        if (!topic) return;
        setIsGenerating(true);
        const idea = await generatePostIdea(topic);
        setPostContent(idea);
        setIsGenerating(false);
    };

    const handlePublish = () => {
        if (postContent.trim() && selectedGroups.size > 0) {
            const groupNames = Array.from(selectedGroups).map(id => state.groups.find(g => g.id === id)?.name).filter(Boolean).join(', ');
            dispatch({
                type: 'ADD_LOG',
                payload: {
                    action: `Published Post to ${selectedGroups.size} Group(s)`,
                    details: `Groups: ${groupNames}`,
                    status: 'Success'
                }
            });
            setPostContent('');
            setSelectedGroups(new Set());
        }
    };
    
    const handleToggleGroup = (id: string) => {
        const newSelection = new Set(selectedGroups);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedGroups(newSelection);
    };

    const handleSelectAll = () => {
        if (selectedGroups.size === filteredGroups.length) {
            setSelectedGroups(new Set());
        } else {
            setSelectedGroups(new Set(filteredGroups.map(g => g.id)));
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">Post Publisher</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Composer Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-gray-800 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Compose Post</h2>
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full h-48 bg-gray-700 text-white rounded-lg p-4 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none"
                        ></textarea>
                    </Card>
                    <Card className="bg-gray-800 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">AI Post Idea Generator</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Enter a topic (e.g., 'community welcome')"
                                className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                            />
                            <Button onClick={handleGenerateIdea} disabled={isGenerating || !topic}>
                                {isGenerating ? <Spinner /> : 'Generate Idea'}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Group Selector Section */}
                <div className="space-y-6">
                    <Card className="bg-gray-800 p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Select Groups ({selectedGroups.size})</h2>
                        <input
                            type="text"
                            placeholder="Filter groups..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                        <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-700/50">
                                <label className="font-semibold">Select All</label>
                                <Checkbox 
                                    checked={selectedGroups.size > 0 && selectedGroups.size === filteredGroups.length}
                                    onChange={handleSelectAll}
                                />
                            </div>
                            {filteredGroups.map(group => (
                                <div key={group.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-700/50">
                                    <span className="text-sm">{group.name}</span>
                                    <Checkbox 
                                        checked={selectedGroups.has(group.id)}
                                        onChange={() => handleToggleGroup(group.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Button 
                        onClick={handlePublish}
                        disabled={!postContent.trim() || selectedGroups.size === 0}
                        className="w-full"
                    >
                        Publish Post to {selectedGroups.size} Groups
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PostPublisher;
