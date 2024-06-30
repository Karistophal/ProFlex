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

import { useAppContext } from "@/app/context";


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
    const { cart } = useAppContext();

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
        <nav className="relative flex items-center justify-between pr-4 border-b border-gray-300 mt-3 sm:mx-10 py-4 pl-6 md:pl-0 md:justify-between md:items-center">
            <div className="text-2xl font-bold text-gray-800 md:text-3xl cursor-pointer">
                <div onClick={() => router.push("/")}>ProFlex</div>
            </div>

            <div className="flex items-center gap-3">
                <div onClick={toggleUser} className="relative flex items-center justify-center text-gray-600 md: w-10 h-10 rounded-full cursor-pointer">
                    <Avatar image={currentUser?.image} />
                    {isUserOpen && (
                        <UserMenu currentUser={currentUser} closeUserMenu={toggleUser} />
                    )}
                </div>
                <div onClick={toggleCart} className="relative flex items-center justify-center text-gray-600 w-10 h-10 rounded-full cursor-pointer">
                    <ShoppingCart strokeWidth={2.5} />
                    {cart.length > 0 && (
                        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{cart.length}</div>
                    )}
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