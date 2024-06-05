'use client';

import React, { use, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import CartItem from "./CartItem";
import Avatar from "./Avatar";
import { Heart, ShoppingCart } from 'lucide-react';
import prisma from "@/app/libs/prismadb";

import { SafeUser } from "@/app/types";


interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

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
                ">
                <a href="#">Kanapos</a>
            </div>
            <div className="
                    absolute
                    top-1/2
                    left-1/3
                    transform
                    -translate-x-1/2
                    -translate-y-1/2
                    hidden
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
                    {isCartOpen &&
                        <div
                            className="
                                absolute
                                top-12
                                right-0
                                w-40
                                bg-white
                                shadow-lg
                                rounded-lg
                                flex
                                flex-col
                                gap-2
                                p-4
                            ">
                            <div>Mon panier</div>
                            <CartItem
                                img="https://via.placeholder.com/150"
                                name="Product"
                                style="Style"
                                price={100}
                                quantity={1}
                            />
                        </div>
                    }


                </div>
            </div>
        </nav>
    );
}

export default Navbar;