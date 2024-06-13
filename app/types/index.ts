import { User } from '@prisma/client';

export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt'
> & {
    createdAt: string;
    updatedAt: string;
};

export type CartItem = {
    id: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    productId: string;
    product: {
        id: string;
        name: string;
        price: number;
        images: {
            url: string;
        }[];
    };
};