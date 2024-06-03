import React from "react";
import FormElements from "components/Dashboard/FormElements";
import DefaultLayout from "components/Dashboard/Layouts/DefaultLayout";
import ProtectedRoute from "hooks/AuthHookAdmin";
const FormElementsPage = () => {
  return (
    <DefaultLayout>

      <FormElements />

    </DefaultLayout>

  );
};

export default ProtectedRoute(FormElementsPage)


