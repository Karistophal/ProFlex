import prisma from "../libs/prismadb";

export default async function getCategoryProducts(nameCategory: string) {
    nameCategory = decodeURIComponent(nameCategory);
    
    try {
        const products = await prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        category: {
                            name: nameCategory,
                        },
                    },
                },
            },
            include: {
                images: true,
                productType: true,
                reviews: true,
            },
        });

        return products;
    } catch (error: any) {
        return null;
    }
}
