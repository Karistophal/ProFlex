import React, { useContext } from "react";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getCartItems from "../actions/getCartItems";
import { CartItem } from "../types";

import Hr from "@/app/components/Hr";
import PayButton from "../components/cart/payButton";


const CartPage = async () => {
    let totalPrice = 0;
    let cartItems: CartItem[] = []
    const currentUser = await getCurrentUser();

    if (currentUser) {
        cartItems = await getCartItems(currentUser.id);
        totalPrice = cartItems.reduce((acc, item) => {
            const { product, quantity } = item;
            const { price } = product;
            return acc + price * quantity;
        }, 0);
    }

    return (
        <div className="w-full h-full flex gap-4 px-20 pt-10">
            {
                currentUser ? (
                    <>
                        <div className="flex flex-col items-start w-full ">
                            <div className="text-2xl w-full font-bold">Mon Panier</div>
                            <div className="flex w-full gap-5">
                                <div className="flex flex-col w-full gap-4 p-6 bg-gray-200 h-min-20 rounded-xl">
                                    {cartItems.length > 0 ? (cartItems.map((item, index) => {
                                        const { product, quantity } = item;
                                        const { name, price } = product;

                                        return (
                                            <div key={index} className="flex justify-between">
                                                <div className="">{name}</div>
                                                <div className="">{price} $ x {quantity}</div>
                                            </div>
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
                                <div className="flex flex-col h-fit min-w-[300px] p-6 bg-gray-200 rounded-xl  ">
                                    <div className="pb-3">
                                        {cartItems.length > 0 ? (
                                            cartItems.map((item, index) => {
                                                const { product, quantity } = item;
                                                const { name, price } = product;
                                                return (
                                                    <div key={index} className="flex justify-between gap-5">
                                                        <div className="max-w-32">{name}x {quantity}</div>
                                                        <div className="">{price} $ </div>
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
                                    <div className="flex justify-between py-2">
                                        <div className="">Total:</div>
                                        <div className="">${totalPrice}</div>
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