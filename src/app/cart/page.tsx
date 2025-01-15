import { getAllproducts } from "config/fetch";
import Cart from "./Cart";

const CartPage = async () => {

const productsData = await getAllproducts();
  return (
    <Cart products={productsData} />
  );
};

export default CartPage;
