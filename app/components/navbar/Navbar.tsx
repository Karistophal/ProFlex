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
        if (!currentUser) {
            
        }
        setIsCartOpen(!isCartOpen);
    }

    const handleConnect = () => {
        closeAll();
        loginModal.onOpen();
    }

    return (
        <nav className="
                relative
                flex
                items-center
                justify-between
                w-full
                pr-4
                border-b
                border-gray-300
                py-4
                md:justify-between
                md:items-center
            ">
            <div className="
                    text-2xl
                    font-bold
                    text-gray-800
                    md:text-3xl
                    cursor-pointer
                ">
                <div onClick={() => router.push("/")}>ProFlex</div>
            </div>
            <div className="
                    absolute
                    top-1/2
                    left-1/3
                    transform
                    -translate-x-1/2
                    -translate-y-1/2
                    overflow-hidden
                    flex
                    items-center
                    gap-4
                    md:flex
                    md:left-1/2
                ">
                <li><a href="#">Design</a></li>
                <li><a href="#">Soft</a></li>
                <li><a href="#">Large</a></li>
                <li><a href="#">Small</a></li>

            </div>
            <div className="
                    flex
                    items-center
                    gap-3
                ">
                <SearchBar />

                {/* UserMenu */}
                <div
                    onClick={toggleUser}
                    className="
                        relative
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        w-10
                        h-10
                        rounded-full
                        cursor-pointer
                    ">
                    <Avatar image={currentUser?.image} />
                    {isUserOpen && (
                        <UserMenu currentUser={currentUser} />
                    )}
                </div>

                <div className="
                        relative
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        w-10
                        h-10
                        rounded-full
                        cursor-pointer
                    ">
                    <Heart strokeWidth={2.5} />
                </div>
                <div
                    onClick={toggleCart}
                    className="
                        relative
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        w-10
                        h-10
                        rounded-full
                        cursor-pointer
                    ">
                    <ShoppingCart strokeWidth={2.5} />
                </div>
                {isCartOpen &&
                    <CartMenu currentUser={currentUser} handleConnect={handleConnect} />
                }
            </div>
        </nav>
    );
}

export default Navbar;