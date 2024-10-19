'use client';

import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ViewNewsletter from "components/Dashboard/Tables/ViewNewsletter";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const Newsletter = () => {
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const token = Cookies.get('2guysAdminToken');

  useEffect(() => {
    const productHandler = async () => {
      try {
        setProductLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/promotion/get-all`,
          {
            headers: {
              token: token ?? '',
            },
          }
        );
        const allNewsletter = await response.json();
        setNewsletter(allNewsletter.user); // Set the fetched newsletter data
        setProductLoading(false);
      } catch (err) {
        console.log("Error occurred:", err);
        setProductLoading(false);
      }
    };
    productHandler();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={'Newsletter'} />
      <ViewNewsletter
        setProduct={setNewsletter}
        products={newsletter}  // Pass fetched data as "products"
        loading={productLoading}
      />
    </DefaultLayout>
  );
};

export default ProtectedRoute(Newsletter);
