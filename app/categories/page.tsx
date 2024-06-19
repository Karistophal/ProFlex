
import React from "react";

import getAllCategory from "../actions/getAllCategory";

import Category from "../components/home/category/Category";


const CategoryAllPage = async () => {


    const categories = await getAllCategory();
    if (!categories) return null;



    return (
        <div className="flex m-10 mx-20 h-fit "> 
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
            <div className="flex flex-col w-full h-fit">
                <div className="w-full text-4xl font-bold">
                    Découvrez toutes nos catégories
                </div>
                <div className="w-full gap-4 pt-8 flex flex-wrap">
                    {categories.map((category) => (
                        <div className="h-[350px]" key={category.id}>
                            <Category
                            id={category.id}
                            name={category.name}
                            img={category.image}
                        />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategoryAllPage;