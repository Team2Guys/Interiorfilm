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


  import * as Yup from 'yup';
import {Product, Category} from 'types/interfaces'


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

  });

  

 export const initialValues: Product = {
    name: '',
    description: '',
    price: '',
    colors: [],
    modelDetails: [],
    spacification: [],
    discountPrice: '',
    category: '' 
  };

  export const categoryInitialValues: Category = {
    name: ''
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


