"use client";
import React from 'react';
import { Formik, FieldArray, FormikErrors, Form } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import SelectGroupTwo from "components/Dashboard/SelectGroup/SelectGroupTwo";

// Define TypeScript interface for form values
interface FormValues {
  name: string;
  description: string;
  salePrice: string;
  purchasePrice: string;
  discountPrice: string;
  starRating: string;
  reviews: string;
  colors: { colorName: string }[];
  modelDetails: { name: string; detail: string }[];
  spacification: { specsDetails: string }[];
  sizes: string[];
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
    name: Yup.string().required('Required'),
    detail: Yup.string().required('Required'),
  })),
  spacification: Yup.array().of(Yup.object({
    specsDetails: Yup.string().required('Required'),
  })),
  sizes: Yup.array().of(Yup.string()),
});

const FormElements: React.FC = () => {

  const initialValues: FormValues = {
    name: '',
    description: '',
    salePrice: '',
    purchasePrice: '',
    discountPrice: '',
    starRating: '',
    reviews: '',
    colors: [{ colorName: '' }],
    modelDetails: [{ name: '', detail: '' }],
    spacification: [{ specsDetails: '' }],
    sizes: [''],
  };

  return (
    <>
      <Breadcrumb pageName="Add products" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('Form Data:', values);
        }}
      >
        {formik => {
        // console.log(formik.values, "value")
return(
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                        }`}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                      ) : null}
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      description                      </label>
                      <input
                        type="text"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        placeholder="description"
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.touched.description && formik.errors.description ? 'border-red-500' : ''
                        }`}
                      />
                      {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-500 text-sm">{formik.errors.description}</div>
                      ) : null}
                    </div>

                    <div className="flex full justify-between">
                      <div className="w-2/5">
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
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                            formik.touched.salePrice && formik.errors.salePrice ? 'border-red-500' : ''
                          }`}
                        />
                        {formik.touched.salePrice && formik.errors.salePrice ? (
                          <div className="text-red-500 text-sm">{formik.errors.salePrice}</div>
                        ) : null}
                      </div>

                      <div className="w-2/5">
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
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                            formik.touched.purchasePrice && formik.errors.purchasePrice ? 'border-red-500' : ''
                          }`}
                        />
                        {formik.touched.purchasePrice && formik.errors.purchasePrice ? (
                          <div className="text-red-500 text-sm">{formik.errors.purchasePrice}</div>
                        ) : null}
                      </div>
                    </div>

                    <div>
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
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.touched.discountPrice && formik.errors.discountPrice ? 'border-red-500' : ''
                        }`}
                      />
                      {formik.touched.discountPrice && formik.errors.discountPrice ? (
                        <div className="text-red-500 text-sm">{formik.errors.discountPrice}</div>
                      ) : null}
                    </div>

                    <div>
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
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.touched.starRating && formik.errors.starRating ? 'border-red-500' : ''
                        }`}
                      />
                      {formik.touched.starRating && formik.errors.starRating ? (
                        <div className="text-red-500 text-sm">{formik.errors.starRating}</div>
                      ) : null}
                    </div>

                    <div>
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
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                          formik.touched.reviews && formik.errors.reviews ? 'border-red-500' : ''
                        }`}
                      />
                      {formik.touched.reviews && formik.errors.reviews ? (
                        <div className="text-red-500 text-sm">{formik.errors.reviews}</div>
                      ) : null}
                    </div>

                    {/* FieldArray for colors */}
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Colors
                      </label>
                      <FieldArray name="colors">
                        {({ push, remove }) => (
                          <div>
                            {formik.values.colors.map((color, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  name={`colors[${index}].colorName`}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.colors[index].colorName}
                                  placeholder="Color Name"
                                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                                    formik.touched.colors?.[index]?.colorName && (formik.errors.modelDetails as FormikErrors<FormValues['colors']>)?.[index]?.colorName
                                      ? 'border-red-500'
                                      : ''
                                  }`}
                                />
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="ml-2 text-red-500"
                                >
                                  X
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push({ colorName: '' })}
                              className="mt-2 text-blue-500"
                            >
                              Add Color
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  
                </div>
              </div>

              <div className="flex flex-col gap-9">
                {/* <!-- Select Elements --> */}
                <SelectGroupTwo />

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Model Details
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <FieldArray name="modelDetails">
                      {({ push, remove }) => (
                        <div>
                          {formik.values.modelDetails.map((model, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="text"
                                name={`modelDetails[${index}].name`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.modelDetails[index].name}
                                placeholder="Model Name"
                                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                                  formik.touched.modelDetails?.[index]?.name &&
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
                                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                                  formik.touched.modelDetails?.[index]?.detail && 
                                  (formik.errors.modelDetails as FormikErrors<FormValues['modelDetails']>)?.[index]?.detail
                                    ? 'border-red-500'
                                    : ''
                                }`}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="ml-2 text-red-500"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ name: '', detail: '' })}
                            className="mt-2 text-blue-500"
                          >
                            Add Model
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Specification
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    {/* FieldArray for spacification */}
                    <FieldArray name="spacification">
                      {({ push, remove }) => (
                        <div>
                          {formik.values.spacification.map((spec, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="text"
                                name={`spacification[${index}].specsDetails`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.spacification[index].specsDetails}
                                placeholder="Specification Details"
                                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                                  formik.touched.spacification?.[index]?.specsDetails &&
                              
                                  (formik.errors.spacification as FormikErrors<FormValues['spacification']>)?.[index]?.specsDetails

                                  
                                    ? 'border-red-500'
                                    : ''
                                }`}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="ml-2 text-red-500"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ specsDetails: '' })}
                            className="mt-2 text-blue-500"
                          >
                            Add Specification
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Sizes
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5.5 p-6.5">
                    {/* FieldArray for sizes */}
                    <FieldArray name="sizes">
                      {({ push, remove }) => (
                        <div>
                          {formik.values.sizes.map((size, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="text"
                                name={`sizes[${index}]`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.sizes[index]}
                                placeholder="Size"
                                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                                  (formik.errors.sizes as FormikErrors<FormValues['sizes']>)?.[index]
                                  && formik.errors.sizes?.[index] ? 'border-red-500' : ''
                                }`}
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="ml-2 text-red-500"
                              >
                                X
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push('')}
                            className="mt-2 text-blue-500"
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

            <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
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
