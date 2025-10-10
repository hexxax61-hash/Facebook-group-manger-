
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, options?: { [key: string]: string | number }) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        // Login
        login_title: 'Social Media Suite',
        login_subtitle: 'Your ultimate tool for social media management.',
        login_instructions: 'To get started, please connect your social media and Google Drive accounts. We use these services to manage your targets and log your activity securely.',
        login_connecting: 'Connecting...',
        login_connect_button: 'Connect Accounts & Continue',
        // Nav
        nav_dashboard: 'Dashboard',
        nav_group_manager: 'Target Manager',
        nav_post_publisher: 'Post Publisher',
        nav_activity_log: 'Activity Log',
        nav_settings: 'Settings',
        // Dashboard
        dashboard_title: 'Welcome Back!',
        dashboard_subtitle: 'What would you like to do today?',
        dashboard_action_publish_title: 'Publish Content',
        dashboard_action_publish_desc: 'Create, customize, and schedule posts for multiple platforms at once.',
        dashboard_action_manage_title: 'Manage Targets',
        dashboard_action_manage_desc: 'View, filter, and bulk-manage your connected groups, pages, and profiles.',
        // Group Manager
        group_manager_title: 'Target Manager',
        group_manager_remove_button: 'Remove Selected ({count})',
        group_manager_filter_placeholder: 'Filter targets...',
        group_manager_no_targets_found: 'No targets found.',
        group_manager_no_targets_suggestion: 'Try adjusting your search or platform filter.',
        filter_all: 'All',
        // Publisher
        publisher_title: 'Post Publisher',
        publisher_compose_post: 'Compose Post',
        publisher_mode_standard: 'Standard Post',
        publisher_mode_community: 'Community Engagement',
        publisher_default_content: 'Default',
        publisher_placeholder: 'What\'s on your mind?',
        publisher_title_placeholder: 'Enter a title for {platform}...',
        publisher_add_image: 'Add Image',
        publisher_add_video: 'Add Video',
        publisher_attachment_url_placeholder_image: 'Paste image URL...',
        publisher_attachment_url_placeholder_video: 'Paste video URL...',
        publisher_remove_attachment: 'Remove attachment',
        publisher_ai_generator: 'AI Post Idea Generator',
        publisher_ai_topic_placeholder: 'Enter a topic (e.g., \'community welcome\')',
        publisher_ai_generate_button: 'Generate Idea',
        publisher_select_targets: 'Select Targets ({count})',
        publisher_filter_placeholder: 'Filter targets...',
        publisher_select_all: 'Select All',
        publisher_publish_button: 'Publish Post to {count} Targets',
        // Activity Log
        log_title: 'Activity Log',
        log_description: 'This is a record of all your actions. This log is securely saved to your connected Google Drive account (simulated).',
        log_no_activities: 'No activities logged yet.',
        // Settings
        settings_title: 'Settings',
        settings_privacy_policy: 'Privacy Policy',
        settings_privacy_text: 'Your data privacy is important to us. We only access the necessary information to manage your social media targets and log your activities as requested. All authentication is handled securely via OAuth, and we do not store your passwords. Your activity log is stored in your own Google Drive, giving you full control.',
        settings_terms_of_use: 'Terms of Use',
        settings_terms_text: 'By using this service, you agree to connect your social media accounts and grant permission for the app to perform actions on your behalf, such as posting content and managing group memberships. You are responsible for the content you publish. Misuse of this tool for spam or violating platform policies may result in your accounts being restricted by those platforms.',
        settings_about_developer: 'About the Developer',
        settings_about_text: 'This application was crafted with passion by a world-class senior frontend engineer. Dedicated to creating seamless, intuitive, and powerful user experiences. This tool is a demonstration of modern web technologies and a user-centric design philosophy.',
        settings_api_usage: 'API Usage',
        settings_api_text: 'This application utilizes the Google Gemini API to power its AI features, such as the Post Idea Generator. The API key is managed securely by the application administrator and is not accessible to users. This ensures the security and integrity of the service.',
        // Common
        table_header_action: 'Action',
        table_header_details: 'Details',
        table_header_status: 'Status',
        table_header_timestamp: 'Timestamp',
        table_header_target_name: 'Target Name',
        table_header_members: 'Members/Followers',
        table_header_platform: 'Platform',
        status_success: 'Success',
        status_pending: 'Pending',
        status_failed: 'Failed',
    },
    ar: {
        // Login
        login_title: 'جناح وسائل التواصل الاجتماعي',
        login_subtitle: 'أداتك المثلى لإدارة وسائل التواصل الاجتماعي.',
        login_instructions: 'للبدء، يرجى ربط حساباتك على وسائل التواصل الاجتماعي و Google Drive. نحن نستخدم هذه الخدمات لإدارة أهدافك وتسجيل نشاطك بشكل آمن.',
        login_connecting: 'جارٍ الاتصال...',
        login_connect_button: 'ربط الحسابات والمتابعة',
        // Nav
        nav_dashboard: 'لوحة التحكم',
        nav_group_manager: 'إدارة الوجهات',
        nav_post_publisher: 'ناشر المنشورات',
        nav_activity_log: 'سجل النشاط',
        nav_settings: 'الإعدادات',
        // Dashboard
        dashboard_title: 'مرحبا بعودتك!',
        dashboard_subtitle: 'ماذا تود أن تفعل اليوم؟',
        dashboard_action_publish_title: 'نشر محتوى',
        dashboard_action_publish_desc: 'أنشئ وخصص وجدول منشوراتك لمنصات متعددة في وقت واحد.',
        dashboard_action_manage_title: 'إدارة الوجهات',
        dashboard_action_manage_desc: 'استعرض وصنف وأدر مجموعاتك وصفحاتك وملفاتك الشخصية بشكل جماعي.',
        // Group Manager
        group_manager_title: 'إدارة الوجهات',
        group_manager_remove_button: 'إزالة المحددة ({count})',
        group_manager_filter_placeholder: 'تصفية الوجهات...',
        group_manager_no_targets_found: 'لم يتم العثور على وجهات.',
        group_manager_no_targets_suggestion: 'حاول تعديل البحث أو مرشح المنصة.',
        filter_all: 'الكل',
        // Publisher
        publisher_title: 'ناشر المنشورات',
        publisher_compose_post: 'إنشاء منشور',
        publisher_mode_standard: 'منشور عادي',
        publisher_mode_community: 'مشاركة مجتمعية',
        publisher_default_content: 'الافتراضي',
        publisher_placeholder: 'بم تفكر؟',
        publisher_title_placeholder: 'أدخل عنوانًا لـ {platform}...',
        publisher_add_image: 'إضافة صورة',
        publisher_add_video: 'إضافة فيديو',
        publisher_attachment_url_placeholder_image: 'الصق رابط الصورة...',
        publisher_attachment_url_placeholder_video: 'الصق رابط الفيديو...',
        publisher_remove_attachment: 'إزالة المرفق',
        publisher_ai_generator: 'مولد أفكار المنشورات بالذكاء الاصطناعي',
        publisher_ai_topic_placeholder: 'أدخل موضوعًا (مثل "ترحيب بالمجتمع")',
        publisher_ai_generate_button: 'توليد فكرة',
        publisher_select_targets: 'تحديد الوجهات ({count})',
        publisher_filter_placeholder: 'تصفية الوجهات...',
        publisher_select_all: 'تحديد الكل',
        publisher_publish_button: 'نشر المنشور إلى {count} وجهات',
        // Activity Log
        log_title: 'سجل النشاط',
        log_description: 'هذا سجل لجميع الإجراءات التي قمت بها. يتم حفظ هذا السجل بشكل آمن في حساب Google Drive المرتبط بك (محاكاة).',
        log_no_activities: 'لم يتم تسجيل أي أنشطة بعد.',
        // Settings
        settings_title: 'الإعدادات',
        settings_privacy_policy: 'سياسة الخصوصية',
        settings_privacy_text: 'خصوصية بياناتك تهمنا. نحن نصل فقط إلى المعلومات الضرورية لإدارة وجهات التواصل الاجتماعي الخاصة بك وتسجيل أنشطتك كما هو مطلوب. تتم معالجة جميع عمليات المصادقة بشكل آمن عبر OAuth، ولا نقوم بتخزين كلمات المرور الخاصة بك. يتم تخزين سجل نشاطك في Google Drive الخاص بك، مما يمنحك السيطرة الكاملة.',
        settings_terms_of_use: 'شروط الاستخدام',
        settings_terms_text: 'باستخدامك لهذه الخدمة، فإنك توافق على ربط حساباتك على وسائل التواصل الاجتماعي ومنح الإذن للتطبيق بتنفيذ إجراءات نيابة عنك، مثل نشر المحتوى وإدارة عضويات المجموعات. أنت مسؤول عن المحتوى الذي تنشره. قد يؤدي سوء استخدام هذه الأداة للبريد العشوائي أو انتهاك سياسات المنصات إلى تقييد حساباتك من قبل تلك المنصات.',
        settings_about_developer: 'عن المطور',
        settings_about_text: 'تم تصميم هذا التطبيق بشغف من قبل مهندس واجهات أمامية خبير. مكرس لإنشاء تجارب مستخدم سلسة وبديهية وقوية. هذه الأداة هي عرض لتقنيات الويب الحديثة وفلسفة التصميم التي تركز على المستخدم.',
        settings_api_usage: 'استخدام API',
        settings_api_text: 'يستخدم هذا التطبيق واجهة برمجة تطبيقات Google Gemini لتشغيل ميزاته الذكية، مثل مولد أفكار المنشورات. تتم إدارة مفتاح API بشكل آمن من قبل مسؤول التطبيق ولا يمكن للمستخدمين الوصول إليه. هذا يضمن أمان وسلامة الخدمة.',
        // Common
        table_header_action: 'الإجراء',
        table_header_details: 'التفاصيل',
        table_header_status: 'الحالة',
        table_header_timestamp: 'التوقيت',
        table_header_target_name: 'اسم الوجهة',
        table_header_members: 'الأعضاء/المتابعون',
        table_header_platform: 'المنصة',
        status_success: 'نجاح',
        status_pending: 'قيد الانتظار',
        status_failed: 'فشل',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string, options?: { [key: string]: string | number }) => {
        let translation = translations[language][key] || key;
        if (options) {
            Object.keys(options).forEach(optionKey => {
                translation = translation.replace(`{${optionKey}}`, String(options[optionKey]));
            });
        }
        return translation;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};