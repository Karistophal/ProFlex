import Button from "../Button"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { stripe } from "@/app/libs/stripe"
import { redirect } from "next/navigation"

import { CartItem } from "@/app/types"
import getCartItems from "@/app/actions/getCartItems"

import toast from 'react-hot-toast';


export const BuyButton = () => {
    return (
        <form>
            <Button label="Payer" formAction={async () => {
                "use server"

                let cartItems: CartItem[] = [];

                const currentUser = await getCurrentUser();
                if (currentUser) {
                    const listCart = await getCartItems(currentUser.id);
                    cartItems = listCart ? listCart : [];
                }
                
                if (cartItems.length === 0) {
                    return;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        id: currentUser?.id ?? "",
                    },
                    select: {
                        stripeCustomerId: true,
                    }
                });

                const lineItems = await cartItems.map((item) => ({
                    price: item.product.stripePriceId,
                    quantity: item.quantity,
                }));

                const stripeCustomerId = user?.stripeCustomerId ?? undefined;

                const session = await stripe.checkout.sessions.create({
                    customer: stripeCustomerId,
                    line_items: lineItems,
                    mode: "payment",
                    payment_method_types: ["card", "link"],
                    success_url: "http://localhost:3000/success",
                    cancel_url: "http://localhost:3000/cancel",
                });

                if (!session.url) {
                    throw new Error("Session URL id missing");
                }

                redirect(session.url);
            }} />
        </form>
    )
}

export default BuyButton