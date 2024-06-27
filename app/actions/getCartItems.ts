'use server';

import { NextResponse } from "next/server";
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
        return NextResponse.json({ message: "You need to be logged in to delete cart item" }, { status: 401 });
    }

    try {
        const deletedCount = await prisma.cartItem.deleteMany({
            where: {
                id: productId,
            }
        });
        
        // retourne true si un élément a été supprimé
        if (deletedCount.count > 0) {
            console.log(deletedCount);
            
            return NextResponse.json({ message: "Cart item deleted", quantity: deletedCount.count}, { status: 200 });
        } else {
            return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
        }
    }
    catch (error) {
        return NextResponse.json({ message: "Error deleting cart item" }, { status: 500 });
    }
}