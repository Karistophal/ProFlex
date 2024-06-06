
import React from "react";

import getCategoryProducts from "../../actions/getCategoryProducts";

import Product from "@/app/components/products/Product";

interface IParams {
    categoriesId?: string;
}

const CategoryPage = async ({ params }: { params: IParams }) => {

    if (!params.categoriesId) return null;

    const products = await getCategoryProducts(params.categoriesId);
    if (!products) return null;
        
    return (
        <div>
            {products.map((product) => (
                <Product
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    {...product.images[0] && { image: product.images[0].url }}
                    types={product.productType}
                    reviews={product.reviews}
                />
            ))}
        </div>
    );
}

export default CategoryPage;