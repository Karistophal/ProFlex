'use client';

import React, { use, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartMenu from "./CartMenu";
import Avatar from "./Avatar";
import { Heart, ShoppingCart } from 'lucide-react';

import useLoginModal from "../../hook/useLoginModal";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";


interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const router = useRouter();
    const loginModal = useLoginModal();

    const closeAll = () => {
        setIsUserOpen(false);
        setIsCartOpen(false);
    }

    const toggleUser = () => {
        closeAll();
        setIsUserOpen(!isUserOpen);
    }

    const toggleCart = () => {
        closeAll();
        setIsCartOpen(!isCartOpen);
    }

    const handleConnect = () => {
        closeAll();
        loginModal.onOpen();
    }

    return (
        <nav className="relative flex items-center justify-between pr-4 border-b border-gray-300 mt-3 mx-10 py-4 md:justify-between md:items-center">
            <div className="text-2xl font-bold text-gray-800 md:text-3xl cursor-pointer">
                <div onClick={() => router.push("/")}>ProFlex</div>
            </div>

            <div className="flex items-center gap-3">
                <div className=" block md:absolute md:flex md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                    <SearchBar />
                </div>
                <div onClick={toggleUser} className="relative flex items-center justify-center text-gray-600 md: w-10 h-10 rounded-full cursor-pointer">
                    <Avatar image={currentUser?.image} />
                    {isUserOpen && (
                        <UserMenu currentUser={currentUser} closeUserMenu={toggleUser} />
                    )}
                </div>
                <div className="relative flex items-center justify-center text-gray-600 w-10 h-10 rounded-full cursor-pointer">
                    <Heart strokeWidth={2.5} />
                </div>
                <div onClick={toggleCart} className="relative flex items-center justify-center text-gray-600 w-10 h-10 rounded-full cursor-pointer">
                    <ShoppingCart strokeWidth={2.5} />
                </div>
                <div className="hidden sm:block">
                    {isCartOpen && (
                        <CartMenu currentUser={currentUser} handleConnect={handleConnect} closeCart={toggleCart} />
                    )}
                </div>
                <div className="block sm:hidden">
                    {isCartOpen && (
                        <CartMenu currentUser={currentUser} handleConnect={handleConnect} closeCart={toggleCart} />
                    )}
                </div>
            </div>
        </nav>

    );
}

export default Navbar;