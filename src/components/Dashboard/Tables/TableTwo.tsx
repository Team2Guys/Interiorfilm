// "use client";

// import { Pagination } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { SetStateAction, useLayoutEffect, useState } from "react";
// import { FaEdit, FaEye } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";
// import {CategoriesType} from 'types/interfaces'


// interface CategoryProps {
//   setMenuType: React.Dispatch<SetStateAction<string>>
//   seteditCategory?:React.Dispatch<SetStateAction<CategoriesType | undefined | null>>
//   editCategory?: CategoriesType | undefined | null
// }

// const TableTwo: React.FC<CategoryProps> = ({setMenuType,seteditCategory,editCategory}) => {
//   const [category, setCategory] = useState<any[]>();
//   const CategoryHandler = async () => {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
//     );
//     const Categories = await response.json();
//     setCategory(Categories);
//   };
//   const pathname = usePathname();
//   useLayoutEffect(() => {
//     CategoryHandler();
//   }, []);

//   return (
//     <>
//       <p
//   onClick={()=>{setMenuType("Add category")}}
//         className= "cursor-pointer p-2 hover:bg-slate-300 flex justify-end w-fit ml-auto "
//       >
//         Add Categories
//       </p>
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="px-4 py-6 md:px-6 xl:px-7.5">
//           <h4 className="text-xl font-semibold text-black dark:text-white">
//             Top Products
//           </h4>
//         </div>

//         <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
//           <div className="col-span-2 md:col-span-3 flex items-center">
//             <p className="font-medium text-black dark:text-white">
//               Category Image
//             </p>
//           </div>
//           <div className="col-span-2 md:col-span-3  items-center sm:flex">
//             <p className="font-medium text-black dark:text-white">
//               Category Name
//             </p>
//           </div>
//           <div className="col-span-2 flex items-center justify-end md:justify-start">
//             <p className="font-medium text-black dark:text-white">Action</p>
//           </div>
//         </div>

//         {category &&
//           category.map((product, key) => (
//             <div
//               className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
//               key={key}
//             >
//               <div className="col-span-2 md:col-span-3 flex items-center">
//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//                   <div className="h-12.5 w-15 rounded-md">
//                     <Image
//                       src={product.posterImageUrl.imageUrl}
//                       width={60}
//                       height={50}
//                       alt="Product"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className=" col-span-2 md:col-span-3  items-center flex">
//                 <p className="text-sm text-black dark:text-white">
//                   {product.name}
//                 </p>
//               </div>
//               <div className="col-span-2 flex gap-4 items-center justify-end md:justify-start">
//                 <FaEye
//                   className="text-black dark:text-white cursor-pointer"
//                   size={20}
//                 />
//                 <FaEdit
//                   className="text-black dark:text-white cursor-pointer"
//                   size={20}
//                 />
//                 <MdDeleteOutline
//                   className="text-black dark:text-white cursor-pointer"
//                   size={20}
//                 />
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default TableTwo;




import React, { SetStateAction, useLayoutEffect, useState } from "react";
import { Table, Button } from "antd";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { LiaEdit } from "react-icons/lia";
import {CategoriesType} from 'types/interfaces'
import { useAppSelector } from "components/Others/HelperRedux";



interface CategoryProps {
  setMenuType: React.Dispatch<SetStateAction<string>>
  seteditCategory?:React.Dispatch<SetStateAction<CategoriesType | undefined | null>>
  editCategory?: CategoriesType | undefined | null
}

function TableTwo({setMenuType,seteditCategory,editCategory}: CategoryProps) {
const [category, setCategory] = useState<any[]>();
const [loading, setLoading] = useState<boolean>(false);

const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

let canAddCategory= loggedInUser && loggedInUser.canAddCategory 
let canDeleteCategory=loggedInUser && loggedInUser.canDeleteCategory


  useLayoutEffect(() => {
    const CategoryHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
        );
        const Categories = await response.json();
        setCategory(Categories);
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    };

    CategoryHandler();

  }, []);





  const handleDelete = async (key: any) => {
    try {
      let reponse = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteCategory/${key}`
      );
      console.log("Deleted", reponse);
      setCategory((prev: any) => prev.filter((item: any) => item._id != key));
    } catch (err) {
      console.log("Deleting record with key:", err);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "posterImageUrl",
      key: "posterImageUrl",
      render: (text: any, record: any) => (
        <Image
          src={record.posterImageUrl.imageUrl}
          alt={`Image of ${record.name}`}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text: any, record: any) => {
        const createdAt = new Date(record.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(
          createdAt.getMonth() + 1
        ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "time",
      render: (text: any, record: any) => {
        const createdAt = new Date(record.createdAt);
        const formattedTime = `${String(createdAt.getHours()).padStart(
          2,
          "0"
        )}:${String(createdAt.getMinutes()).padStart(2, "0")}
  
        `;
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: "Edit",
      key: "Edit",
      render: (text: any, record: any) => (
        <LiaEdit
          className={"cursor-pointer"}
          size={20}
          onClick={() => {
            seteditCategory && seteditCategory(record);
            setMenuType("CategoryForm");
          }}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteCategory && "text-red-500"} ${
            !canDeleteCategory && "cursor-not-allowed text-gray-400"
          }`}
          // className="cursor-pointer text-red-500"
          size={20}
          onClick={() => {
            if (canDeleteCategory) {
              handleDelete(record._id);
            }
          }}
        />
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center">
            <p>Categories</p>
            <div>
              <p
                className={`${
                  canAddCategory && "cursor-pointer"
                } lg:p-2 md:p-2 ${
                  canAddCategory && "hover:bg-gray-200"
                } flex justify-center ${
                  !canAddCategory && "cursor-not-allowed text-gray-400"
                }`}
                onClick={() => {
                  seteditCategory && seteditCategory(null);
                  if (canAddCategory) {
                    setMenuType("Add Category");
                  }
                }}
              >
                Add Category
              </p>
            </div>
          </div>
          {category && category.length > 0 ? (
            <Table
              className="overflow-x-scroll"
              dataSource={category}
              columns={columns}
              pagination={false}
              rowKey="_id"
            />
          ) : (
            "No Categories found"
          )}
        </>
      )}
    </div>
  );
}

export default TableTwo;
