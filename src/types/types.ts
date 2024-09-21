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