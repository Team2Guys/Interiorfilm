"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Formik,
  FieldArray,
  FormikErrors,
  Form,
  ErrorMessage,
  Field,
  FormikTouched,
} from "formik";

import SelectGroupTwo from "components/Dashboard/SelectGroup/SelectGroupTwo";
import Imageupload from "components/ImageUpload/Imageupload";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { ImageRemoveHandler } from "utils/helperFunctions";
import { FormValues, ADDPRODUCTFORMPROPS } from "types/interfaces";
import Toaster from "components/Toaster/Toaster";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "components/Loader/Loader";
import Cookies from "js-cookie";
import {
  withoutVariation,
  AddProductvalidationSchema,
  AddproductsinitialValues,
} from "data/Data";
import revalidateTagHanlder from "components/serverAction/ServerAction";

const FormElements: React.FC<ADDPRODUCTFORMPROPS> = ({ EditInitialValues, EditProductValue, setselecteMenu, setEditProduct,
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [imagesUrl, setImagesUrl] = useState<any[]>([]);
  const [posterimageUrl, setposterimageUrl] = useState<any[] | null>((EditInitialValues && EditInitialValues.posterImageUrl) && [EditInitialValues.posterImageUrl]);
  const [hoverImage, sethoverImage] = useState<any[] | null | undefined>((EditInitialValues && EditInitialValues.hoverImageUrl) && [EditInitialValues.hoverImageUrl]);
  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<any | null | undefined>(EditProductValue);
  const [imgError, setError] = useState<string | null | undefined>();
  const [Categories, setCategories] = useState<any[]>();
  const token = Cookies.get("2guysAdminToken");
  const superAdminToken = Cookies.get("superAdminToken");
  let finalToken = token ? token : superAdminToken;


  const headers = {
    token: finalToken,
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  console.log(changeTextColor, "changeTextColor")
  useLayoutEffect(() => {
    const CategoryHandler = async () => {
      try {
        if (!EditInitialValues) return;
        const {
          posterImageUrl,
          imageUrl,
          _id,
          createdAt,
          updatedAt,
          __v,
          hoverImage,
          ...EditInitialProductValues
        } = EditInitialValues as any;
        console.log(posterImageUrl,
          imageUrl,
          _id,
          createdAt,
          updatedAt,
          __v,
          hoverImage, EditInitialProductValues)
        imageUrl ? setImagesUrl(imageUrl) : null;
        posterImageUrl ? setposterimageUrl([posterImageUrl]) : null;
        console.log(hoverImage, "EditInitialValues.hoverImageUrl")
        hoverImage ? sethoverImage([hoverImage]) : null
      } catch (err) {
        console.log(err, "err");
      }
    };

    CategoryHandler();
  }, []);

  const onSubmit = async (values: any, { resetForm }: any) => {

    try {
      setError(null);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      let hoverImageUrl = hoverImage && hoverImage[0];
      let createdAt = Date.now();
      if (!posterImageUrl || !(imagesUrl.length > 0)) {
        throw new Error("Please select relevant Images");
      }
      let newValue = {
        ...values,
        posterImageUrl,
        imageUrl: imagesUrl,
        hoverImageUrl,
        createdAt,
        purchasePrice: 0
      };
      setloading(true);

      let updateFlag = EditProductValue && EditInitialValues ? true : false;

      let addProductUrl = updateFlag
        ? `/api/updateProduct/${EditInitialValues._id} `
        : null;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : "/api/addProduct"
        }`;
      console.log(newValue, "newValuenewValue");
    await axios.post(url, newValue, { headers: headers });
        revalidateTagHanlder("products")

      Toaster("success", updateFlag ? "Product has been sucessufully Updated !" : "Product has been sucessufully Created !");
      setProductInitialValue(AddproductsinitialValues);
      resetForm();
      setloading(false);
      sethoverImage(null);
      setposterimageUrl(null);
      setImagesUrl([]);
      updateFlag ? setEditProduct && setEditProduct(undefined) : null;
      setselecteMenu("Add All Products");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
        console.log(err.response.data.error, "err.response.data.message");
      } else {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
        );
        const Categories = await response.json();
        setCategories(Categories);
      } catch (err) {
        console.log(err, "err");
      }
    };

    CategoryHandler();
  }, []);


  const handleImageIndex = (index: number, newImageIndex: number) => {
    const updatedImagesUrl = imagesUrl.map((item, i) =>
      i === index ? { ...item, imageIndex: newImageIndex } : item
    );
    setImagesUrl(updatedImagesUrl);
  };
  const handlealtText = (index: number, newaltText: string) => {
    const updatedImagesUrl = imagesUrl.map((item, i) =>
      i === index ? { ...item, altText: newaltText } : item
    );
    setImagesUrl(updatedImagesUrl);
  };
  const handlealtTextHover = (index: number, newaltText: string) => {
    //@ts-expect-error
    const updatedImagesUrl = hoverImage.map((item, i) =>
      i === index ? { ...item, altText: newaltText } : item
    );
    sethoverImage(updatedImagesUrl);
  };
  const handlealtTextposterimageUrl = (index: number, newaltText: string) => {
    //@ts-expect-error
    const updatedImagesUrl = posterimageUrl.map((item, i) =>
      i === index ? { ...item, altText: newaltText } : item
    );
    setposterimageUrl(updatedImagesUrl);
  };
  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer text-black dark:text-white"
        onClick={() => {
          setselecteMenu("Add All Products");
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>
      <Formik
        enableReinitialize
        initialValues={productInitialValue ? productInitialValue : AddproductsinitialValues
        }
        validationSchema={AddProductvalidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9 dark:border-strokedark dark:bg-boxdark">
                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark ">
                    <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Poster Image
                        </h3>
                      </div>
                      {(posterimageUrl && posterimageUrl?.length > 0) ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">

                          <div>
                            {posterimageUrl.map((item: any, index) => {
                              return (
                                <>
                                  <div
                                    className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                    key={index}
                                  >

                                    <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full">
                                      <RxCross2
                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                        size={17}
                                        onClick={() => {
                                          ImageRemoveHandler(
                                            item.public_id,
                                            setposterimageUrl
                                          );
                                        }}
                                      />
                                    </div>
                                    <Image
                                      key={index}
                                      className="object-cover w-full h-full"
                                      width={300}
                                      height={400}
                                      src={item?.imageUrl}
                                      alt={`productImage-${index}`}
                                    />
                                  </div>

                                  <input className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none" placeholder="altText" type="text" name="altText" value={item.altText} onChange={(e) =>
                                    handlealtTextposterimageUrl(index, String(e.target.value))
                                  } />

                                </>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>

                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white ">
                          Product Name

                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          placeholder="name"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red text-sm">
                            {formik.errors.name as String}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Description{" "}

                        </label>
                        <textarea
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          placeholder="description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.description &&
                            formik.errors.description
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.description &&
                          formik.errors.description ? (
                          <div className="text-red text-sm">
                            {
                              formik.errors.description as FormikErrors<
                                FormValues["description"]
                              >
                            }
                          </div>
                        ) : null}
                      </div>

                      <div className="flex full gap-4">
                        <div className="w-[50%]">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Sale Price
                          </label>
                          <input
                            type="number"
                            name="salePrice"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.salePrice}
                            placeholder="Sale Price"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.salePrice &&
                              formik.errors.salePrice
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                          {formik.touched.salePrice &&
                            formik.errors.salePrice ? (
                            <div className="text-red text-sm">
                              {
                                formik.errors.salePrice as FormikErrors<
                                  FormValues["salePrice"]
                                >
                              }
                            </div>
                          ) : null}
                        </div>

                        {/* <div className="w-[33%]">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Purchase Price
                          </label>
                          <input
                            type="number"
                            name="purchasePrice"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.purchasePrice}
                            placeholder="Purchase Price"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.purchasePrice &&
                              formik.errors.purchasePrice
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                          {formik.touched.purchasePrice &&
                            formik.errors.purchasePrice ? (
                            <div className="text-red text-sm">
                              {
                                formik.errors.purchasePrice as FormikErrors<
                                  FormValues["purchasePrice"]
                                >
                              }
                            </div>
                          ) : null}
                        </div> */}



                        <div className="w-[50%]">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Discount Price
                          </label>
                          <input
                            type="number"
                            name="discountPrice"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.discountPrice}
                            placeholder="Discount Price"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.discountPrice &&
                              formik.errors.discountPrice
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                          {formik.touched.discountPrice &&
                            formik.errors.discountPrice ? (
                            <div className="text-red text-sm">
                              {formik.errors.discountPrice as String}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Product Code
                          </label>
                          <input
                            type="text"
                            name="code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                            value={formik.values.code}
                            placeholder="Product code"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                          {formik.touched.name && formik.errors.code ? (
                            <div className="text-red text-sm">
                              {formik.errors.code as String}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-2/4">
                          <SelectGroupTwo
                            name="category"
                            changeHandler={formik.handleChange}
                            value={formik.values.category}
                            Categories={Categories}
                            isOptionSelected={isOptionSelected}
                          />

                          <ErrorMessage
                            name="category"
                            component="div"
                            className="text-red"
                          />
                        </div>
                      </div>



                      <div className="flex gap-4">
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Meta Title
                          </label>
                          <input
                            type="text"
                            name="Meta_Title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Meta_Title}
                            placeholder="Meta Title"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                          {formik.touched.Meta_Title && formik.errors.Meta_Title ? (
                            <div className="text-red text-sm">
                              {formik.errors.code as String}
                            </div>
                          ) : null}



                        </div>
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Canonical Tag

                          </label>
                          <input
                            onBlur={formik.handleBlur}

                            type="text"
                            name="Canonical_Tag"
                            onChange={formik.handleChange}
                            value={formik.values.Canonical_Tag}
                            placeholder="Canonical Tag"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
                              }`}


                          />

                          {formik.touched.Canonical_Tag && formik.errors.Canonical_Tag ? (
                            <div className="text-red text-sm">
                              {formik.errors.code as String}
                            </div>
                          ) : null}
                        </div>


                      </div>
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Meta Description

                        </label>
                        <textarea
                          name="Meta_Description"
                          onChange={formik.handleChange}
                          value={formik.values.Meta_Description}
                          placeholder="Meta Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.description &&
                            formik.errors.description
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.Meta_Description && formik.errors.Meta_Description ? (
                          <div className="text-red text-sm">
                            {formik.errors.code as String}
                          </div>
                        ) : null}
                      </div>


                      <div className="flex gap-4">
                        <div className="w-full">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Images Alt Text

                          </label>
                          <input
                            type="text"
                            name="Images_Alt_Text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                            value={formik.values.Images_Alt_Text}
                            placeholder="Images Alt Text"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                          {formik.touched.Images_Alt_Text && formik.errors.Images_Alt_Text ? (
                            <div className="text-red text-sm">
                              {formik.errors.code as String}
                            </div>
                          ) : null}



                        </div>




                      </div>


                    </div>
                  </div>
                </div>




                <div className="flex flex-col gap-5">
                  <div className="py-4 px-6.5 rounded-sm border border-stroke">
                    <div className="mb-4  bg-white dark:border-strokedark dark:bg-boxdark  text-black dark:text-white">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Stock Quantity
                      </label>

                    </div>


                    {withoutVariation.map((inputField, index) => (
                      <div key={index} className="mb-4">

                        <Field
                          type={inputField.type}
                          name={inputField.name}

                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary "
                        />
                        <ErrorMessage
                          name={inputField.name}
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    ))}

                  </div>


                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Model Details
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FieldArray name="modelDetails">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.modelDetails.map(
                              (model: any, index: any) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="text"
                                    name={`modelDetails[${index}].name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.modelDetails[index].name
                                    }
                                    placeholder="Model Name"
                                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary 
                                      ${formik.touched.modelDetails && (formik.touched.modelDetails as FormikTouched<FormValues["modelDetails"]>)?.[index]?.name &&
                                        (
                                          formik.errors
                                            .modelDetails as FormikErrors<
                                              FormValues["modelDetails"]
                                            >
                                        )?.[index]?.name
                                        ? "border-red-500"
                                        : ""
                                      }`}
                                  />
                                  <input
                                    type="text"
                                    name={`modelDetails[${index}].detail`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.modelDetails[index].detail
                                    }
                                    placeholder="Model Detail"
                                    className={`w-full rounded-lg ml-2 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary 
            ${formik.touched.modelDetails && (formik.touched.modelDetails as FormikTouched<FormValues["modelDetails"]>)?.[index]?.detail &&
                                        (
                                          formik.errors
                                            .modelDetails as FormikErrors<
                                              FormValues["modelDetails"]
                                            >
                                        )?.[index]?.detail
                                        ? "border-red-500"
                                        : ""
                                      }`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-red "
                                  >
                                    <RxCross2 className="text-red" size={25} />
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              type="button"
                              onClick={() => push({ name: "", detail: "" })}
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-fit"
                            >
                              Add Model
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Colors
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                      <FieldArray name="colors">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.colors.map(
                              (spec: any, index: any) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="text"
                                    name={`colors[${index}].colorName`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.colors[index]
                                        .colorName
                                    }
                                    placeholder="Add color Code"
                                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary 
                                     ${formik.touched.colors &&
                                        (formik.touched.colors && formik.touched.colors as FormikTouched<FormValues["colors"]>)[index]?.colorName &&
                                        (formik.errors.color && (formik.errors.colors as FormikErrors<FormValues["colors"]>)[index]?.colorName)
                                        ? "border-red-500"
                                        : ""
                                      }
                                      
                                      `}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-red"
                                  >
                                    <RxCross2 className="text-red" size={25} />
                                  </button>
                                </div>
                              )
                            )}
                            <button

                              type="button"
                              onClick={() => push({ colorName: "" })}
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-fit"
                            >
                              Add Colors
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>



                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Specification
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                      <FieldArray name="spacification">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.spacification.map(
                              (spec: any, index: any) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="text"
                                    name={`spacification[${index}].specsDetails`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.spacification[index]
                                        .specsDetails
                                    }
                                    placeholder="Specification Details"
                                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary 
               ${formik.touched.spacification && (formik.touched.spacification as FormikTouched<FormValues["spacification"]>)?.[index]?.specsDetails &&
                                        (
                                          formik.errors
                                            .spacification as FormikErrors<
                                              FormValues["spacification"]
                                            >
                                        )?.[index]?.specsDetails
                                        ? "border-red-500"
                                        : ""
                                      }`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-red"
                                  >
                                    <RxCross2 className="text-red" size={25} />
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              type="button"
                              onClick={() => push({ specsDetails: "" })}
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-fit"
                            >
                              Add Specification
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>


                  {/* <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                      colors
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                      <FieldArray name="sizes">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.sizes.map(
                              (spec: any, index: any) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="number"
                                    name={`sizes[${index}].sizesDetails`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.sizes[index].sizes
                                    }
                                    placeholder="Sizes"
                                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.spacification?.[index]
                                      ?.sizesDetails &&
                                      (
                                        formik.errors
                                          .sizes as FormikErrors<FormValues["sizes"]>
                                      )?.[index]?.sizesDetails
                                      ? "border-red-500"
                                      : ""
                                      }`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-red"
                                  >
                                    <RxCross2 className="text-red" size={25} />
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              type="button"
                              onClick={() => push({ sizesDetails: "" })}
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-fit"
                            >
                              Add Sizes
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div> */}

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Hover Image
                      </h3>
                    </div>
                    {(hoverImage && hoverImage?.length > 0) ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                        {hoverImage.map((item: any, index) => {
                          return (
                            <div key={index}>

                              <div
                                className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"

                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full">
                                  <RxCross2
                                    className="cursor-pointer text-red-500 hover:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        sethoverImage
                                      );
                                    }}
                                  />
                                </div>
                                <Image
                                  key={index}
                                  className="object-cover w-full h-full"
                                  width={300}
                                  height={400}
                                  src={item?.imageUrl}
                                  alt={`productImage-${index}`}
                                />
                              </div>
                              <input className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none" placeholder="altText" type="text" name="altText" value={item.altText} onChange={(e) =>
                                handlealtTextHover(index, String(e.target.value))
                              } />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Imageupload sethoverImage={sethoverImage} />
                    )}
                  </div>

                  <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Product Images
                      </h3>
                    </div>
                    <Imageupload setImagesUrl={setImagesUrl} />
                    {imagesUrl && imagesUrl.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {imagesUrl.map((item: any, index) => {
                          return (
                            <div key={index}>

                              <div
                                className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"

                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full z-10">
                                  <RxCross2
                                    className="cursor-pointer btext-red-500 hover:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      console.log("funciton called");
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setImagesUrl
                                      );
                                    }}
                                  />
                                </div>
                                <div key={index} className=" relative ">
                                  <div className="h-[100px] w-full overflow-hidden">
                                    <Image
                                      className="object-cover w-full h-full"
                                      width={300}
                                      height={200}
                                      src={item.imageUrl}
                                      alt={`productImage-${index}`}
                                    />
                                  </div>

                                  <input
                                    type="number"
                                    placeholder="Add Image Index"
                                    className=" rounded-b-md p-2 text-sm focus:outline-none w-full "
                                    value={item.imageIndex}
                                    onChange={(e) =>
                                      handleImageIndex(index, Number(e.target.value))
                                    }
                                  />

                                </div>

                              </div>
                              <input className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none" placeholder="altText" type="text" name="altText" value={item.altText} onChange={(e) =>
                                handlealtText(index, String(e.target.value))
                              } />

                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {imgError ? (
                <div className="flex justify-center">
                  <div className="text-red pt-2 pb-2">{imgError}</div>
                </div>
              ) : null}

              <button
                type="submit"
                className="px-10 py-2 mt-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              >
                {loading ? <Loader color="white" /> : "Submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormElements;
