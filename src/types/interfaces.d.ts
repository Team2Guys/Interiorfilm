import { StaticImageData } from "next/image";
import React, {FormEventHandler, SetStateAction } from "react";

React.FormEvent<HTMLFormElement>
export interface USRPROPS {
    handleSubmit: FormEventHandler<HTMLFormElement>,
    error:string | null | undefined
    loading: boolean | null | undefined
    inputFields:any
    buttonTitle:string
    title?: string,
    descrition? : string  
    InstructionText? :string,
    routingText? : string
    navigationLink?:string
    navigationTxt?:string
    SelectComonent?:any
    setadminType?:React.Dispatch<SetStateAction<string | undefined>>
    adminType?:string | undefined
  
  }


  export interface PRODUCTCARDPROPS {
    ImgUrl: string,
    title: string,
    strikThroughPrice: string,
    price: string
  }
  
  
  
  export interface Product {
    name: string;
    description: string;
    price: string;
    category: string;
    colors: { colorName: string }[];
    totalStockQuantity: number;
    variantStockQuantities: { variant: string; quantity: number }[]; 
    modelDetails: { name: string; detail: string }[]; 
    spacification: { specsDetails: string }[];
    discountPrice: string;
    category: string
    custom_url?: string
    breadcum?: string
  }
  
  export interface Category {
    name: string;
    description: string
    Meta_Description?: string
    Canonical_Tag?: string
    Meta_Title?: string
    custom_url?: string
    breadcum?: string
  }

/* eslint-disable */
interface CategoriesType {
  posterImageUrl: IMAGE_INTERFACE;
}

export interface CategoriesType extends Category {}
/* eslint-enable */
  
  interface CloudinaryImage {
    public_id: string | undefined;
    imageUrl: string | undefined; 
    _id: string | undefined;
  }

  export interface IMAGE_INTERFACE {
    public_id?: string;
    imageUrl?: any;
    name?: string;
    altText?:string;
    imageIndex?:number;
  }

  interface Images {
    posterImageUrl: string | undefined,
    hoverImageUrl:string | undefined, 
    imageUrl:CloudinaryImage []
  
  }
  
  export interface ProductWithImages extends Product, Images {}

  export interface FormValues {
    name: string;
    description: string;
    salePrice: string;
    purchasePrice?: string;
    discountPrice: string;
    starRating: string;
    reviews: string;
    colors: { colorName: string }[];
    modelDetails: { name: string; detail: string }[];
    spacification: { specsDetails: string }[];
    category: string
    code:string
    totalStockQuantity: number;
    variantStockQuantities: { variant: string; quantity: number }[]
    Meta_Title: string
   Meta_Description: string
   URL: string
   Canonical_Tag: string
   Images_Alt_Text: string
   breadcum?: string
   custom_url?: string
  // Og_title : string
  // Og_description: string
  // Og_Image: string
  // OgUrl:string
  
  }




interface Color {
  colorName?: string;
}
/* eslint-disable */
interface ModelDetail {
  name?: string;
  detail?: string;
}
/* eslint-enable */
interface Specification {
  specsDetails?: string;
}
interface sizes {
  sizesDetails?: string;
}


interface PRODUCTS_TYPES {
  _id?: any;
  name: string;
  code: string;
  posterImageUrl?: Image;
  hoverImageUrl?: Image;
  description?: string;
  salePrice?: number;
  purchasePrice?: number;
  category?: string; 
  imageUrl?: IMAGE_INTERFACE[];
  discountPrice?: any;
  colors?: Color[];
  modelDetails: Array<{ name: string, detail: string,}>;
  spacification?: Specification[];
  createdAt: Date;
  updatedAt: Date;
  starRating?: string;
  reviews?: string;
  totalStockQuantity?: any;
  sizes?: sizes[];
  isFeatured?: any;
  price?: any;
  count?: any;
  length?: any;
  totalPrice?:any;
  customOrder?: number;
  createdAt?:any;
  updatedAt?: any;
  code?:string;
  categoryName?: string;
  custom_url?:string
}

export default PRODUCTS_TYPES;



  

export interface ADDPRODUCTFORMPROPS {
  setselecteMenu: any
  EditInitialValues?: any | undefined,
  EditProductValue?: Product | undefined
  setEditProduct?: any

}



export interface Categories_Types {
  posterImageUrl: {
    public_id: string,
    imageUrl: string
  };
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: any;
}


export interface product {
  posterImageUrl: { public_id: string, imageUrl: string, altText:string};
  hoverImageUrl: { public_id: string, imageUrl: string, altText:string };
  _id: string;
  name: string;
  description: string;
  salePrice: number;
  purchasePrice: number;
  category: string;
  imageUrl: Array<{ public_id: string, imageUrl: string, _id: string, altText:string }>;
  discountPrice: number;
  colors: Array<{ colorName: string, _id: string }>;
  modelDetails: Array<{ name: string, detail: string, _id: string }>;
  spacification: Array<{ specsDetails: string, _id: string }>;
  totalStockQuantity: number;
  createdAt: string;
  starRating: string;
  reviews: string;
  sizes: any;
  updatedAt: string;
  price: string;
  __v: number;
  code: string

  Meta_Title: string
Meta_Description: string
URL: string
Canonical_Tag: string
Images_Alt_Text: string
Og_title : string
Og_description: string
Og_Image: string
OgUrl:string
breadcum?: string
custom_url?: string
}

export interface ITabbyList {
  id: number;
  para: string;
}
export interface ITabbyPayList {
  id: number;
  imageUrl: StaticImageData;
}

export interface ITamaraList {
  id: number;
  title?: string;
  para: string;
}

export interface RECORDS {
  totalAdmins: string;
  totalCategories: string;
  totalProducts: string;
  totalUsers: string;
  totalProfit: string;
  totalSales: string;
  totalRevenue: string;
}
export interface RedirectUrls {
  updatedAt?: string
  createdAt?: string;
  url: string,
  redirectUrl: string,
  _id?: string,
}


export interface initialRedirectUrls extends Omit<RedirectUrls, "id"> {
  redirectUrl?: string
  url?: string,
}