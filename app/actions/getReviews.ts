'use server';

import prisma from "../libs/prismadb";


export default async function getReviews(productId: string, sortType: string, limit: number) {
    
    console.log(productId, sortType, limit);
    
    switch (sortType) {
        case "newest":
            return prisma.review.findMany({
                where: {
                    productId
                },
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            createdAt: true,
                        }
                    }
                },
                take: limit
            })
        case "oldest":
            return prisma.review.findMany({
                where: {
                    productId
                },
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            createdAt: true,
                        }
                    }
                },
                take: limit
            })
        case "best":
            return prisma.review.findMany({
                where: {
                    productId
                },
                orderBy: {
                    rating: "desc"
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            createdAt: true,
                        }
                    }
                },
                take: limit
            })
        case "worst":
            return prisma.review.findMany({
                where: {
                    productId
                },
                orderBy: {
                    rating: "asc"
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            createdAt: true,
                        }
                    }
                },
                take: limit
            })
        default:
            return prisma.review.findMany({
                where: {
                    productId
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            createdAt: true,
                        }
                    }
                },
                take: limit
            })
    }
}