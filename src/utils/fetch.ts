

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



export const getCategorywihtCustomorizeField = async (query:string, categoryName?: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategorywihtCustomorizeField`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({query:query, categoryName:categoryName}),
      next: { tags: ['categories'] },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch category metadata: ${res.statusText}`);
    
    }

    const data = await res.json();
return data
  } catch (error) {
    console.error('Error fetching category metadata:', error);
    return null;
  }
};

export const fetchRedirectUrl = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/general/getredirecturl`,
      {
        method: "GET",
        next: { tags: ["Redirecturl"] },
      }
    );

    const data = await response.json();
    return data.redirecturls ?? [];
  } catch (error) {
    console.error("Error fetching redirect URLs:", error);
    return null;
  }
};


