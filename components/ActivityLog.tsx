
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from './ui/Card';
import { useTranslation } from '../context/LanguageContext';

const ActivityLog: React.FC = () => {
    const { state } = useAppContext();
    const { activityLog } = state;
    const { t } = useTranslation();

    const getStatusChip = (status: 'Success' | 'Pending' | 'Failed') => {
        switch (status) {
            case 'Success':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-800 text-green-100">{t('status_success')}</span>;
            case 'Failed':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-800 text-red-100">{t('status_failed')}</span>;
            default:
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-800 text-yellow-100">{t('status_pending')}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">{t('log_title')}</h1>
            <p className="text-gray-400">{t('log_description')}</p>

            <Card className="bg-gray-800 p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('table_header_action')}</th>
                                <th scope="col" className="px-6 py-3">{t('table_header_details')}</th>
                                <th scope="col" className="px-6 py-3">{t('table_header_status')}</th>
                                <th scope="col" className="px-6 py-3">{t('table_header_timestamp')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityLog.map(log => (
                                <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700/40">
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{log.action}</td>
                                    <td className="px-6 py-4">{log.details}</td>
                                    <td className="px-6 py-4">{getStatusChip(log.status)}</td>
                                    <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                            {activityLog.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-12 text-gray-500">
                                        {t('log_no_activities')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ActivityLog;
