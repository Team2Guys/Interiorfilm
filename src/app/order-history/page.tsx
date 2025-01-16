import { cookies } from "next/headers";
import OrderHistory from "./OrderHistory";
import { fetchOrderHistory } from "config/fetch";
import { redirect } from "next/navigation";

const OrderHistoryPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')
  if(!token){
   return redirect('/login');
  }
  const orderData = await fetchOrderHistory(token);
  return (
    <OrderHistory orderHistory={orderData} />
  );
};

export default OrderHistoryPage;