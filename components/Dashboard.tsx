import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from './ui/Card';

// Fix: Use React.ReactNode instead of JSX.Element to avoid namespace error.
const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card className="flex items-center p-6 bg-gray-800">
        <div className="p-3 mr-4 text-cyan-400 bg-gray-700 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </Card>
);

const Dashboard: React.FC = () => {
    const { state } = useAppContext();
    const { groups, activityLog } = state;

    const postsPublished = activityLog.filter(log => log.action.includes('Published Post')).length;
    const groupsLeft = activityLog.filter(log => log.action.includes('Left')).reduce((acc, log) => {
        const count = parseInt(log.action.split(' ')[1], 10) || 0;
        return acc + count;
    }, 0);

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Groups" value={groups.length} icon={<UsersIcon />} />
                <StatCard title="Posts Published" value={postsPublished} icon={<PaperAirplaneIcon />} />
                <StatCard title="Groups Left" value={groupsLeft} icon={<LogoutIcon />} />
                <StatCard title="Total Activities" value={activityLog.length} icon={<DocumentTextIcon />} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Recent Activity</h2>
                <Card className="bg-gray-800 p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                    <th scope="col" className="px-6 py-3">Details</th>
                                    <th scope="col" className="px-6 py-3">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activityLog.slice(0, 5).map(log => (
                                    <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700/40">
                                        <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{log.action}</td>
                                        <td className="px-6 py-4 max-w-sm truncate">{log.details}</td>
                                        <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {activityLog.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="text-center py-8">No recent activity.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const UsersIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PaperAirplaneIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const LogoutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const DocumentTextIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

export default Dashboard;
