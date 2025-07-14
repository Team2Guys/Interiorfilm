'use client'
import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useState } from "react";
import {CategoriesType} from 'types/interfaces'
import dynamic from "next/dynamic";
const TableTwo = dynamic(() => import('components/Dashboard/Tables/TableTwo'));
const Addcategory = dynamic(() => import('components/AddCategory/Addcategory'));


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
