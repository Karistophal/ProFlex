import React from "react";

import Category from "./components/home/category/Category";
import Redirect from "./components/home/Redirect";
import Product from "./components/product/Product";

import getAllCategory from "./actions/getAllCategory";
import getTrending from "./actions/getTrending"
import Image from "next/image";

export default async function Home() {
  const categories = await getAllCategory() ?? [];
  const trending = await getTrending() ?? [];

  return (
  <div className="flex flex-col items-center min-h-screen  px-5 md:px-16 lg:px-24 py-12 gap-12 ">
      {/* Head */}
      <div className="relative w-full h-[30vw] md:h-96 bg-neutral-300 rounded-lg">
        <Image src="https://www.trace-ta-route.com/wp-content/uploads/2020/08/Randonnee-Bauges-Arcalod-24-ascension-Trace-Les-Cimes-1050x700.jpg" alt="head" className="w-full h-full object-cover rounded-lg" height={700} width={1050} /> 
        <div className="absolute w-full flex flex-col justify-center top-1/2 transform -translate-y-1/2 text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center text-shadow-md">
          <div>Boostez Votre Performance</div>
          <div>Libérez Votre Potentiel</div>
        </div>
      </div>


      {/* categories */}
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-end pb-4">
          <div className="text-3xl sm:text-4xl font-bold">Catégories</div>
          <Redirect name="Voir plus" url="/categories" underline />
        </div>
        <div className="w-full h-28 sm:h-36 lg:h-44 flex gap-4 flex-wrap overflow-hidden">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                img={category.image}
              />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="text-2xl font-bold">
                Pas de catégories disponibles
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trending */}
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-end pb-4">
          <div className="text-3xl sm:text-4xl font-bold">Tendances</div>
          <Redirect name="Voir plus" url="/trending" underline />
        </div>
        <div className="w-full h-50 flex gap-4 flex-wrap overflow-hidden">
          { trending?.length > 0 ? ( 
            trending.map((trend: any) => (
              <Product key={trend.id} id={trend.product.id} name={trend.product.name} image={trend.product.images} price={trend.product.price} reviews={trend.product.reviews} />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="text-2xl font-bold">
                Pas de produits tendances disponibles
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
    </div>
  );
}
