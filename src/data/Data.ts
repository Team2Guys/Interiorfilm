import img from "../../public/images/img-14.png"
import img2 from "../../public/images/img-15.png"

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


 export const productdata =[
    {image:img,title:"Lorem ipsum",description:"Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim."},
    {image:img2,title:"Lorem ipsum",description:"Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim."},
    {image:img2,title:"Lorem ipsum",description:"Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim."},
    {image:img,title:"Lorem ipsum",description:"Lorem ipsum dolor consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius adipiscing elit. Phasellus blandit massa enim."},
  ]