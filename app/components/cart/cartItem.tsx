"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation'

import { deleteCartItem } from '@/app/actions/getCartItems';

import { Trash2 } from 'lucide-react';
import axios from "axios";
import Image from "next/image";

interface cartItemProps {
    id: string;
    name: string;
    selectedTypeName?: string;
    price: number;
    quantity: number;
    image: string;
}

export default function CartItemProps({ id, name, selectedTypeName, price, quantity, image}: cartItemProps) {
    const router = useRouter();

    return (
        <div className="w-full">
            <div className="w-full flex">
                <Image src={image} alt={name} className="w-48 h-36 object-cover mr-6 rounded-lg" />
                <div className="flex flex-col w-full my-7 mr-10 flex-1">
                    <div className="flex justify-between w-full flex-1">
                        <h3 className="cursor-pointer font-semibold text-xl" onClick={() => router.push(`/product/${id}`)}>{name}</h3>
                        <p className="font-bold text-xl">{price * quantity}€</p>
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

                    </div>
                </div>
            </div>
        </div>
    )
}
