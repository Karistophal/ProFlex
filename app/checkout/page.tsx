import BuyButton from "../components/checkout/buyButton";

const CheckoutPage = () => {
  return (
    <div>
      <div className="text-4xl font-bold text-center my-10">Checkout</div>
      <div className="flex justify-center">
        <BuyButton />
      </div>

    </div>
  );
}

export default CheckoutPage;