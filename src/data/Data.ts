import img from "../../public/images/img-14.png"
import img2 from "../../public/images/img-15.png"
import img3 from "../../public/images/img-10.png";
import img4 from "../../public/images/img-11.png";
import img5 from "../../public/images/img-12.png";
import img6 from "../../public/images/img-13.png";
import img7 from "../../public/images/img-14.png";
import img8 from "../../public/images/img-15.png";
import img9 from "../../public/images/img-16.png";

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


 export const productdata =[
    {image:img,title:"Lorem ipsum",description:"Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim."},
    {image:img2,title:"Lorem ipsum",description:"Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim."},
    {image:img2,title:"Lorem ipsum",description:"Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim."},
    {image:img,title:"Lorem ipsum",description:"Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim."},
  ]

  

  export const menuSlide =[
    {image: img3,title: "CA-13089",},
    { image: img4,title: "CA-13050",},
    {image: img5,title: "CA-13067",},
    {image: img6,title: "CA-13324",},
    {image: img7,title: "CA-12324",},
    {image: img8,title: "CA-12524", },
  ]

  export const menudata =[
    {image: img3,title: "CA-13089",},
    { image: img4,title: "CA-13050",},
    {image: img5,title: "CA-13067",},
    {image: img6,title: "CA-13324",},
    {image: img7,title: "CA-12324",},
    {image: img8,title: "CA-12524", },
    {image: img3,title: "CA-13089",},
    { image: img4,title: "CA-13050",},
    {image: img5,title: "CA-13067",},
    {image: img6,title: "CA-13324",},
    {image: img7,title: "CA-12324",},
    {image: img8,title: "CA-12524", },
    {image: img3,title: "CA-13089",},
    { image: img4,title: "CA-13050",},
    {image: img5,title: "CA-13067",},
    {image: img6,title: "CA-13324",},
    {image: img7,title: "CA-12324",},
    {image: img8,title: "CA-12524", },
  ]

  
