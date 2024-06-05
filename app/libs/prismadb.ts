// Code pour eviter de create new instance de PrismaClient à chaque requête
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// Si on est en production, on crée une nouvelle instance de PrismaClient
const client = globalThis.prisma || new PrismaClient(); 
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

export default client;
