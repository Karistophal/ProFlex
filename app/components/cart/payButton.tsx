'use client'
import Button from "@/app/components/Button";

import { useRouter } from "next/navigation";

export default function PayButton() {
    const router = useRouter();

    const handlePay = () => {
        router.push("/checkout");
    }

    return (
        <Button
            label="Payer"
            onClick={handlePay}
        />
    );
}