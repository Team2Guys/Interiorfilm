//@ts-nocheck
import { Table } from 'antd'
import Button from 'components/Common/Button'
import React from 'react'
import { MdOutlineDelete } from 'react-icons/md';

const dataSource = [
    {
      key: '1',
      Name: 'John Doe',
      Email: 32,
      age: 32,
      AddProduct: 32,
      DeleteProduct: 32,
      AddCategory: 32,
      DeleteCategory: 32,
      Action: <><MdOutlineDelete size={20} /> </>,
      
    },

  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Add Product',
      dataIndex: 'AddProduct',
      key: 'AddProduct',
    },
    {
        title: 'Delete Product',
        dataIndex: 'DeleteProduct',
        key: 'DeleteProduct',
      },
      {
        title: 'Add Category',
        dataIndex: 'AddCategory',
        key: 'AddCategory',
      },
      {
        title: 'Delete Category',
        dataIndex: 'DeleteCategory',
        key: 'DeleteCategory',
      },
    {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
        fixed: 'right',
        width: 10,
      },
  ];

const AllAdmin = ({setselecteMenu}:any) => {
  return (
    <>
          <div className="flex justify-between mb-4 items-center">
            <p className='font-semibold text-lg'>All Admin</p>
            <div>
              <Button className='bg-primary text-white' title={"Add new Admin"}  onClick={() => setselecteMenu("Add Admin")}/>
            </div>
          </div>
          <Table className='overflow-x-auto overflow-hidden' dataSource={dataSource} columns={columns}  pagination={false}/>
    </>
  )
}

export default AllAdmin