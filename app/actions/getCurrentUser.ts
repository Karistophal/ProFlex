import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import prisma from "../libs/prismadb";


// Get the current session
export async function getSession() {
    return await getServerSession(authOptions)
}

// Get the current user
export default async function getCurrentUser() {
    try {
        const session = await getSession() 

        if (!session?.user?.email) { // If no session
            return null
        }

        // Fetch the user from the database
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString()
        }
            
        ;

    } catch (error: any) { 
        return null
    }
}