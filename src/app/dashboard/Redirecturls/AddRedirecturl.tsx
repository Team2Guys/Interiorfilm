"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { IoMdArrowRoundBack } from "react-icons/io";
import showToast from "components/Toaster/Toaster";
import { RedirectUrls } from "types/interfaces";
import revalidateTagHanlder from "components/serverAction/ServerAction";

interface IVIEWREDIRECTURLS {
  setRedirectUrls: React.Dispatch<React.SetStateAction<RedirectUrls | undefined>>;
  setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
  RedirectUrls?: RedirectUrls;
}

interface RedirectUrlPayload {
  url: string;
  redirectUrl: string;
}

function AddRedirecturl({ setRedirectUrls, setselecteMenu, RedirectUrls }: IVIEWREDIRECTURLS) {
  const [loading, setLoading] = useState(false);

  const initialValues: RedirectUrlPayload = {
    url: RedirectUrls?.url || "",
    redirectUrl: RedirectUrls?.redirectUrl || "",
  };

  const validationSchema = Yup.object({
    url: Yup.string().required("Url is required"),
    redirectUrl: Yup.string().required("Redirect URL is required"),
  });

  const token = Cookies.get("2guysAdminToken") || Cookies.get("superAdminToken");

const handleSubmit = async (
  values: RedirectUrlPayload,
  { resetForm }: any
) => {
  setLoading(true);

  const isUpdate = RedirectUrls?._id;
  const endpoint = isUpdate
    ? `/api/general/updateredirecturl/${isUpdate}`
    : `/api/general/addredirecturl`;

  const method = isUpdate ? "PATCH" : "POST";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) throw new Error(`Failed to ${isUpdate ? "update" : "create"}`);
    await revalidateTagHanlder("Redirecturl");
    showToast("success", `Redirect URL ${isUpdate ? "updated" : "created"} successfully!`);
    resetForm();
    setRedirectUrls(undefined);
    setselecteMenu("All Redirects");
  } catch (error: any) {
    showToast("error", error.message || "Internal server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-primary bg-black rounded-sm w-fit p-2 cursor-pointer text-white"
        onClick={() => setselecteMenu("All Redirects")}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <Form className="space-y-4 max-w-2xl mx-auto">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                URL Endpoint
              </label>
              <input
                type="text"
                name="url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url}
                placeholder="product/dark-slatevinyl-wrap"
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary ${
                  formik.touched.url && formik.errors.url ? "border-red-500" : ""
                }`}
              />
              {formik.touched.url && formik.errors.url && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.url}</div>
              )}
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Redirect Page
              </label>
              <input
                type="text"
                name="redirectUrl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.redirectUrl}
                placeholder="product/dark-slate-vinyl-wrap"
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary ${
                  formik.touched.redirectUrl && formik.errors.redirectUrl ? "border-red-500" : ""
                }`}
              />
              {formik.touched.redirectUrl && formik.errors.redirectUrl && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.redirectUrl}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? RedirectUrls?._id
                  ? "Updating..."
                  : "Submitting..."
                : RedirectUrls?._id
                ? "Update"
                : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddRedirecturl;
