export const StaticCategory = {
  posterImageUrl: {
    public_id: "string",
    imageUrl: "string",
  },
  _id: "all",
  name: "View All",
  createdAt: "string",
  updatedAt: "string",
  __v: "any",
};

export const fetchCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`, {
    next: { tags: ['categories'] },
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

// Utility function to fetch products
export const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`, {
    next: { tags: ['products'] },
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

// Utility function to fetch add-on products
export const fetchAddOnProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addsOn_product/getAllproducts`, {
    next: { tags: ['addonProducts'] },
  });
  if (!res.ok) throw new Error('Failed to fetch add-on products');
  return res.json();
};


export const fetchCategoryMeta = async (slug: string, meta?: boolean) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${meta ? "getCategoryonlyMetatitle" : "findSigneCategory"}/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['categories'] },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch category metadata: ${res.statusText}`);
    }

    const data = await res.json();
    return data.category; // assuming your controller returns { category: { ... } }
  } catch (error) {
    console.error('Error fetching category metadata:', error);
    return null;
  }
};