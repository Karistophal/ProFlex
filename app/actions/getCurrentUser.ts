import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import prisma from "../libs/prismadb";


// get la session
export async function getSession() {
    return await getServerSession(authOptions)
}


// get l'utilisateur actuel
export default async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session?.user?.email) { // If no session
            return null
        }

        // Recherche de l'utilisateur dans la base de données
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

export async function deleteUser(id: string) {

        await prisma.user.delete({
            where: {
                id: id
            }
        });

}



export async function changePassword(password: string) {
    
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return false;
    }

    try {
        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                hashedPassword: password,
            }
        });

        return true;
    } catch (error: any) {
        return false;
    }
}

export async function changeEmail(email: string) {
    const session = await getSession();
    if (!session?.user?.email) {
        return false;
    }

    try {
        await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                email: email,
            }
        });

        return true;
    } catch (error: any) {
        return false;
    }
}

export async function changeName(name: string) {
    const session = await getSession();
    if (!session?.user?.email) {
        return false;
    }

    try {
        await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                name: name,
            }
        });

        return true;
    } catch (error: any) {
        return false;
    }
}