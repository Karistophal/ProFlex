'use server';

import prisma from "../libs/prismadb";

export default async function getCartItems(userId: string) {
    const cartItems = await prisma.cartItem.findMany({
        where: {
            userId
        },
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    price: true,
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