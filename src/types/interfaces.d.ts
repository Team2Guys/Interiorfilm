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
    modelDetails: { name: string; detail: string }[]; 
    spacification: { specsDetails: string }[];
    discountPrice: string;
    category: string
  }
  
  export interface Category {
    name: string;
  
  }
  
  
  interface CloudinaryImage {
    public_id: string | undefined;
    imageUrl: string | undefined; 
    _id: string | undefined;
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
    purchasePrice: string;
    discountPrice: string;
    starRating: string;
    reviews: string;
    colors: { colorName: string }[];
    modelDetails: { name: string; detail: string }[];
    spacification: { specsDetails: string }[];
    sizes: string[];
    category: string
    code:string
  
  }


export interface IMAGE_INTERFACE {
  public_id: string;
  imageUrl: string;
}

interface Color {
  colorName?: string;
}
interface ModelDetail {
  name?: string;
  detail?: string;
}

interface Specification {
  specsDetails?: string;
}

interface PRODUCTS_TYPES {
  id: any;
  name: string;
  posterImageUrl: Image;
  hoverImageUrl?: Image;
  description: string;
  salePrice: number;
  purchasePrice: number;
  category: string; 
  imageUrl: IMAGE_INTERFACE[];
  discountPrice?: any;
  colors?: Color[];
  modelDetails?: ModelDetail[];
  spacification?: Specification[];
  createdAt: Date;
  updatedAt: Date;
  starRating?: string;
  reviews?: string;
  sizes?: string[];
}

export default PRODUCTS_TYPES;

  