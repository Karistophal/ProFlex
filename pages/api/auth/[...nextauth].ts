

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
        providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID! as string,
            clientSecret: process.env.APPLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) { // If the credentials are missing
                    throw new Error('Invalid credentials');
                }

                // set the user to the user with the email
                const user = await prisma.user.findUnique({ 
                    where: { 
                        email: credentials.email 
                    }
                });              
                
                if (!user || !user?.hashedPassword) { // If the user is not found
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                
                if (!isCorrectPassword) { // If the password is incorrect
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);