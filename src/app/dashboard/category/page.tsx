'use client'

import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import TableTwo from "components/Dashboard/Tables/TableTwo";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useState } from "react";
import Addcategory from "components/AddCategory/Addcategory";

const category = () => {

  const [menuType, setMenuType] = useState<string>("Categories")

  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {
        menuType === "Categories" ?
      <div className="flex flex-col gap-10">

        <TableTwo  setMenuType={setMenuType}/>

      </div>
      
      : <Addcategory setMenuType={setMenuType}/>
      }

    </DefaultLayout>
  );
};

export default  ProtectedRoute(category);
