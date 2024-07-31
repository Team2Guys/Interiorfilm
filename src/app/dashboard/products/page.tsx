'use client'


import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ViewProduct from "components/Dashboard/Tables/ViewProduct";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useEffect, useState } from "react";
import { ProductWithImages } from "types/interfaces";
import { useAppSelector } from "components/Others/HelperRedux";
// import FormElementsPage from 'app/dashboard/products/AddNewProduct/page'
import FormElements from "components/Dashboard/FormElements";


interface product {
  posterImageUrl: { public_id: string, imageUrl: string };
  hoverImageUrl: { public_id: string, imageUrl: string };
  _id: string;
  name: string;
  description: string;
  salePrice: number;
  purchasePrice: number;
  category: string;
  imageUrl: Array<{ public_id: string, imageUrl: string, _id: string }>;
  discountPrice: number;
  colors: Array<{ colorName: string, _id: string }>;
  modelDetails: Array<{ name: string, detail: string, _id: string }>;
  spacification: Array<{ specsDetails: string, _id: string }>;
  createdAt: string;
  starRating: string;
  reviews: string;
  sizes: Array<string>;
  updatedAt: string;
  price: string;
  __v: number;
}


const Products = () => {
  const [editProduct, setEditProduct] = useState<product | undefined>();
  const [products, setProducts] = useState<any[]>();
  
  const [productloading, setProductloading] = useState<boolean>(false);
  const [selecteMenu, setselecteMenu] = useState<string>("Add All Products");
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  
  useEffect(() => {

    const productHandler = async () => {
      try {
        setProductloading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
        );
        const Allproducts = await response.json();
        setProducts(Allproducts.products);
        setProductloading(false);
      } catch (err) {
        console.log("error Occured");
        setProductloading(false);
      }
    };
    productHandler();
  }, [selecteMenu]);


  const EditInitialValues: any = {
    name: editProduct?.name,
    description: editProduct?.description,
    price: editProduct?.price,
    colors: editProduct?.colors,
    modelDetails: editProduct?.modelDetails,
    spacification: editProduct?.spacification,
    discountPrice: editProduct?.discountPrice,
    category: editProduct && editProduct?.category,
    sizes: editProduct && editProduct?.sizes,
    starRating: editProduct && editProduct.starRating,
    reviews: editProduct && editProduct.starRating,
    code: editProduct && editProduct.code,
    salePrice: editProduct && editProduct.salePrice,
    purchasePrice: editProduct && editProduct.purchasePrice,
  };




  interface product {
    posterImageUrl: { public_id: string, imageUrl: string };
    hoverImageUrl: { public_id: string, imageUrl: string };
    _id: string;
    name: string;
    description: string;
    salePrice: number;
    purchasePrice: number;
    category: string;
    imageUrl: Array<{ public_id: string, imageUrl: string, _id: string }>;
    discountPrice: number;
    colors: Array<{ colorName: string, _id: string }>;
    modelDetails: Array<{ name: string, detail: string, _id: string }>;
    spacification: Array<{ specsDetails: string, _id: string }>;
    createdAt: string;
    starRating: string;
    reviews: string;
    sizes: Array<string>;
    updatedAt: string;
    price: string;
    __v: number;
    code: string
  }
  let productFlag: boolean = selecteMenu === "Add All Products" ? true : false

  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? "Products" : "Add Products"} />
      {
        productFlag ?

          <ViewProduct
            Categories={products}
            setCategory={setProducts}
            setselecteMenu={setselecteMenu}
            loading={productloading}

            setEditProduct={setEditProduct}
          />
          :

          <FormElements setselecteMenu={setselecteMenu} EditInitialValues={editProduct} setEditProduct={setEditProduct}
            EditProductValue={(EditInitialValues &&
              (EditInitialValues.name !== undefined ||
                EditInitialValues.category !== undefined))
              ? EditInitialValues
              : undefined
            } />
      }




    </DefaultLayout>
  );
};

export default ProtectedRoute(Products)

