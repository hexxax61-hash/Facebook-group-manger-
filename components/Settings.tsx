
import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Card } from './ui/Card';

const Settings: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white">{t('settings_title')}</h1>

            <Card className="bg-gray-800 p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">{t('settings_about_developer')}</h2>
                <p className="text-gray-300 leading-relaxed">
                    {t('settings_about_text')}
                </p>
            </Card>

             <Card className="bg-gray-800 p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">{t('settings_api_usage')}</h2>
                <p className="text-gray-300 leading-relaxed">
                    {t('settings_api_text')}
                </p>
            </Card>

            <Card className="bg-gray-800 p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">{t('settings_privacy_policy')}</h2>
                <p className="text-gray-300 leading-relaxed">
                    {t('settings_privacy_text')}
                </p>
            </Card>

            <Card className="bg-gray-800 p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">{t('settings_terms_of_use')}</h2>
                <p className="text-gray-300 leading-relaxed">
                    {t('settings_terms_text')}
                </p>
            </Card>
        </div>
    );
};

export default Settings;