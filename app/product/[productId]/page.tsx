
import React from "react";
import getProduct from "../../actions/getProduct";
import ClientProductPage from "./clientProductPage";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  productId?: string;
}

const ServerProductPage = async ({ params }: { params: IParams }) => {
  if (!params.productId) return null;

  const currentUser = await getCurrentUser();

  const product = await getProduct(params.productId);
  if (!product) return null;


  return <ClientProductPage product={product}/>;
};

export default ServerProductPage;
