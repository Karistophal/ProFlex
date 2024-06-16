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
    productTypeId: string | null;
    productType: {
        name: string;
    } | null;
    product: {
        id: string;
        name: string;
        price: number;
        productType: {
            name: string;
        }[];   
        images: {
            url: string;
        }[];
    };
};