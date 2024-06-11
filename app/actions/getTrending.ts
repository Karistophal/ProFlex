
import prisma from "../libs/prismadb";

export default async function getTrendingProducts() {
    const trendingProducts = await prisma.productTrending.findMany(
        {
            include : {
                product : {
                    include: {
                        reviews: true,
                        images: true,
                    }
                }

            }
        }
    );
    return trendingProducts;
}
