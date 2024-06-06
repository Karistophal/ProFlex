
import prisma from "../libs/prismadb";

export default async function getAllCategory() {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error: any) {
        return null;
    }
} 