
import * as Yup from 'yup';
import {Product, Category,FormValues} from 'types/interfaces'

export const validateForm = (formData: { fullName: string; email: string; password: string; confirmpassword: string }) => {
    if (formData.password !== formData.confirmpassword) {
      return 'Confirm password and password do not match.';
    }
  
    if (!formData.fullName || !formData.email || !formData.password) {
      return 'All fields are required.';
    }
  
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
  
    if (!/\d/.test(formData.password)) {
      return 'Password must contain at least one number.';
    }
  
    if (!/[!@#$%^&*]/.test(formData.password)) {
      return 'Password must contain at least one special character.';
    }
  
    return '';
  };

  export  const withoutHeaderPages = [
    "/login",
    '/register',
    "/superAdminlogin"
  ]




export const inputFields = [
    { name: "name", type: 'text' },
    { name: "description", type: 'text' },
    { name: "price", type: 'number' },
    // { name: "category", type: 'text' },
    { name: "discountPrice", type: 'number' },
  ];

  export const CategorinputFields = [
    { name: "name", type: 'text' },

  ];
  export const withoutVariation = [
    { name: "totalStockQuantity", type: 'number' },
  ];
  
  export const Variation = [
    { name: "variant", type: 'text' },
    { name: "quantity", type: 'number' },
  ];


  export const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
  });


  export const loginValidationSchema = Yup.object({
    name: Yup.string().required('Required'),
    password: Yup.string().required('Required'),

  });

  export const categoryValidationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('required')

  });

  

 export const initialValues: Product = {
    name: '',
    description: '',
    price: '',
    colors: [],
    totalStockQuantity: 0,
    variantStockQuantities: [],
    modelDetails: [],
    spacification: [],
    discountPrice: '',
    category: '' 
  };

  export const categoryInitialValues: Category = {
    name: '',
    description: ""
  };

  
 export const loginInitialValue = {
  name: '',
  password:'' 
};



export  const generateSlug = (text:string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-'); 
};

// @ts-nocheck
export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string().required('Required'),
  salePrice: Yup.number()
    .min(1, "Minimum sales price must be at least 1")
    .required('Required'),
  purchasePrice: Yup.number()
    .min(1, "Must be at least 1")
    .required('Required'),
  discountPrice: Yup.number().nullable(), 
  starRating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, 'Star Rating should be a maximum of 5')
    .nullable(),
  reviews: Yup.string().nullable(),
  colors: Yup.array().of(Yup.object().shape({
    colorName: Yup.string().nullable(),
  })),
  modelDetails: Yup.array().of(Yup.object().shape({
    name: Yup.string().nullable(),
    detail: Yup.string().nullable(),
  })),
  spacification: Yup.array().of(Yup.object().shape({
    specsDetails: Yup.string().nullable()
  })),
  sizes: Yup.array().of(Yup.object().shape({
    sizesDetails: Yup.string().nullable()
  })),
  category: Yup.string().required('Category is required'),
  totalStockQuantity: Yup.number().nullable(),
  variantStockQuantities: Yup.array().of(Yup.object().shape({
    variant: Yup.string().nullable(),
    quantity: Yup.number().nullable(),
  })),
});


export const AddproductsinitialValues: FormValues = {
  name: '',
  description: '',
  salePrice: '',
  purchasePrice: '',
  discountPrice: '',
  starRating: '',
  reviews: '',
  colors: [],
  variantStockQuantities: [],
  totalStockQuantity:0,
  modelDetails: [],
  spacification: [],
  sizes: [],
  category: "",
  code: ""

};

export const options = [
  {
    value: 'abu_dhabi',
    label: 'Abu Dhabi',
  },
  {
    value: 'dubai',
    label: 'Dubai',
  },
  {
    value: 'sharjah',
    label: 'Sharjah',
  },
  {
    value: 'ajman',
    label: 'Ajman',
  },
  {
    value: 'umm_al_quwain',
    label: 'Umm Al Quwain',
  },
  {
    value: 'ras_al_khaimah',
    label: 'Ras Al Khaimah',
  },
  {
    value: 'fujairah',
    label: 'Fujairah',
  },
];
