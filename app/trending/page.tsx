
import React from "react";

import getTrending from "../actions/getTrending";
import Product from "@/app/components/product/Product";

const TrendingPage = async () => {

    const trends = await getTrending();
    if (!trends) return null;
    


    return (
        <div className="flex min-h-screen m-10 mx-20">
            <div className="flex flex-col gap-2 h-[300px]  w-[300px] p-4 mr-14 border-[1px] border-gray-300 rounded-lg">
                <div className="flex flex-col justify-center text-center">
                    <div className="text-2xl font-bold">
                        Filtrer
                    </div>
                    <div className="my-2 text-gray-500 text-xl mt-20">
                        Fonctionnalité à venir
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="w-full text-4xl font-bold">
                    Découvrez nos produits tendances
                </div>
                <div className="w-full flex flex-wrap gap-4 pt-8">
                    {trends.map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.product.name}
                            price={product.product.price}
                            image={product.product.images}
                            types={product.product.productType}
                            reviews={product.product.reviews}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TrendingPage;