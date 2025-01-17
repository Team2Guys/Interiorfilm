import React from 'react'
import Category from './Category'
import { getAllCategories } from 'config/fetch';

const CategoryPage = async () => {
  const categoriesData = await getAllCategories();
  return (
    <Category category={categoriesData} />
  )
}

export default CategoryPage