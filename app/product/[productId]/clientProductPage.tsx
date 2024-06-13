'use client'

import React, { useState } from "react";

import useLoginModal from "@/app/hook/useLoginModal";
import axios from "axios";
import { Review } from "@prisma/client";

import Reviews from "@/app/components/product/Reviews";
import ReviewStars from "@/app/components/inputs/ReviewStars";
import TypeInput from "@/app/components/inputs/TypeInput";
import Hr from "@/app/components/Hr";

import { Plus, Minus, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  productType: { name: string }[];
  reviews: ReviewWithUser[];
}
interface ReviewWithUser extends Review {
  user: {
    name: string | null;
    email: string;
    createdAt: Date;
  }
}
interface clientProductPageProps {
  product: Product;
}

const ClientProductPage: React.FC<clientProductPageProps> = ({
  product
}) => {

  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState(product.images[0]?.url || '');
  const [currentImage, setCurrentImage] = useState(product.images[0]?.url || '');
  const [selectedType, setSelectedType] = useState<string>('' || product.productType[0]?.name);
  const [reviews, setReviews] = useState<ReviewWithUser[]>(product.reviews);
  const loginModal = useLoginModal();

  const handlePrincipalChange = (url: string) => {
    setMainImage(url);
  }

  const handlePreviewImage = (url: string) => {
    setCurrentImage(url);
  }

  const handleTypeChange = (name: string) => {
    setSelectedType(name);
  }


  const handleAddToCart = async () => {
    console.log(productQuantity);

    await axios.post(`/api/cart/${product.id}`, {
      quantity: productQuantity
    }).catch((error) => {
      if (error.response.status === 401) {
        loginModal.onOpen();
      }
    }
    );
  }

  const handleUpdateQuantity = (int: number) => {
    if (productQuantity + int > 0 && productQuantity + int < 11) {
      setProductQuantity(productQuantity + int);
    }
  }





  return (
    <div className="flex flex-col gap-24 w-full justify-center py-20 px-20">
      <div className="flex gap-14 h-full w-full items-center">

        <div className="w-3/5 flex flex-col gap-8">
          <img src={currentImage} alt="" className="w-full h-[500px] object-cover rounded-3xl" />
          <div className="w-full flex gap-2 overflow-x-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt=""
                className="w-1/4 h-40 object-cover cursor-pointer border-2 rounded-xl border-transparent hover:border-blue-500"
                onClick={() => {
                  handlePrincipalChange(img.url);
                  handlePreviewImage(img.url);
                }}
                onMouseEnter={() => handlePreviewImage(img.url)}
                onMouseLeave={() => handlePreviewImage(mainImage)}
              />
            ))}
          </div>
        </div>

        <div className="w-1/2 h-3/4 flex flex-col items-between gap-8">
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="text-gray-500 font-bold text-xl max-w-[600px]">{product.description}</p>

          <div className="flex flex-col gap-4">
            <ReviewStars reviews={product.reviews} size={20} reviewCounter />
            <p className="text-3xl font-bold">{product.price}€</p>
          </div>

          <div className="flex gap-4 text-gray-500">
            {product.productType.map((type, index) => (
              <TypeInput key={index} name={type.name} selected={selectedType === type.name} onClick={() => handleTypeChange(type.name)} />
            ))}
          </div>

          <div className="flex gap-6 ">
            <div className="h-14  flex items-center w-auto bg-gray-200 rounded overflow-hidden">
              <button onClick={() => handleUpdateQuantity(-1)} className="h-full px-3 text-blue-500"><Minus size={20} strokeWidth={3} /></button>
              <span className="w-10 text-center font-bold">{productQuantity}</span>
              <button onClick={() => handleUpdateQuantity(1)} className="h-full px-3 text-blue-500"><Plus size={20} strokeWidth={3} /></button>
            </div>
            <button className="flex items-center gap-3 bg-blue-500 text-white text-lg font-semibold px-7 py-2 rounded-md" onClick={handleAddToCart} >
              <ShoppingCart size={20} strokeWidth={3} />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
      <Hr />
      {/*avis*/}
      <Reviews product={product} />
    </div>
  );
};

export default ClientProductPage;
