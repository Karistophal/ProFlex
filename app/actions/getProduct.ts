
import prisma from "../libs/prismadb";


export default async function getProduct(id: string) {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        },
        include: {
            images: true,
            reviews: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            createdAt: true,
                        }
                    }
                },
                orderBy: {
                    rating: "desc"
                }
            },
            productType: true,
        }
    });

    return product;
}