import axios from "axios";
import { Order } from "types/types";

export const getAllproducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`,
      {
        next: { tags: ['products'] }
      }
    );
    const productsData = await response.json();
    const products =productsData.products;
    return products;   
  } catch (error:any) {
    console.log(error, "error")
    throw new Error(error?.message || "Internal server error")
  }
 
};


export const getAlladsproducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`,
      {
        next: { tags: ['products'] }
      }
    );
    const productsData = await response.json();
    const products = productsData.products;
    return products;    
  } catch (error) {
    console.log(error, "error")
  }

};


export const getAllCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`,
    {
      next: { tags: ['categories'] },
    },
  );
 
  const categories = await response.json();
  return categories;
};



export const fetchOrderHistory = async (token: any) => {
  try {
    
    const res = await axios.get<{ products: Order[] }>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order-history`, {
      headers: {
        token: token.value || '',
      }
    });
    return (res.data.products);
  } catch (error) {
    console.error("Error fetching order history:", error);
  }
};
