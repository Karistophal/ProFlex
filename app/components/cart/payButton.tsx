'use client'
import Button from "@/app/components/Button";

export default function PayButton() {

    const handlePay = () => {
        console.log("Payer");
    }

    return (
        <Button
            label="Payer"
            onClick={handlePay}
        />
    );
}