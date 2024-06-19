

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { stripe } from "@/app/libs/stripe";

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
                if (!credentials?.email || !credentials?.password) { // si les credentials sont vides
                    throw new Error('Invalid credentials');
                }

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
    events: {
        createUser: async (message) => {
            const userId = message.user.id;
            const email = message.user.email;
            const name = message.user.name;

            if (!userId || !email) {
                return;
            }

            const stripeCustomer = await stripe.customers.create({
                email: email,
                name: name ?? undefined,
            });

            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    stripeCustomerId: stripeCustomer.id,
                },
            });
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);