import Button from "../Button"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { stripe } from "@/app/libs/stripe"
import { redirect } from "next/navigation"

export const BuyButton = () => {
  return (
    <form>
        <button formAction={async () => {
            "use server"

            const currentUser = await getCurrentUser();
            const user = await prisma.user.findUnique({
                where: {
                    id: currentUser?.id ?? "",
                },
                select: {
                    stripeCustomerId: true,
                }
            });

            const stripeCustomerId = user?.stripeCustomerId ?? undefined;

            const session = await stripe.checkout.sessions.create({
                customer : stripeCustomerId,
                mode: "payment",
                payment_method_types: ["card", "link"],
                line_items: [
                    {
                        price: 
                            process.env.NODE_ENV === "development"
                            ? "price_1PS8tvLKWQ0b39ieVW6Xmru7"
                            : "",
                        quantity: 1,
                    },
                ],
                success_url: "http://localhost:3000/success",
                cancel_url: "http://localhost:3000/cancel",
            });

            if (!session.url) {
                throw new Error("Session URL id missing");
            }
            
            redirect(session.url);
        }}>
            Acheter
        </button>
    </form>
  )
}

export default BuyButton