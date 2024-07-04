import React from "react";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getCartItems, { deleteCartItem } from "../actions/getCartItems";
import { CartItem } from "../types";

import Hr from "@/app/components/Hr";
import BuyButton from "@/app/components/checkout/buyButton";
import CartItemProps from "../components/cart/cartItem";



const CartPage = async () => {
    const currentUser = await getCurrentUser();
    let cartItems: CartItem[] = [];
    let sousTotalPrice = 0
    let taxesPrice = 0
    let totalPrice = 0

    if (currentUser) {
        const cartItemsRequest = await getCartItems(currentUser.id);
        cartItems = cartItemsRequest ? cartItemsRequest : [];

        totalPriceFunction()
    }

    function totalPriceFunction() {
        // Calcul sous-total
        sousTotalPrice = cartItems.reduce((acc, item) => {
            const { product, quantity } = item;
            const { price } = product;
            return acc + price * quantity;
        }, 0);
        // calcul Taxes
        taxesPrice = sousTotalPrice * 0.1

        totalPrice = sousTotalPrice + taxesPrice
    }

    return (
        <div className="w-full px-10 lg:px-32 py-10 min-h-[calc(100vh-64px)] ">
            {
                currentUser ? (
                    <>
                        <div className="flex flex-col items-start w-full">
                            <div className="text-4xl w-full font-bold mb-16">Mon Panier</div>
                            <div className="flex flex-col w-full gap-5 lg:flex-row">
                                <div className="flex flex-col md:min-w-[600px] w-full gap-4 mr-12 h-min-20 rounded-xl">
                                    <div className="text-2xl font-bold">
                                        {cartItems.length} produits
                                    </div>
                                    <Hr />
                                    {cartItems.length > 0 ? (cartItems.map((item, index) => {
                                        const { product, quantity, id, productType } = item;
                                        const { name, price } = product;
                                        return (
                                            <>
                                                <CartItemProps
                                                    key={index}
                                                    id={id}
                                                    productId={product.id}
                                                    {...productType}
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
                                            <div className="text-2xl py-32 lg:py-0">Votre panier est vide</div>
                                        </div>
                                    )
                                    }
                                </div>
                                {/* Panier */}
                                <div className="flex flex-col h-fit min-w-[350px] p-6 border-gray-300 border-[1px] rounded-xl">
                                    <div className="text-2xl font-extrabold">Récapitulatif</div>
                                    <div className="pb-3 pt-6">
                                        {cartItems.length > 0 && (
                                            cartItems.map((item, index) => {
                                                const { product, quantity, productType } = item;
                                                const { name, price } = product;
                                                return (
                                                    <div key={index} className="flex justify-between gap-5 pb-2">
                                                        <div className="flex gap-1">
                                                            <div className="">
                                                                <div className="text-lg max-w-32">{name}</div>
                                                                {productType && (<div className="text-sm text-gray-500">{productType.name}</div>)}
                                                            </div>
                                                            <div className="text-lg">x {quantity}</div>
                                                        </div>
                                                        <div className="text-lg font-bold">{(price * quantity).toFixed(2)}€</div>
                                                    </div>
                                                );
                                            })
                                        )
                                        }
                                        <div className="pb-3 pt-6 ">
                                            <div className="flex justify-between mb-2">
                                                <div className="text-lg text-gray-500">Sous-total</div>
                                                <div className="text-lg font-bold">{sousTotalPrice.toFixed(2)}€</div>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <div className="text-lg text-gray-500">Taxes</div>
                                                <div className="text-lg font-bold">{taxesPrice.toFixed(2)}€</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Hr />
                                    <div className="flex justify-between py-4">
                                        <div className="font-bold text-xl">Total :</div>
                                        <div className="font-bold text-xl">{totalPrice.toFixed(2)}€</div>
                                    </div>
                                    <BuyButton />
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