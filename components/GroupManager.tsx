
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Group } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Checkbox } from './ui/Checkbox';

const GroupRow: React.FC<{
    group: Group;
    isSelected: boolean;
    onToggle: (id: string) => void;
}> = ({ group, isSelected, onToggle }) => (
    <tr className="border-b border-gray-700 hover:bg-gray-700/40 transition-colors duration-150">
        <td className="px-6 py-4 w-12">
            <Checkbox checked={isSelected} onChange={() => onToggle(group.id)} />
        </td>
        <td className="px-6 py-4">
            <div className="flex items-center">
                <img className="h-10 w-10 rounded-lg object-cover" src={group.imageUrl} alt={group.name} />
                <div className="ml-4">
                    <div className="text-sm font-medium text-white">{group.name}</div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4">
            <div className="text-sm text-gray-300">{group.memberCount.toLocaleString()}</div>
        </td>
        <td className="px-6 py-4">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                group.privacy === 'Public' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
            }`}>
                {group.privacy}
            </span>
        </td>
    </tr>
);


const GroupManager: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGroups = useMemo(() => {
        return state.groups.filter(group =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [state.groups, searchTerm]);

    const handleToggle = (id: string) => {
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

    const handleLeaveSelected = () => {
        if (selectedGroups.size > 0) {
            dispatch({ type: 'LEAVE_GROUPS', payload: Array.from(selectedGroups) });
            setSelectedGroups(new Set());
        }
    };
    
    const isAllSelected = selectedGroups.size > 0 && selectedGroups.size === filteredGroups.length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h1 className="text-4xl font-bold text-white">Group Manager</h1>
                <div className="flex gap-2">
                    <Button 
                        variant="destructive"
                        onClick={handleLeaveSelected}
                        disabled={selectedGroups.size === 0}
                    >
                        Leave Selected ({selectedGroups.size})
                    </Button>
                </div>
            </div>

            <Card className="bg-gray-800 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Filter groups..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-12">
                                    <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
                                </th>
                                <th scope="col" className="px-6 py-3">Group Name</th>
                                <th scope="col" className="px-6 py-3">Members</th>
                                <th scope="col" className="px-6 py-3">Privacy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGroups.map(group => (
                                <GroupRow 
                                    key={group.id} 
                                    group={group}
                                    isSelected={selectedGroups.has(group.id)}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </tbody>
                    </table>
                     {filteredGroups.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            <p className="text-lg">No groups found.</p>
                            <p>Try adjusting your search filter.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default GroupManager;
