'use client';

import { useState } from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    register,
    errors
}) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="
            w-full
            relative
        ">
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={ type === "password" ? (showPassword ? "text" : "password") : type }
                className={`
                    peer
                    w-full
                    pt-6
                    p-2
                    pl-4
                    border-2
                    rounded-lg
                    outline-none
                    focus:border-blue-500
                    transition
                    text-black
                    bg-white
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors[id] ? "border-red-500" : "border-gray-300"}
                `}
            />
            <label
                className={`
                    absolute
                    text-md
                    duration-150
                    transform
                    -translate-y-0
                    top-1
                    left-4
                    z-10
                    origin-[0]
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-4
                    peer-placeholder-shown:top-0
                    peer-focus:top-1

                    peer-focus:scale-75
                    peer-focus:translate-y-0
                    ${errors[id] ? "text-red-500" : "text-zinc-400"}
            `}
                
                >
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            {
                type === "password" && (
                    <button
                        onClick={togglePassword}    
                        type="button"
                        className="
                            absolute
                            right-4
                            top-1/2
                            transform
                            -translate-y-1/2
                            text-gray-400
                            focus:outline-none
                        "
                    >
                        { showPassword ? <Eye size={'1.2rem'} /> : <EyeOff size={'1.2rem'} /> }
                    </button>
                )
            }
        </div>
    );
}

export default Input;