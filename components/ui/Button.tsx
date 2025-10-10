import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'destructive';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
    const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';

    const variantClasses = {
        primary: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
        secondary: 'bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
};