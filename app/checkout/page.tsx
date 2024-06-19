import BuyButton from "../components/checkout/buyButton";
import getCartItems from "../actions/getCartItems";
import getCurrentUser from "../actions/getCurrentUser";
import { CartItem } from "../types";

import importData from "../importBDD";

import Hr from "../components/Hr";

const CheckoutPage = async () => {
  importData()

  const currentUser = await getCurrentUser()
  let cartItems: CartItem[] = [];
  let sousTotalPrice = 0
  let taxesPrice = 0
  let totalPrice = 0

  if (currentUser) {
    const cartItemsRequest = await getCartItems(currentUser.id);
    cartItems = cartItemsRequest ? cartItemsRequest : []

    calculPrices()
  }


  function calculPrices() {
    // Calcul sous-total
    sousTotalPrice = cartItems.reduce((acc, item) => {
      const { product, quantity } = item;
      const { price } = product;
      return acc + price * quantity;
    }, 0);
    // calcul Taxes
    taxesPrice = sousTotalPrice * 0.1

    totalPrice = sousTotalPrice + taxesPrice
  }


  return (  
    <div className="flex flex-col min-h-screen gap-4 px-32 pt-10">
      <div className="text-4xl w-full font-bold mb-16">Paiement</div>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col mr-16">
          <div className="text-2xl font-bold mb-4">Option de Paiement</div>
          <Hr />
          <div className="">

          </div>
        </div>
        <div className="flex flex-col h-fit min-w-[350px] p-6 border-gray-300 border-[1px] rounded-xl">
          <div className="text-2xl font-extrabold">Récapitulatif </div>
          <div className="pb-3 pt-6 ">
            <div className="flex justify-between mb-2">
              <div className="text-lg text-gray-500">Sous-total</div>
              <div className="text-lg font-bold">{sousTotalPrice}€</div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="text-lg text-gray-500">Taxes</div>
              <div className="text-lg font-bold">{taxesPrice.toFixed(2)}€</div>
            </div>
          </div>
          <Hr />
          <div className="flex justify-between py-4">
            <div className="font-bold text-xl">Total :</div>
            <div className="font-bold text-xl">{totalPrice.toFixed(2)}€</div>
          </div>
          <BuyButton />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;