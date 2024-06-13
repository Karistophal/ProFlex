import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import getCartItems from "@/app/actions/getCartItems";
import { SafeUser } from "@/app/types";
import CartItemSmall from "./CartItem";
import { CartItem } from "@/app/types";

interface CartMenuProps {
    currentUser?: SafeUser | null;
    handleConnect: () => void;
}


const CartMenu: React.FC<CartMenuProps> = ({ currentUser, handleConnect }) => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (currentUser) {
                const items = await getCartItems(currentUser.id);
                setCartItems(items);
                console.log(items);
                
            }
        };

        fetchCartItems();

        return () => {
            setCartItems([]);
        };
    }, [currentUser]);

    const totalPrice = cartItems.reduce((acc, item) => {
        const { product, quantity } = item;
        const { price } = product;
        return acc + price * quantity;
    }, 0);

    const handlePay = () => {
        router.push("/checkout");
    };

    const handleViewCart = () => {
        router.push("/cart");
    };

    return (
        <div className="absolute top-12 right-0 w-80 bg-white rounded-lg flex flex-col gap-2 p-4 z-50 shadow-lg shadow-gray-600">
            <div className="text-xl font-bold text-center border-b-2 border-gray-300 p-2">
                Mon panier
            </div>
            {currentUser ? (
                <>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            { cartItems && cartItems.map((item) => (
                                <CartItemSmall key={item.id} cartItems={item} onDelete={() => {}} />
                            ))
                            }
                        </div>
                        <div className="flex justify-between p-2">
                            <div>Total</div>
                            <div>{totalPrice} $</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button label="Voir le panier" onClick={handleViewCart} outline small />
                        <Button label="Payer" onClick={handlePay} small />
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="text-center">Connectez-vous pour voir votre panier</div>
                    <Button label="Se connecter" onClick={handleConnect} small />
                </div>
            )}
        </div>
    );
};

export default CartMenu;
