
import LabelInput from "components/Common/LabelInput/LabelInput";
import React, { SetStateAction } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
interface editAdsProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
}
const AddAds = ({ setMenuType }: editAdsProps) => {
  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer text-black dark:text-white"
        onClick={() => {
          setMenuType("AdsData");
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <div className="flex justify-center ">
        <div className="flex flex-col gap-9 w-2/5 dark:border-strokedark dark:bg-boxdark">
          <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
            <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-4 dark:border-strokedark space-y-2">
                <h3 className="font-medium text-black dark:text-white">
                  Add Ads Product 
                </h3>
                <LabelInput name="name" type="text" id={"name"} placeholder="Enter Name" label="Enter Name"/>
                <LabelInput name="description" type="text" id={"description"} placeholder="Enter description" label="Enter Description"/>
                <LabelInput name="salePrice" type="text" id={"salePrice"} placeholder="Enter SalePrice" label="Enter SalePrice"/>
                <LabelInput name="code" type="text" id={"code"} placeholder="Enter code" label="Enter code"/>
                <LabelInput name="purchasePrice" type="text" id={"purchasePrice"} placeholder="Enter purchasePrice" label="Enter purchasePrice"/>

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAds;
