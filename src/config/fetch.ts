import axios from "axios";
import { Order } from "types/types";

export const getAllproducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`,
    {
      next: { tags: ['products'] },
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const productsData = await response.json();
  const products = productsData.products;
  return products;
};


export const getAlladsproducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/addsOn_product/getAllproducts`,
    {
      next: { tags: ['products'] },
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const productsData = await response.json();
  const products = productsData.products;
  return products;
};



export const getAllCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`,
    {
      next: { tags: ['categories'] },
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

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
