'use client'

import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useEffect, useState } from "react";
import { product} from "types/interfaces";
import AdsTable from "components/Dashboard/Tables/AdsTable";
import AddAds from "components/AddAds/AddAds";

const Products = () => {
  const [editProduct, setEditProduct] = useState<product | undefined>();
  const [products, setProducts] = useState<any[]>();

  const [productloading, setProductloading] = useState<boolean>(false);
  const [selecteMenu, setselecteMenu] = useState<string>("All Products");

  useEffect(() => {

    const productHandler = async () => {
      try {
        setProductloading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`
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
    totalStockQuantity: editProduct && editProduct.totalStockQuantity,
    Meta_Title:editProduct &&  editProduct?.Meta_Title,
    Meta_Description:editProduct &&  editProduct?.Meta_Description,
    Canonical_Tag:editProduct &&  editProduct?.Canonical_Tag ,
    breadcum: editProduct?.breadcum,
    custom_url: editProduct?.custom_url,

  };  


  let productFlag: boolean = selecteMenu === "All Products" ? true : false

  console.log()
  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? "Products" : "Adds on Products"} />
      {
        productFlag ?

          <AdsTable
            Categories={products}
            setProduct={setProducts}
            setselecteMenu={setselecteMenu}
            loading={productloading}
            setEditProduct={setEditProduct}
          />
          :

          <AddAds setselecteMenu={setselecteMenu} EditInitialValues={editProduct} setEditProduct={setEditProduct}
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

