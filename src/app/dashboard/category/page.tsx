'use client'

import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import TableTwo from "components/Dashboard/Tables/TableTwo";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useState } from "react";
import Addcategory from "components/AddCategory/Addcategory";
import {CategoriesType} from 'types/interfaces'

const AddCategory = () => {

  const [menuType, setMenuType] = useState<string>("Categories")
  const [editCategory, seteditCategory] = useState<CategoriesType | undefined | null>()

  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {
        menuType === "Categories" ?
      <div className="flex flex-col gap-10">

        <TableTwo  setMenuType={setMenuType} seteditCategory={seteditCategory} editCategory={editCategory}/>

      </div>
      
      : <Addcategory setMenuType={setMenuType} seteditCategory={seteditCategory} editCategory={editCategory} />
      }

    </DefaultLayout>
  );
};

export default  ProtectedRoute(AddCategory);
