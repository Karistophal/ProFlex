"use client";
import React from 'react';

import { useRouter } from "next/navigation";
import Image from 'next/image';

interface CategoryProps {
    name: string;
    img: string;
    id?: string;
}

const Category: React.FC<CategoryProps> = ({ name, img }) => {
    const router = useRouter();

    return (
        <div className="relative min-w-28 sm:min-w-36 lg:min-w-44 h-full bg-neutral-300 rounded-lg flex flex-col items-center justify-between cursor-pointer overflow-hidden" onClick={() => router.push(`/categories/${name}`)}
        >
            <Image src={img} alt={name} layout="fill" objectFit="cover" />
            <div className="text-shadow-lg absolute bottom-1/2 transform translate-y-1/2 text-white font-bold text-xl sm:text-2xl ">{name}</div>
        </div>
    );
};

export default Category;
