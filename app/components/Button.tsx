'use client'

import { LucideProps } from 'lucide-react';
import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: React.ComponentType<LucideProps>;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    label,
    disabled,
    outline,
    small,
    icon: Icon
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative
                rounded-lg
                w-full
                disabled:opacity-70
                disabled:cursor-not-allowed
                hover:opacity-80
                transition
                border-2
                ${outline ? "border-black text-black" : "border-blue-500 bg-blue-500 text-white"}
                ${small ? "py-2 px-4 text-sm" : "py-3 px-6 text-base"}
            `}
        >
            {Icon && (
                <Icon size={24} className="absolute left-4" />
            )}
            {label}
        </button>
    );
}

export default Button;
