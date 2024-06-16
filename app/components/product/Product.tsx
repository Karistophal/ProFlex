'use client';

import React from 'react';
import { Review, ProductType, Image } from '@prisma/client';
import { useRouter } from 'next/navigation';

import ReviewStars from '../inputs/ReviewStars';

interface productInterface {
    id: string;
    name: string;
    price: number;
    image?: Image[];
    types?: ProductType[];
    reviews: Review[];
}


const Product = ({id, name, price, image, types, reviews }: productInterface) => {

    const router = useRouter();
    // Currency format based on browser language

    const handleOpenProduct = () => {
        router.push(`/product/${id}`);
    }

    return (
        <div className="w-60 h-80 flex flex-col items-center gap-2 cursor-pointer" onClick={handleOpenProduct} >
            { image && image[0] ? (
                <img className="w-full h-48 rounded-lg object-cover" src={image[0].url} alt={name} />
            ) : (
                <div className="w-full h-48 rounded-lg bg-gray-200"></div>
            )}
            <div className="w-full flex flex-col">

                {/* Name and price */}
                <div className="flex justify-between">
                    <div className="text-m font-bold">{name}</div>
                    <div className="text-m font-bold">{price.toFixed(2)}$</div>
                </div>

                {/* Types */}
                { types ? (
                <div className="w-40 h-5 flex gap-1 overflow-hidden">
                    {types.map((type) => (
                        <div key={type.id} className="text-sm font-semibold">{type.name}</div>
                    ))}
                </div>
                ) : (
                    <div className="w-40 h-5 flex gap-2 overflow-hidden">
                    </div>
                )}

                <ReviewStars reviews={reviews} size={16} reviewCounter />

            </div>
        </div>
    );
};

export default Product;
