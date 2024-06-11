import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    productId?: string;
}

export async function POST(
    req: Request,
    { params }: { params: IParams }
) {    
    const user = await getCurrentUser()
    

    if (!user) {
        return NextResponse.json({ message: "You need to be logged in to add to cart" }, { status: 401 });
    }

    const { productId } = params;
    const { quantity } = await req.json();
    
    
    if (!productId) {
        return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }
    

    // Check if product exists
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });
    if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    // Check if cartItem exists
    const cartItem =
        await prisma.cartItem.findFirst({
            where: {
                productId: productId,
                userId: user.id
            }
        });
    // If cartItem exists, update quantity
    if (cartItem) {
        await prisma.cartItem.update({
            where: {
                id: cartItem.id
            },
            data: {
                quantity: cartItem.quantity + (quantity || 1)
            }
        });
        return NextResponse.json({ message: "Cart updated" });
    }
    // If cartItem does not exist, create new cartItem
    await prisma.cartItem.create({
        data: {
            quantity: quantity || 1,
            productId: productId,
            userId: user.id
        }
    });
    return NextResponse.json({ message: "Cart updated" });

}
