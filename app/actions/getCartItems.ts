'use server';

import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

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
    
    
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return false;
    }

    try {
        const deletedCount = await prisma.cartItem.deleteMany({
            where: {
                id: productId,
            }
        });

        // retourne true si un élément a été supprimé
        if (deletedCount.count > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}