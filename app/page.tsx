import React from "react";

import Category from "./components/home/category/Category";
import Redirect from "./components/home/Redirect";
import Product from "./components/product/Product";

import getAllCategory from "./actions/getAllCategory";
import getTrending from "./actions/getTrending"

export default async function Home() {

  const categories = await getAllCategory();
  const trending = await getTrending();
  

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-10 gap-12">
      {/* Head */}
      <div className="relative w-full h-96 bg-neutral-300 rounded-lg">
        <img src="https://www.trace-ta-route.com/wp-content/uploads/2020/08/Randonnee-Bauges-Arcalod-24-ascension-Trace-Les-Cimes-1050x700.jpg" alt="head" className="w-full h-full object-cover rounded-lg" />
        <div className="absolute w-full flex flex-col justify-center top-1/2 transform -translate-y-1/2 text-5xl font-bold text-white text-center">
          <div>Boostez Votre Performance</div>
          <div>Libérez Votre Potentiel</div>
        </div>
      </div>


      {/* categories */}
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-end pb-4">
          <div className=" text-4xl font-bold">Categories</div>
          <Redirect name="View all categories" url="/categories" underline />
        </div>
        <div className="w-full flex gap-4">
          {categories?.map((category: any) => (
            <Category key={category.id} name={category.name} img={category.image} />
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between pb-4">
          <div className=" text-4xl font-bold">Trending</div>
          <Redirect name="View more" url="/trending" underline />
        </div>
        <div className="w-full flex gap-4">
          {trending?.map((trend: any) => (
            <Product key={trend.id} id={trend.product.id} name={trend.product.name} image={trend.product.images} price={trend.product.price} reviews={trend.product.reviews} />
          ))}
        </div>
      </div>

      {/* Products */}
    </div>
  );
}
