"use client"

import React from 'react'

import { Trash2 } from 'lucide-react';

interface cartItemProps {
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export default function CartItemProps({ name, price, quantity, image }: cartItemProps) {

    return (
        <div className="w-full">
            <div className="w-full flex">
                <img src={image} alt={name} className="w-52 h-40 object-cover mr-6 rounded-lg" />
                <div className="flex flex-col w-full my-3 flex-1">
                    <div className="flex justify-between w-full flex-1">
                        <h3 className="font-semibold text-xl">{name}</h3>
                        <p className="font-bold text-xl">{price}$</p>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-5">Quantité :</div>
                        <select name="quantity" id="quantity" className="mr-5 bg-gray-50 rounded-full font-semibold p-2 px-5 select w-fit">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                        <div className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200 ease-in-out" >
                            <Trash2 size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
