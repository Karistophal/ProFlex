'use client';

interface CartItemProps {
    img: string;
    name: string;
    style: string;
    price: number;
    quantity: number;
}


const CartItem: React.FC<CartItemProps> = ({
    img,
    name,
    style,
    price,
    quantity
}) => {
    return (
        <div className="
            flex
            items-center
            gap-4
            p-4
            border-b
            border-gray-200
        ">
            <img src={img} alt="" className="
                w-20
                h-20
                object-cover
                rounded-lg
            " />
            <div className="
                flex
                flex-col
                gap-1
            ">
                <div className="font-semibold">
                    {name}
                </div>
                <div className="text-neutral-500">
                    {style}
                </div>
                <div className="text-neutral-500">
                    {price}
                </div>
                <div className="text-neutral-500">
                    Quantity: {quantity}
                </div>
            </div>
        </div>

    );
}

export default CartItem;