import Button from "../Button"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { stripe } from "@/app/libs/stripe"
import { redirect } from "next/navigation"

import { CartItem } from "@/app/types"
import getCartItems from "@/app/actions/getCartItems"


export const BuyButton = () => {
    const taxes = 0.1;
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
                    success_url: "https://proflex-mu.vercel.app/",
                    cancel_url: "https://proflex-mu.vercel.app/cart",
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