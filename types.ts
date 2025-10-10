
export type Platform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'TikTok';

export type PublishTargetType = 'Group' | 'Page' | 'Profile';

export interface PublishTarget {
    id: string;
    name: string;
    platform: Platform;
    type: PublishTargetType;
    memberCount?: number;
    privacy?: 'Public' | 'Private';
    imageUrl: string;
}

export interface ActivityLogEntry {
    id: string;
    action: string;
    details: string;
    timestamp: Date;
    status: 'Success' | 'Pending' | 'Failed';
}

export type View = 'dashboard' | 'groups' | 'publish' | 'logs' | 'settings';