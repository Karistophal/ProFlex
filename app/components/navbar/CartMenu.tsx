import React, { useEffect } from "react";
import Button from "../Button";

import { useRouter } from "next/navigation";
import getCartItems, { deleteCartItem } from "@/app/actions/getCartItems";
import { SafeUser } from "@/app/types";
import CartItemSmall from "./CartItem";

import { useCartStore } from "@/app/stores/cartStore";

interface CartMenuProps {
    currentUser?: SafeUser | null;
    closeCart: () => void;
    handleConnect: () => void;
}



const CartMenu: React.FC<CartMenuProps> = ({ currentUser, closeCart, handleConnect }) => {
    const router = useRouter();

    const { cart, removeFromCart } = useCartStore();

    const totalPrice = cart.reduce((acc, item) => {
        const { product, quantity } = item;
        const { price } = product;
        return acc + price * quantity;
    }, 0);

    async function handleDelete(productId: string) {
        if (currentUser) {
            try {
                const response = await deleteCartItem(productId);
                removeFromCart(productId);
            } catch (error) {
            }
        } else {
        }
    }

    const handleViewCart = () => {
        closeCart();
        router.push("/cart");
    };

    return (
        <div onMouseLeave={() => closeCart()} className="absolute top-12 right-0 w-80 bg-white rounded-lg flex flex-col gap-2 p-4 z-50 shadow-lg shadow-black">
            <div className="text-xl font-bold text-center border-b-2 border-gray-300 p-2">
                Mon panier
            </div>
            {currentUser ? (
                <>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {cart && cart.length > 0 ? (cart.map((item) => (
                                <CartItemSmall key={item.id} cartItems={item} onDelete={() => handleDelete(item.id)} />
                            ))) : (
                                <div className="text-center my-8">Votre panier est vide</div>
                            )}

                        </div>
                        {
                            cart.length > 0 && (
                                <div className="flex justify-between p-2">
                                    <div>Total</div>
                                    <div>{totalPrice.toFixed(2)}€</div>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex gap-4">
                        <Button label="Voir le panier" onClick={handleViewCart} small />

                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="text-center my-8 px-5">Connectez-vous pour voir votre panier</div>
                    <Button label="Se connecter" onClick={handleConnect} small />
                </div>
            )}
        </div>
    );
};

export default CartMenu;
