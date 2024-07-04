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
        <div className="w-[calc(50%-0.5rem)] sm:w-52 sm:min-w-52 lg:w-60 sm:h-fit flex flex-col items-center gap-2 cursor-pointer" onClick={handleOpenProduct} >
            { image && image[0] ? (
                <img className="w-full h-[30svw] sm:h-40 lg:h-48 rounded-md sm:rounded-lg object-cover" src={image[0].url} />
            ) : (
                <div className="w-full h-[30svw] sm:h-40 lg:h-48 rounded-lg bg-gray-200"></div>
            )}
            <div className="w-full flex flex-col flex-1 justify-between">

                {/* Name and price */}
                <div className="flex justify-between">
                    <div className="text-m font-bold">{name}</div>
                    <div className="text-m font-bold">{price.toFixed(2)}€</div>
                </div>

                {/* Types */}
                { types ? (
                <div className="w-40 h-6 ml-2 sm:block flex gap-1 overflow-hidden text-gray-500">
                    {types.map((type) => (
                        <div key={type.id} className="text-sm font-semibold">{type.name}{types.indexOf(type) < types.length - 1 ? ', ' : ''}</div>
                        
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
