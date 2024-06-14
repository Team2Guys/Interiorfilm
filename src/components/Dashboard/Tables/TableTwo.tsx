import React, { SetStateAction, useLayoutEffect, useState } from 'react';
import { Table, Modal, notification } from 'antd';
import Image from 'next/image';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import { LiaEdit } from 'react-icons/lia';
import { CategoriesType } from 'types/interfaces';
import { useAppSelector } from 'components/Others/HelperRedux';
import useColorMode from 'hooks/useColorMode';

interface CategoryProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  seteditCategory?: React.Dispatch<SetStateAction<CategoriesType | undefined | null>>;
  editCategory?: CategoriesType | undefined | null;
}

const TableTwo = ({ setMenuType, seteditCategory, editCategory }: CategoryProps) => {
  const [category, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [colorMode, toggleColorMode] = useColorMode();

  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

  const canAddCategory = loggedInUser && loggedInUser.canAddCategory;
  const canDeleteCategory = loggedInUser && loggedInUser.canDeleteCategory;

  useLayoutEffect(() => {
    const CategoryHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`);
        const Categories = await response.json();
        setCategory(Categories);
        setLoading(false);
      } catch (err) {
        console.log('err', err);
        setLoading(false);
      }
    };

    CategoryHandler();
  }, []);

  const confirmDelete = (key: any) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'Once deleted, the product cannot be recovered.',
      onOk: () => handleDelete(key),
      okText: 'Yes',
      cancelText: 'No',
    });
  };

  const handleDelete = async (key: any) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteCategory/${key}`);
      console.log("Deleted", response);
      setCategory((prev: any) => prev.filter((item: any) => item._id != key));

      notification.success({
        message: 'Category Deleted',
        description: 'The category has been successfully deleted.',
        placement: 'topRight',
      });
    } catch (err) {
      console.log("Deleting record with key:", err);

      notification.error({
        message: 'Deletion Failed',
        description: 'There was an error deleting the category.',
        placement: 'topRight',
      });
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'posterImageUrl',
      key: 'posterImageUrl',
      render: (text: any, record: any) => (
        <Image src={record.posterImageUrl.imageUrl} alt={`Image of ${record.name}`} width={50} height={50} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: (text: any, record: any) => {
        const createdAt = new Date(record.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(
          createdAt.getDate()
        ).padStart(2, '0')}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'time',
      render: (text: any, record: any) => {
        const createdAt = new Date(record.createdAt);
        const formattedTime = `${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(
          2,
          '0'
        )}`;
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: 'Edit',
      key: 'Edit',
      render: (text: any, record: any) => (
        <LiaEdit
          className="cursor-pointer"
          size={20}
          onClick={() => {
            seteditCategory && seteditCategory(record);
            setMenuType('CategoryForm');
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <RiDeleteBin6Line
          className={`cursor-pointer ${canDeleteCategory ? 'text-red-500' : 'cursor-not-allowed text-gray-400'}`}
          size={20}
          onClick={() => {
            if (canDeleteCategory) {
              confirmDelete(record._id);
            }
          }}
        />
      ),
    },
  ];

  return (
    <div className={colorMode === 'dark' ? 'dark' : ''}>
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
            <p>Categories</p>
            <div>
              <p
                className={`${canAddCategory ? 'cursor-pointer' : ''} lg:p-2 md:p-2 ${
                  canAddCategory ? 'hover:bg-gray-200' : 'cursor-not-allowed text-gray-400'
                } flex justify-center`}
                onClick={() => {
                  seteditCategory && seteditCategory(null);
                  if (canAddCategory) {
                    setMenuType('Add Category');
                  }
                }}
              >
                Add Category
              </p>
            </div>
          </div>
          {category.length > 0 ? (
            <Table className="overflow-x-scroll lg:overflow-auto" dataSource={category} columns={columns} pagination={false} rowKey="_id" />
          ) : (
            'No Categories found'
          )}
        </>
      )}
    </div>
  );
};

export default TableTwo;
