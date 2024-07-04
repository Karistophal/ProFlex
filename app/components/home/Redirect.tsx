'use client';

import React from 'react';
import { useRouter } from "next/navigation";

interface RedirectProps {
    name: string;
    url: string;
    underline?: boolean;
}

const Redirect: React.FC<RedirectProps> = ({ name, url, underline }) => {
    const router = useRouter();

    return (
            <div 
                className= {`
                    text-m
                    font-semibold
                    cursor-pointer
                    text-neutral-900
                    pb-1
                    
                    ${underline ? 'after:content-[""] after:block after:w-full after:h-0.5 after:bg-neutral-800' : ''}
                `}
                onClick={() => router.push(url)}
            >{name}</div>
    );
};

export default Redirect;