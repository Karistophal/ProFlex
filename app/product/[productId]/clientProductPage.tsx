'use client'

import React, { useState } from "react";

import useLoginModal from "@/app/hook/useLoginModal";
import axios from "axios";
import { Review } from "@prisma/client";
import { useAppContext } from "@/app/context";
import toast from 'react-hot-toast';

import Reviews from "@/app/components/product/Reviews";
import ReviewStars from "@/app/components/inputs/ReviewStars";
import TypeInput from "@/app/components/inputs/TypeInput";
import Hr from "@/app/components/Hr";

import { Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  productType: {
    id: string;
    name: string 
  }[];
  reviews: ReviewWithUser[];
}
interface ReviewWithUser extends Review {
  user: {
    name: string | null;
    email: string;
    createdAt: Date;
  } | null;
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
  const [selectedTypeName, setSelectedTypeName] = useState<string>('' || product.productType[0]?.name);
  const [selectedTypeId, setSelectedTypeId] = useState<string>('' || product.productType[0]?.id);
  const [reviews, setReviews] = useState<ReviewWithUser[]>(product.reviews);
  const loginModal = useLoginModal();

  const { cart, setCart } = useAppContext();

  const handlePrincipalChange = (url: string) => {
    setMainImage(url);
  }

  const handlePreviewImage = (url: string) => {
    setCurrentImage(url);
  }

  const handleTypeChange = (name: string, id: string) => {
    setSelectedTypeId(id);
    setSelectedTypeName(name);
  }

  const handleAddToCart = async () => {
    await axios.post(`/api/cart/${product.id}`, {
      quantity: productQuantity,
      selectedType: selectedTypeId
    }).catch((error) => {
      if (error.response.status === 401) {
        loginModal.onOpen();
      }
    }).then((response) => {
      if (response?.status === 200) {
        toast.success('Produit ajouté au panier');      
      }
    });
  }
      
  const handleUpdateQuantity = (int: number) => {
    if (productQuantity + int > 0 && productQuantity + int < 11) {
      setProductQuantity(productQuantity + int);
    }
  }

  return (
    <div className="flex flex-col gap-24 w-full justify-center py-5 pb-10 md:py-20 xl:px-20 md:px-20 px-4">
      <div className="flex h-full w-full items-center lg:flex-row flex-col ">
        <div className="lg:hidden mb-5 text-4xl sm:text-5xl font-bold text-start w-full">{product.name}</div>
        <div className="flex mb-10 flex-col gap-8 lg:w-3/5 w-full md:min-w-[450px] lg:mr-14">
          <Image src={currentImage} alt="" className="w-full sm:h-[500px] h-[200px] object-cover rounded-3xl" width={900} height={600} />
          <div className="w-full flex gap-2 overflow-x-auto">
            {product.images.map((img, index) => (
              <Image
              key={index}
              src={img.url}
              alt={product.name}
              className="w-1/2 md:w-1/4 h-[25vw] sm:h-40 object-cover cursor-pointer border-2 rounded-xl border-transparent hover:border-blue-500"
              width={300}
              height={300}
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

        <div className=" h-3/4 flex flex-col items-between gap-8 lg:w-1/2 w-full">
          <h1 className="hidden lg:block text-5xl font-bold">{product.name}</h1>
          <p className="text-gray-500 font-bold text-lg sm:text-xl max-w-[600px]">{product.description}</p>

          <div className="flex flex-col gap-4">
            <ReviewStars reviews={product.reviews} size={20} reviewCounter />
            <p className="text-3xl font-bold">{product.price.toFixed(2)}€</p>
          </div>

          <div className="flex gap-4 text-gray-500">
            {product.productType.map((type) => (
              <TypeInput key={type.id} name={type.name} selected={selectedTypeName === type.name} onClick={() => handleTypeChange(type.name, type.id)} />
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
              <span className="text-lg sm:text-xl">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
      <Hr />
      {/*avis*/}
      <Reviews productId={product.id} />
    </div>
  );
};

export default ClientProductPage;
