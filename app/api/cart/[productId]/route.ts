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
    const { quantity, selectedType } = await req.json();   




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
    // verifier si CartItem existe
    const cartItem = await prisma.cartItem.findFirst({
        where: {
            productId: productId,
            ...(selectedType && { productTypeId: selectedType }), // si selectedType existe
            userId: user.id
        }
    });

    // si cartItem existe, actualiser la quantité
    if (cartItem) {
        await prisma.cartItem.update({
            where: {
                id: cartItem.id
            },
            data: {
                quantity: cartItem.quantity + (quantity || 1)
            }
        });
        
        const totalQuantity = await prisma.cartItem.aggregate({
            _sum: {
              quantity: true,
            },
            where: {
              userId: user.id,
            },
          });
        return NextResponse.json({ message: "Cart updated", quantity: totalQuantity._sum.quantity });
    }
    // si cartItem n'existe pas, créer un nouveau
    await prisma.cartItem.create({
        data: {
            quantity: quantity || 1,
            productId: productId,
            userId: user.id,
            ...(selectedType && { productTypeId: selectedType }),
        },
    });
     
    const totalQuantity = await prisma.cartItem.aggregate({
        _sum: {
          quantity: true,
        },
        where: {
          userId: user.id,
        },
      });
    return NextResponse.json({ message: "Cart updated", quantity: totalQuantity._sum.quantity });
}