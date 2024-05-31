"use client";
import React, { useState, DragEvent, SetStateAction, useEffect } from 'react';
import { Formik, FieldArray, FormikErrors, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import SelectGroupTwo from "components/Dashboard/SelectGroup/SelectGroupTwo";
import Imageupload from 'components/ImageUpload/Imageupload';
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import { Product, FormValues } from "types/interfaces";
import Toaster from "components/Toaster/Toaster";
import axios from 'axios';

interface ADDPRODUCTFORMPROPS {
  EditInitialValues?: any | undefined,
  EditProductValue?: Product | undefined

}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  salePrice: Yup.number().required('Required'),
  purchasePrice: Yup.number().required('Required'),
  discountPrice: Yup.number(),
  starRating: Yup.string(),
  reviews: Yup.string(),
  colors: Yup.array().of(Yup.object({
    colorName: Yup.string(),
  })),
  modelDetails: Yup.array().of(Yup.object({
    name: Yup.string(),
    detail: Yup.string(),
  })),
  spacification: Yup.array().of(Yup.object({
    specsDetails: Yup.string().required('Required'),
  })),
  sizes: Yup.array().of(Yup.string()),
  category: Yup.string().required('Required'),

});

const FormElements: React.FC<ADDPRODUCTFORMPROPS> = ({ EditInitialValues, EditProductValue }) => {

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [imagesUrl, setImagesUrl] = useState<any[]>([]);
  const [posterimageUrl, setposterimageUrl] = useState<any[] | null>();
  const [hoverImage, sethoverImage] = useState<any[] | null | undefined>();
  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<any | null | undefined>(EditProductValue)
  const [imgError, setError] = useState<string | null | undefined>()
  const [Categories, setCategories] = useState<any[]>();


  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const initialValues: FormValues = {
    name: '',
    description: '',
    salePrice: '',
    purchasePrice: '',
    discountPrice: '',
    starRating: '',
    reviews: '',
    colors: [],
    modelDetails: [],
    spacification: [],
    sizes: [],
    category: "",
    code:""

  };



  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      setError(null)
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      let hoverImageUrl = hoverImage && hoverImage[0];
      let createdAt = Date.now()
      console.log(posterImageUrl, "posterimageUrl");
      if (!posterImageUrl || !hoverImageUrl || !(imagesUrl.length > 0)) {
        throw new Error("Please select relevant Images");

      }
      let newValue = {
        ...values,
        posterImageUrl,
        imageUrl: imagesUrl,
        hoverImageUrl,
        createdAt
      };
      setloading(true)

      let updateFlag = EditProductValue && EditInitialValues ? true : false
      let addProductUrl = updateFlag ? `/api/updateProduct/${EditInitialValues._id} ` : null;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : "/api/addProduct"}`


      const response = await axios.post(url, newValue);
      console.log(response, "response");
      Toaster("success", updateFlag ? "Product has been sucessufully Updated !" : "Product has been sucessufully Created !");
      setProductInitialValue(null)
      resetForm();
      setloading(false)
      sethoverImage(null)
      setposterimageUrl(null)
      setImagesUrl([])


    }
    catch (err: any) {

      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
        console.log(err.response.data.error, "err.response.data.message"
        )
      } else {

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }


      }
    } finally {
      setloading(false)


    }

  }


  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
        const Categories = await response.json();
        setCategories(Categories);

      } catch (err) {
        console.log(err, "err")
      }
    };

    CategoryHandler();
  }, []);




  return (
    <>
      <Breadcrumb pageName="Add products" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}

      >
        {formik => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                  <div className="rounded-sm border border-stroke bg-white  ">

                    <div className="rounded-sm border border-stroke bg-white">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Product Images
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl.length > 0 ? (
                        <div className="flex gap-2 border-3 flex-wrap ">
                          {posterimageUrl.map((item: any, index) => {
                            return (
                              <div className="group p-4" key={index} >
                                <div className="flex justify-end invisible group-hover:visible ">
                                  <RxCross2
                                    className="cursor-pointer"
                                    onClick={() => {
                                      ImageRemoveHandler(item.public_id, setposterimageUrl);
                                    }}
                                  />
                                </div>
                                <Image
                                  key={index}
                                  className="cursor-pointer"
                                  width={30}
                                  height={30}
                                  src={item.imageUrl}
                                  alt={`productImage-${index}`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) :

                        <Imageupload setposterimageUrl={setposterimageUrl} />

                      }

                    </div>


                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Product Title
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          placeholder="Title"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red text-sm">{formik.errors.name}</div>
                        ) : null}
                      </div>

                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          description                      </label>
                        <textarea

                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          placeholder="description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''
                            }`}
                        />
                        {formik.touched.description && formik.errors.description ? (
                          <div className="text-red text-sm">{formik.errors.description}</div>
                        ) : null}
                      </div>

                      <div className="flex full gap-4">
                        <div className="w-[33%]">
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.salePrice && formik.errors.salePrice ? 'border-red-500' : ''
                              }`}
                          />
                          {formik.touched.salePrice && formik.errors.salePrice ? (
                            <div className="text-red text-sm">{formik.errors.salePrice}</div>
                          ) : null}
                        </div>

                        <div className="w-[33%]">
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.purchasePrice && formik.errors.purchasePrice ? 'border-red-500' : ''
                              }`}
                          />
                          {formik.touched.purchasePrice && formik.errors.purchasePrice ? (
                            <div className="text-red text-sm">{formik.errors.purchasePrice}</div>
                          ) : null}
                        </div>
                        <div className='w-[33%]'>
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.discountPrice && formik.errors.discountPrice ? 'border-red-500' : ''
                              }`}
                          />
                          {formik.touched.discountPrice && formik.errors.discountPrice ? (
                            <div className="text-red text-sm">{formik.errors.discountPrice}</div>
                          ) : null}

                        </div>
                      </div>

                      <div className='flex gap-4'>
                        <div className='w-2/4'>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Product Code
                        </label>
                        <input
                          type="text"
                          name="code"
                          onChange={formik.handleChange}
                          value={formik.values.code}
                          placeholder="Product code"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                            }`}
                        />
                        {formik.touched.name && formik.errors.code ? (
                          <div className="text-red text-sm">{formik.errors.code}</div>
                        ) : null}

                        </div>
                        <div className='w-2/4'>
                          <SelectGroupTwo name='category' changeHandler={formik.handleChange} value={formik.values.category} Categories={Categories} selectedOption={selectedOption} setSelectedOption={setSelectedOption} changeTextColor={changeTextColor} isOptionSelected={isOptionSelected} />

                          <ErrorMessage name='category' component="div" className="text-red" />

                        </div>


                      </div>



                      <div className='flex gap-4'>
                        <div className="rounded-sm border border-stroke bg-white w-2/4">
                          <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                              Colors
                            </h3>
                          </div>
                          <div className='flex flex-col gap-4 p-4'>

                            <FieldArray name="colors">
                              {({ push, remove }) => (
                                <div className='flex flex-col gap-2'>
                                  {formik.values.colors.map((color, index) => (
                                    <div key={index} className="flex">
                                      <input
                                        type="text"
                                        name={`colors[${index}].colorName`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.colors[index].colorName}
                                        placeholder="Color Name"
                                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.colors?.[index]?.colorName && (formik.errors.modelDetails as FormikErrors<FormValues['colors']>)?.[index]?.colorName
                                          ? 'border-red-500'
                                          : ''
                                          }`}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="ml-2 text-red"
                                      >
                                        <RxCross2 className='text-red' size={25} />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => push({ colorName: '' })}
                                    className="mt-2 text-blue-500 align-start w-fit"
                                  >
                                    Add Color
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>



                        {/* Sizes */}
                        <div className="rounded-sm border border-stroke bg-white w-2/4" >
                          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                              Sizes
                            </h3>
                          </div>
                          <div className="flex flex-col gap-4 p-4">

                            <FieldArray name="sizes">
                              {({ push, remove }) => (
                                <div className='flex flex-col gap-2'>
                                  {formik.values.sizes.map((size, index) => (
                                    <div key={index} className="flex items-center">
                                      <input
                                        type="text"
                                        name={`sizes[${index}]`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.sizes[index]}
                                        placeholder="Size"
                                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${(formik.errors.sizes as FormikErrors<FormValues['sizes']>)?.[index]
                                          && formik.errors.sizes?.[index] ? 'border-red-500' : ''
                                          }`}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="ml-2 text-red"
                                      >
                                        <RxCross2 className='text-red' size={25} />

                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => push('')}
                                    className="mt-2 text-blue-500 w-fit"
                                  >
                                    Add Size
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>




                    </div>


                  </div>
                </div>


                <div className="flex flex-col gap-5">
                  <div className='flex gap-4'>
                  


                    <div className="w-2/4">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Star Rating
                      </label>
                      <input
                        type="text"
                        name="starRating"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.starRating}
                        placeholder="Star Rating"
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.starRating && formik.errors.starRating ? 'border-red-500' : ''
                          }`}
                      />
                      {formik.touched.starRating && formik.errors.starRating ? (
                        <div className="text-red text-sm">{formik.errors.starRating}</div>
                      ) : null}
                    </div>

                    <div className="w-2/4">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Reviews
                      </label>
                      <input
                        type="text"
                        name="reviews"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.reviews}
                        placeholder="Reviews"
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.reviews && formik.errors.reviews ? 'border-red-500' : ''
                          }`}
                      />
                      {formik.touched.reviews && formik.errors.reviews ? (
                        <div className="text-red text-sm">{formik.errors.reviews}</div>
                      ) : null}
                    </div>

                  </div>



                  <div className="rounded-sm border border-stroke bg-white ">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Model Details
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <FieldArray name="modelDetails">
                        {({ push, remove }) => (
                          <div className='flex flex-col gap-2'>
                            {formik.values.modelDetails.map((model, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  name={`modelDetails[${index}].name`}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.modelDetails[index].name}
                                  placeholder="Model Name"
                                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.modelDetails?.[index]?.name &&
                                    (formik.errors.modelDetails as FormikErrors<FormValues['modelDetails']>)?.[index]?.name
                                    ? 'border-red-500'
                                    : ''
                                    }`}
                                />
                                <input
                                  type="text"
                                  name={`modelDetails[${index}].detail`}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.modelDetails[index].detail}
                                  placeholder="Model Detail"
                                  className={`w-full rounded-lg ml-2 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.modelDetails?.[index]?.detail &&
                                    (formik.errors.modelDetails as FormikErrors<FormValues['modelDetails']>)?.[index]?.detail
                                    ? 'border-red-500'
                                    : ''
                                    }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="ml-2 text-red"
                                >
                                  <RxCross2 className='text-red' size={25} />

                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push({ name: '', detail: '' })}
                              className="mt-2 text-blue-500 w-fit"
                            >
                              Add Model
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Specification
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                      <FieldArray name="spacification">
                        {({ push, remove }) => (
                          <div className='flex flex-col gap-2'>
                            {formik.values.spacification.map((spec, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  name={`spacification[${index}].specsDetails`}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.spacification[index].specsDetails}
                                  placeholder="Specification Details"
                                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.spacification?.[index]?.specsDetails &&

                                    (formik.errors.spacification as FormikErrors<FormValues['spacification']>)?.[index]?.specsDetails
                                    ? 'border-red-500'
                                    : ''
                                    }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="ml-2 text-red"
                                >
                                  <RxCross2 className='text-red' size={25} />

                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push({ specsDetails: '' })}
                              className="mt-2 text-blue-500 w-fit"
                            >
                              Add Specification
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>


                  <div className="rounded-sm border border-stroke bg-white ">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Hover Image
                      </h3>
                    </div>

                    {hoverImage && hoverImage.length > 0 ? (
                      <div className="flex gap-2 border-3 flex-wrap ">
                        {hoverImage.map((item: any, index) => {
                          return (
                            <div className="group p-4" key={index} >
                              <div className="flex justify-end invisible group-hover:visible ">
                                <RxCross2
                                  className="cursor-pointer"
                                  onClick={() => {
                                    ImageRemoveHandler(item.public_id, sethoverImage);
                                  }}
                                />
                              </div>
                              <Image
                                key={index}
                                className="cursor-pointer"
                                width={30}
                                height={30}
                                src={item.imageUrl}
                                alt={`productImage-${index}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) :
                      <Imageupload sethoverImage={sethoverImage} />
                    }
                  </div>

                  <div className="rounded-sm border border-stroke bg-white ">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Product Images
                      </h3>
                    </div>





                    <Imageupload setImagesUrl={setImagesUrl} />


                    {imagesUrl && imagesUrl.length > 0 ? (
                      <div className="flex gap-2 border-3 flex-wrap   ">
                        {imagesUrl.map((item: any, index) => {
                          return (
                            <div className="group pl-4 pb-4" key={index}>
                              <div className="flex justify-end invisible group-hover:visible ">
                                <RxCross2
                                  className="cursor-pointer"
                                  onClick={() => {
                                    console.log('function called')
                                  }}
                                />
                              </div>
                              <Image
                                key={index}
                                className="cursor-pointer"
                                width={30}
                                height={30}
                                src={item.imageUrl}
                                alt={`productImage-${index}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : null}

                  

                  </div>








                </div>


              </div>

              { imgError ?
                    <div className='flex justify-center'>

                      <div className="text-red pt-2 pb-2">{imgError}</div>
                    </div>
                     : null
                    }

          

              <button type="submit" className="mt-4  px-8 py-2 bg-blue-500 text-white rounded">
                Submit
              </button>
            </Form>

          )
        }}
      </Formik>


    </>
  );
};

export default FormElements;
