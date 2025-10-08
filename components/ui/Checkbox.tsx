
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, ...props }) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600 focus:ring-offset-gray-800"
            {...props}
        />
    );
};
