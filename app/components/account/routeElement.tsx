"use client"

import { Icon, LucideIcon } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { LucideProps } from 'lucide-react'

interface RouteElementProps {
    name: string
    icon: React.ComponentType<LucideProps>;
    route?: string
    light?: boolean
    onClick?: () => void
}

const RouteElement: React.FC<RouteElementProps> = ({ name, icon: Icon, route, light, onClick }) => {
    const router = useRouter()

    const handleClick = () => {
        if (route) {
            router.push(route)
        }
        if (onClick) {
            onClick()
        }
    }

    return (
        <div className={`relative flex w-full items-center cursor-pointer
        py-2 px-4 overflow-hidden
        ${light ? 'bg-blue-400' : ''}
        ${light ? 'bg-opacity-20' : ''}
        ${light ? 'rounded-md' : ''}
        ${light ? 'text-blue-600' : ''}
        `}
            onClick={handleClick} >
            <div className={`absolute h-full w-1 left-0 bg-blue-600 ${light ? 'block' : 'hidden'}`}></div>
            <Icon size={24} />
            <div className='ml-2 font-bold'>{name}</div>
        </div>
    )
}

export default RouteElement;
