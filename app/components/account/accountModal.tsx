"use client"
import React from 'react'

import RouteList from '@/app/components/account/routeList'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/app/types'

interface AccountModalProps {
    title: string
    body: React.ReactNode
    mode: string
    user?: SafeUser | null
}

const AccountModal: React.FC<AccountModalProps> = ({ title, body, mode, user }) => {
    const router = useRouter()    

    if (!user || !user.id) {
        router.push('/')
    }

    return (
        <div className='flex min-h-screen mx-20 mt-10'>
            <RouteList focus={mode} user={user} />
            <div className="flex flex-col w-full">
                <div className="text-4xl font-bold mb-14">{title}</div>
                <div className="flex flex-col justify-center">
                    {body}
                </div>
            </div>
        </div>
    )
}

export default AccountModal