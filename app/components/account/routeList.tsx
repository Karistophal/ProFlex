"use client"

import { useRouter } from "next/navigation"
import RouteElement from "./routeElement"
import { signOut } from "next-auth/react";

import { User, Shield, LogOut } from 'lucide-react'

import React from 'react'
import Hr from "../Hr"
import { SafeUser } from "@/app/types"
import Image from "next/image";

interface RouteListProps {
  focus: string
  user?: SafeUser | null
}

const RouteList: React.FC<RouteListProps> = ({ focus, user }) => {
  return (
    <div className="flex flex-col gap-2 h-full w-[300px] p-4 mr-14 border-[1px] border-gray-300 rounded-lg">
      <div className="flex flex-col justify-center text-center">
        <div className="text-2xl font-bold">
          Mon compte
        </div>
        <div className="my-2">
          <Image src={user?.image ? user.image : "/images/default-profile.png"} className="w-24 h-24 rounded-full mx-auto" alt="profile" />
        </div>
        <div className="text-lg font-bold">
          {user?.name}
        </div>
        <div className="text-gray-500 text-sm">
          {user?.email}
        </div>
      </div>
      <div className="my-4">
        <Hr />
      </div>
      <RouteElement name="Mes informations" icon={User} route="/account/profil" light={focus === "profil"} />
      <RouteElement name="Confidentialité" icon={Shield} route="/account/privacy" light={focus === "privacy"} />
      <div className="text-red-500"><RouteElement name="Déconnexion" icon={LogOut} route="/" light={focus === "logout"} onClick={() => signOut()} /></div>
    </div>
  )
}

export default RouteList