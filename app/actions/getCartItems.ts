'use server';

import prisma from "../libs/prismadb";
import getCurrentUser, { getSession } from "./getCurrentUser";


export default async function getCartItems(userId: string) {
    try {
        const cartItems = await prisma.cartItem.findMany({
            where: {
                userId
            },
            include: {
                productType: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        stripePriceId: true,
                        productType: {
                            select: {
                                name: true
                            }
                        },
                        images: {
                            select: {
                                url: true
                            }
                        }
                    }
                }
            }
        });

        return cartItems;
    }
    catch (error) {
        return null;
    }
}


export async function deleteCartItem(productId: string) {

    const session = await getSession();
    if (!session) {
        throw new Error("You need to be logged in to delete a cart item");
    }
    const currentUser = await getCurrentUser();    
    if (!currentUser) {
        throw new Error("You need to be logged in to delete a cart item");
    }

    console.log("Deleting cart item", productId, currentUser.id);
    
    try {
        const deletedCount = await prisma.cartItem.deleteMany({
            where: {
                id: productId,
                userId: currentUser.id, // Assure-toi que le userId est pris en compte
            }
        });
        console.log("Deleted cart item", deletedCount);
        

        if (deletedCount.count > 0) {
            return { message: "Cart item deleted", quantity: deletedCount.count };
        } else {
            throw new Error("Cart item not found");
        }
    } catch (error) {
        throw new Error("Failed to delete cart item");
    }
}