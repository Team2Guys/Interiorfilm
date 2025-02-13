'use client'

import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ViewProduct from "components/Dashboard/Tables/ViewProduct";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useEffect, useState } from "react";
import { product} from "types/interfaces";
import FormElements from "components/Dashboard/FormElements";

const Products = () => {
  const [editProduct, setEditProduct] = useState<product | undefined>();
  const [products, setProducts] = useState<any[]>();

  const [productloading, setProductloading] = useState<boolean>(false);
  const [selecteMenu, setselecteMenu] = useState<string>("Add All Products");

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
    totalStockQuantity: editProduct && editProduct.totalStockQuantity,
    hoverImageUrl: editProduct && editProduct.hoverImageUrl,
    Meta_Title:editProduct && editProduct?.Meta_Title,
    Meta_Description:editProduct && editProduct?.Meta_Description,
    URL:editProduct && editProduct?.URL,
    Canonical_Tag:editProduct && editProduct?.Canonical_Tag,
    Images_Alt_Text:editProduct && editProduct?.Images_Alt_Text,
    Og_title:editProduct && editProduct?.Og_title,
    Og_Image:editProduct && editProduct?.Og_Image,
    OgUrl:editProduct && editProduct?.OgUrl,
  };  


  let productFlag: boolean = selecteMenu === "Add All Products" ? true : false

  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? "Products" : "Add Products"} />
      {
        productFlag ?

          <ViewProduct
            Categories={products}
            setProduct={setProducts}
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

