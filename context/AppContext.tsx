
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { PublishTarget, ActivityLogEntry } from '../types';
import { mockTargets } from '../services/mockData';

interface AppState {
    targets: PublishTarget[];
    activityLog: ActivityLogEntry[];
}

type Action =
    | { type: 'REMOVE_TARGETS'; payload: string[] }
    | { type: 'ADD_LOG'; payload: Omit<ActivityLogEntry, 'id' | 'timestamp'> };

const initialState: AppState = {
    targets: mockTargets,
    activityLog: [],
};

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'REMOVE_TARGETS': {
            const targetNames = state.targets
                .filter(g => action.payload.includes(g.id))
                .map(g => g.name)
                .join(', ');
            
            const newLog: ActivityLogEntry = {
                id: new Date().toISOString(),
                action: `Removed ${action.payload.length} Target(s)`,
                details: `Successfully removed: ${targetNames}`,
                timestamp: new Date(),
                status: 'Success'
            };
            
            return {
                ...state,
                targets: state.targets.filter(target => !action.payload.includes(target.id)),
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
