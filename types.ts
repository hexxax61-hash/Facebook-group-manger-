
export interface Group {
    id: string;
    name: string;
    memberCount: number;
    privacy: 'Public' | 'Private';
    imageUrl: string;
}

export interface ActivityLogEntry {
    id: string;
    action: string;
    details: string;
    timestamp: Date;
    status: 'Success' | 'Pending' | 'Failed';
}

export type View = 'dashboard' | 'groups' | 'publish' | 'logs';
