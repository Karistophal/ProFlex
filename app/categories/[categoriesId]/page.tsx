
import React from "react";

import getCategoryProducts from "../../actions/getCategoryProducts";

import Product from "@/app/components/product/Product";

interface IParams {
    categoriesId?: string;
}

const CategoryPage = async ({ params }: { params: IParams }) => {

    if (!params.categoriesId) return null;

    const products = await getCategoryProducts(params.categoriesId);
    if (!products) return null;



    return (
        <div className="flex flex-col justify-center m-10">
            <div className="w-full text-4xl font-bold text-center">
                Découvrez nos produits de {decodeURIComponent(params.categoriesId)}
            </div>
            <div className="px-32 pt-8">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.images}
                        types={product.productType}
                        reviews={product.reviews}
                    />
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;