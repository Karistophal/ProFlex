import React from 'react'
import ProductLoad from '@/app/components/product/ProductLoad'

function loading() {
    return (
        <div className="flex min-h-screen m-10 mx-20">
            <div className="flex flex-col gap-2 h-[300px]  w-[300px] p-4 mr-14 border-[1px] border-gray-300 rounded-lg">
                <div className="flex flex-col justify-center text-center">
                    <div className="text-2xl font-bold animate-pulse bg-black bg-opacity-10 text-transparent rounded-md">
                        Filtrer
                    </div>
                    <div className="my-2 text-gray-500 text-xl mt-20 animate-pulse bg-black bg-opacity-10 text-transparent rounded-md">
                        Fonctionnalité à venir
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="w-[500px] text-4xl font-bold animate-pulse bg-black bg-opacity-10 text-transparent rounded-md">
                    D
                </div>
                <div className="w-full flex flex-wrap gap-4 pt-8">
                    {[1, 2, 3, 4, 5, 6].map((product) => (
                        <ProductLoad key={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default loading