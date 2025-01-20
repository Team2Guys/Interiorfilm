'use client'

import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useEffect, useState } from "react";
import { product} from "types/interfaces";
import AdsTable from "components/Dashboard/Tables/AdsTable";
import AddAds from "components/AddAds/AddAds";

interface IADDPROD {
    products : any[]
}

const AddProd = ({products}: IADDPROD) => {
  const [editProduct, setEditProduct] = useState<product | undefined>();
  const [prod, setProducts] = useState<any[]>(products);
  const [selecteMenu, setselecteMenu] = useState<string>("All Products");

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

  };  

  useEffect(() => {
    setProducts(products)
  

  }, [products])
  

  let productFlag: boolean = selecteMenu === "All Products" ? true : false

  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? "Products" : "Adds on Products"} />
      {
        productFlag ?

          <AdsTable
            Categories={prod}
            setProduct={setProducts}
            setselecteMenu={setselecteMenu}
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

export default ProtectedRoute(AddProd)

