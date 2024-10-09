export type BRAND = {
    logo: string;
    name: string;
    visitors:number,
    revenues:string,
    sales:number,
    conversion:number
  };


  export type PRODUCTBRANCH = {
    logo: string;
    name: string;
    price:number
  };

  export interface listItems {
    listItem: any;
  }


  export interface PrivacyPolicyItem {
    title?: string;
    text?: any;
    listItems?: any[];
  }

  export interface ACCORDINTYPES {
    Title: string;
    Description: string;
    Icon: any;
  }

 export  interface Product {
    _id: string;
    id: string;
    name: string;
    price: number;
    discountPrice: number | null;
    count: number;
    totalPrice: number;
    purchasePrice: number;
    date: string;
    imageUrl: string;
    shippment_Fee: string;
    order_id: string;
    checkout: boolean;
    paymentStatus: boolean;
    is_refund: boolean;
    success: boolean;
    pending: boolean;
    length: number;
    createdAt: string;
    amount_cents: string;
    currency: string;
    integration_id: string;
    is_3d_secure: boolean;
    transactionId: string;
  }
  
 export  interface Order {
    _id: string;
    usermail: string;
    first_name: string;
    last_name: string;
    userAddress: string;
    country: string;
    city: string;
    phone_number: string;
    products: Product[];
    date: string;
    __v: number;
  }
  