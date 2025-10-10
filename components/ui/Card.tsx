import React from 'react';

// FIX: Extend CardProps to include all standard HTML div attributes.
// This allows passing props like `onClick` to the underlying div element.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div className={`bg-gray-800 rounded-lg shadow-lg ${className}`} {...props}>
            {children}
        </div>
    );
};
