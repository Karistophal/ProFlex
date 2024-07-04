"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation'

import { deleteCartItem } from '@/app/actions/getCartItems';

import { Trash2 } from 'lucide-react';
import Image from "next/image";
import { useCartStore } from "@/app/stores/cartStore";

import { ProductType } from "@prisma/client";

interface cartItemProps {
    id: string;
    name: string;
    selectedTypeName?: string;
    productType?: ProductType;
    price: number;
    quantity: number;
    image: string;
    productId: string;
}

export default function CartItemProps({ id, productId, name, price, quantity, productType, image }: cartItemProps) {
    const router = useRouter();
    const { removeFromCart } = useCartStore();

    const handleDelete = async () => {
        try {
            await deleteCartItem(id);
            removeFromCart(id);
            router.refresh();
        } catch (error) {
            console.error('Failed to delete cart item:', error);
        }
    }

    return (
        <div className="w-full">
            <div className="w-full flex">
                <Image src={image} alt={name} width={192} height={144} className="w-36 md:w-44 h-24 md:h-32 lg:w-48 lg:h-36 object-cover mr-6 rounded-lg" />
                <div className="flex flex-col w-full my-7 mr-10 flex-1">
                    <div className="flex justify-between w-full flex-1">
                        <div className="">
                            <h3 className="cursor-pointer font-semibold text-xl" onClick={() => router.push(`/product/${productId}`)}>{name}</h3>
                            <p className="text-gray-500">{productType?.name}</p>
                        </div>
                        <p className="font-bold text-xl">{(price * quantity).toFixed(2)}€</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className='flex items-center'>
                            <div className="mr-5">Quantité :</div>
                            <select name="quantity" id="quantity" className="mr-5 bg-gray-50 rounded-full font-semibold p-2 px-5 select w-fit" value={quantity} disabled>
                                {
                                    Array.from({ length: 10 }, (_, i) => i + 1).map((item, index) => (
                                        <option key={item} selected={index === quantity} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <form>
                            <button formAction={handleDelete} className="text-red-500">
                                <Trash2 size={24} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
