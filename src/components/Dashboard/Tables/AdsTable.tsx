import React, { SetStateAction } from 'react'
import FilterTable from './FilterTable';

interface CategoryProps {
    setMenuType: React.Dispatch<SetStateAction<string>>
  }

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

const AdsTable =({ setMenuType }: CategoryProps)=> {
  return (
    <div>
        <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
            <input
              className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:drop-shadow-none text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none"
              type="search"
              placeholder="Search Ads Product"
            />
            <div>
              <p
                className={` lg:p-2 md:p-2  flex justify-center cursor-pointer bg-primary rounded-md text-white`}
                onClick={() => {
                 
                    setMenuType('Ads on Product');
                  
                }}
              >
                Ads on Product
              </p>
            </div>
          </div>

          <div>
            <FilterTable data={data} columns={columns}/>
          </div>
    </div>
  )
}

export default AdsTable