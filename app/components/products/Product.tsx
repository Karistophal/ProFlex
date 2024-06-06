import React from 'react';
import { Star } from 'lucide-react';
import { Review, ProductType } from '@prisma/client';

interface productInterface {
    name: string;
    price: number;
    image?: string;
    types: ProductType[];
    reviews: Review[];
}

const HalfFilledStar = ({ size }: { size: number }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24">
            <defs>
                <mask id="half">
                    <rect x="0" y="0" width="12" height="24" fill="white" />
                </mask>
            </defs>
            <Star fill="none" stroke="currentColor" strokeWidth="2" />
            <Star fill="currentColor" mask="url(#half)" />
        </svg>
    );
};

const Product = ({ name, price, image, types, reviews }: productInterface) => {
    // Currency format based on browser language
    const currency = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    });

    // Average review calculation
    const avgReview = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

    return (
        <div className="w-60 h-80 flex flex-col items-center gap-2 cursor-pointer">
            {image ? (
                <img className="w-full h-48 rounded-lg" src={image} alt={name} />
            ) : (
                <div className="w-full h-48 rounded-lg bg-gray-200"></div>
            )}
            <div className="w-full flex flex-col">
                {/* Name and price */}
                <div className="flex justify-between">
                    <div className="text-m font-bold">{name}</div>
                    <div className="text-m font-bold">{currency.format(price)}</div>
                </div>
                {/* Types */}
                {
                    types.length > 0 && (
                        <div className="w-60 h-10 flex gap-2">
                        {types.map((type) => (
                            <div key={type.id} className="text-lg font-semibold">{type.name}</div>
                        ))}
                    </div>
                    )
                }
                {/* Reviews */}
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: Math.floor(avgReview) }, (_, i) => (
                        <Star key={i} size={16} className="fill-current" />
                    ))}
                    {avgReview - Math.floor(avgReview) >= 0.5 && <HalfFilledStar size={16} />}
                    {Array.from({ length: 5 - Math.ceil(avgReview) }, (_, i) => (
                        <Star key={i} size={16} />
                    ))}
                    <div className='font-bold text-xs pl-1'>({reviews.length > 0 ? reviews.length : 0})</div>
                </div>
            </div>
        </div>
    );
};

export default Product;
