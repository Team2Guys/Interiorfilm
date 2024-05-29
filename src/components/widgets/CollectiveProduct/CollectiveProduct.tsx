import Container from 'components/Layout/Container/Container'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Define the type for the product data
interface Product {
  image: any;
  category: string;
}

// Define the props type for the component
interface CollectiveProductProps {
  products: Product[];
}

const CollectiveProduct: React.FC<CollectiveProductProps> = ({ products }) => {
  return (
    <Container className="mt-10">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 mb-2 justify-items-center gap-0 md:gap-4'>
        {products.map((product, index) => (
          <div className='bg-secondary p-2 w-full flex' key={index}>
            <div className='w-3/6'>
              <Image className='w-full' width={300} height={300} src={product.image} alt='image'/>
            </div>
            <div className='flex justify-center items-center w-3/6'>
              <div className='lg:px-8 px-4'>
                <h1 className='text-lg font-medium mb-4'>{product.category}</h1>
                <Link className='border rounded lg:px-5 px-4 text-sm py-2 transition-all border-primary hover:bg-primary hover:text-white text-dark' href={"/"}>View All</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default CollectiveProduct;



