
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Group, ActivityLogEntry } from '../types';
import { mockGroups } from '../services/mockData';

interface AppState {
    groups: Group[];
    activityLog: ActivityLogEntry[];
}

type Action =
    | { type: 'LEAVE_GROUPS'; payload: string[] }
    | { type: 'ADD_LOG'; payload: Omit<ActivityLogEntry, 'id' | 'timestamp'> };

const initialState: AppState = {
    groups: mockGroups,
    activityLog: [],
};

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'LEAVE_GROUPS': {
            const groupNames = state.groups
                .filter(g => action.payload.includes(g.id))
                .map(g => g.name)
                .join(', ');
            
            const newLog: ActivityLogEntry = {
                id: new Date().toISOString(),
                action: `Left ${action.payload.length} Group(s)`,
                details: `Successfully left: ${groupNames}`,
                timestamp: new Date(),
                status: 'Success'
            };
            
            return {
                ...state,
                groups: state.groups.filter(group => !action.payload.includes(group.id)),
                activityLog: [newLog, ...state.activityLog]
            };
        }
        case 'ADD_LOG': {
             const newLog: ActivityLogEntry = {
                id: new Date().toISOString(),
                timestamp: new Date(),
                ...action.payload
            };
            return {
                ...state,
                activityLog: [newLog, ...state.activityLog]
            }
        }
        default:
            return state;
    }
};

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
