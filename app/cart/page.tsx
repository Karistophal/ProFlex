import React from "react";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getCartItems, { deleteCartItem } from "../actions/getCartItems";
import { CartItem } from "../types";

import Hr from "@/app/components/Hr";
import PayButton from "../components/cart/payButton";
import CartItemProps from "../components/cart/cartItem";


const CartPage = async () => {
    let totalPrice = 0;
    const currentUser = await getCurrentUser();
    let cartItems: CartItem[] = [];

    if (currentUser) {
        const cartItemsRequest = await getCartItems(currentUser.id);
        cartItems = cartItemsRequest ? cartItemsRequest : [];

        totalPriceFunction()
    }

    function totalPriceFunction() {
        totalPrice = cartItems.reduce((acc, item) => {
            const { product, quantity } = item;
            const { price } = product;
            return acc + price * quantity;
        }, 0);
    }

    return (
        <div className="w-full h-full flex gap-4 px-32 pt-10">
            {
                currentUser ? (
                    <>
                        <div className="flex flex-col items-start w-full">
                            <div className="text-4xl w-full font-bold mb-6 pl-4">Mon Panier</div>
                            <div className="flex w-full gap-5">
                                <div className="flex flex-col min-w-[600px] w-full gap-4 p-6 bg-gray-200 h-min-20 rounded-xl">
                                    <div className="text-2xl font-bold">
                                        Produits dans votre panier :
                                    </div>
                                    <Hr />
                                    {cartItems.length > 0 ? (cartItems.map((item, index) => {
                                        const { product, quantity } = item;
                                        const { name, price } = product;
                                        return (
                                            <>
                                                <CartItemProps
                                                    key={index}
                                                    name={name}
                                                    price={price}
                                                    quantity={quantity}
                                                    image={product.images[0].url}
                                                />
                                                {index !== cartItems.length - 1 && <Hr />}
                                            </>
                                        );
                                    }
                                    )
                                    ) : (
                                        <div className="flex justify-center items-center w-full h-full">
                                            <div className="text-2xl">Votre panier est vide</div>
                                        </div>
                                    )
                                    }
                                </div>
                                {/* Panier */}
                                <div className="flex flex-col h-fit min-w-[350px] p-6 bg-gray-200 rounded-xl  ">
                                    <div className="text-2xl font-bold mb-4">Récapitulatif :</div>
                                    <Hr />
                                    <div className="pb-3 pt-4">
                                        {cartItems.length > 0 ? (
                                            cartItems.map((item, index) => {
                                                const { product, quantity } = item;
                                                const { name, price } = product;
                                                return (
                                                    <div key={index} className="flex justify-between gap-5 pb-2">
                                                        <div className="flex gap-1">
                                                            <div className="max-w-32">{name}</div>
                                                            <div className="">x {quantity}</div>
                                                        </div>
                                                        <div className="">{price.toFixed(2)}$ </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="flex justify-center items-center w-full h-full">
                                                <div className="text-2xl">Votre panier est vide</div>
                                            </div>
                                        )
                                        }
                                    </div>
                                    <Hr />
                                    <div className="flex justify-between py-4">
                                        <div className="font-bold text-xl">Total :</div>
                                        <div className="font-bold text-xl">{totalPrice.toFixed(2)}$</div>
                                    </div>
                                    <PayButton />
                                </div>
                            </div>
                        </div>
                    </>
                    // si l'utilisateur n'est pas connecté
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="text-2xl">Veuillez vous connecter pour accéder à votre panier</div>
                    </div>
                )
            }
        </div>
    );
}

export default CartPage;