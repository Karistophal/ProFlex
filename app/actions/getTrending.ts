
import prisma from "../libs/prismadb";

export default async function getTrendingProducts() {
    try {
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
    catch (error) {
        console.log(error);
        return null;
    }
}
