"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '@/app/types';
import Image from 'next/image';

interface CartItemProps {
    cartItems: CartItem;
    onDelete: () => void; 
}
    


const CartItemSmall: React.FC<CartItemProps> = ({
    cartItems,
    onDelete
}) => {
    const handleDelete = () => {
        onDelete();
    };

    const { product, quantity, productType } = cartItems;
    const { name, price, images } = product;
    const img = images[0].url;

    return (
        <div className="relative flex items-center gap-4 p-2 px-4 bg-gray-100 rounded-lg">
            <Image src={img} alt={name} width={112} height={80} className="w-28 h-20 object-cover rounded-lg" />
            <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col h-full mb-2">
                    <div className="font-semibold">{name}</div>
                    <div className="text-sm text-neutral-500">{productType?.name}</div>
                </div>
                <div className="flex">
                    <div className="text-neutral-500 mr-2">{price}€</div>
                    <div className="text-neutral-500">x {quantity}</div>
                </div>
            </div>
            <div className="absolute right-4 cursor-pointer text-red-500 hover:text-red-700 transition duration-200 ease-in-out" onClick={handleDelete}>
                <Trash2 size={20} />
            </div>
        </div>
    );
};

export default CartItemSmall;
