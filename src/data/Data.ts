
import * as Yup from 'yup';
import {Product, Category,FormValues} from 'types/interfaces'
import { PrivacyPolicyItem } from 'types/types';

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

export const privacyPolicyData: PrivacyPolicyItem[] = [
  {
    title: '',
    text: 'This Privacy Policy explains how Interiorfilm.ae collects, uses, disclose, and safeguard your information when you visit our website (www.interiorfilm.ae), engage with our services (collectively, services). We value your privacy and we make sure to protect your personal data in compliance with the laws of the United Arab Emirates.',
    listItems: [
      'We present this Privacy Policy to clarify how we handle your information when you use our Services.',
      'Interiorfilm.ae collects personal information including: your name, email address, telephone number, physical address.',
      'Additional information could be: age, gender, hobbies, interests, and other related information.',
      'Interiorfilm.ae does not collect or store credit card numbers or bank details. We use a trusted payment portal to process card payments and details are kept securely with that third party.',
      'We may collect usage data such as IP addresses, browser types, operating systems, device information, and cookies. These data points help to improve our services and provide you with a superior user experience.',
      'We are committed to preserving your privacy and ensuring your satisfaction with our services.',

    ],
  },
  {
    title: 'Use of Your Information',
    text: 'We may use your information to:',
    listItems: [
      'Provide, operate, and maintain our services.',
      'Improve, personalize, and expand our services.',
      'Develop new products, services, features, and functionality.',
      'Product marketing and promotion (directly or through one of our partners) to provide you with updates and other information relating to the website.',
      'Process your transactions and payments.',
      'Find and prevent fraud.',
    
      
    ],
  },
  {
    title: 'Disclosure of Your Information',
    text: 'We may share information we have collected about you in certain situations:',
    listItems: [
      'If we reorganise or sell all or a portion of our assets, undergo a merger, or are acquired by another entity.',
      'When required by law, subpoena, or other legal process, or if we believe in good faith that such action is necessary to:',
      'Enforce our legal rights or protect the security or integrity of our services.',
      'As per our privacy policy, we will retain your personal information only as long as it is necessary to fulfil the purposes for which it was collected.',
    ],
  },
  {
    title: 'Data Security',
    text: 'We have a proper system of organizational and technical security measures in place to protect your data and privacy. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.',
 
  },
  {
    title: 'Changes to This Privacy Policy',
    text: "We may update this Privacy Policy in accordance with the laws and regulations. The updated version will be indicated by an updated 'last updated' date and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.",
 
  },

];
export const return__refund: PrivacyPolicyItem[] = [
  {
    title: '',
    text: 'Can I return my Interiorfilm.ae product if I change my mind?',
    listItems: [
      'Yes, you may return any item within 14 days of receiving your order from us, providing the item is unopened, unused and with all original packaging intact.',
      'To initiate a return, please send an email to customer service at cs@interiorfilm.ae, explaining clearly why you would like to return the item. Please also ensure your order number is included.',
      'Our team will get back to you within 24hrs and guide you through the return process and provide you with a return authorization number (RAN). Returns cannot be accepted without the RAN.',
      'Once in receipt of your return, if deemed acceptable, we will issue the refund right away. The time for the refund to reflect in your account again varies from card issuer to card issuer, but from our side, it will be executed within 24 hours of an approved return.',
  
    ],
  },
  {
    title: 'What if an item is defective?',
    text: '',
    listItems: [
      "In the rare event that your received item is deemed faulty, please follow the instructions above, except add FAULTY before the order number in the subject line. Your return will be treated as a priority and replacement sent out asap.",
      "If the item has developed a fault after being installed, we understand that it won’t be in it’s unused state and would ask you to contact cs@interiorfilm.ae and we’ll arrange a site visit by one of our experienced team members. ",
    ],
  },
  {
    title: 'Who covers the return shipping costs?',
    text: 'If you need to return an item you bought from us, please note that you will have to pay for the return shipping unless the item is defective or we made a mistake.',
    listItems: [
      "We strongly recommend using a trackable shipping service, to make the return smoothly. This will help you and Interiorfilm.ae to see where your package is on its journey. This method will make sure the product arrives back on time.",
      "If something happens to the item on the way, or if the item is lost by the courier, we cannot be held responsible and will not be able to offer a refund.",
    ],
  },
  {
    title: 'Products Not Eligible for Replacement or Refund',
    text: 'At Interiorfilm.ae, we have an aim to make sure of your satisfaction with every purchase. However, there are certain products and eligibility criteria that we are unable to replace or refund. Please review the list below for details:',
    listItems: [
      "Items sold during sales and promotion period",
      "Items not in original condition, used or damaged",
    ],
  },
  {
    title: 'Refund Process',
    text: "We will initiate the refund process immediately once we receive the product at Interiorfilm.ae's warehouse. The refund will be processed based on the original mode of payment for the order:",
  },
  {
    title: '',
    text: "For orders paid by credit/debit card, refunds will be credited back to the original payment method within 1 working days upon receipt of the returned product. Please note that once the refund has been initiated, the time taken for the funds to reach your account varies between banks. We will send you a confirmation when we have completed everything from our side in case you need to take it up with your bank or card issuer.",
  },
  {
    title: '',
    text: "For orders paid by cash, we will refund via bank deposit or transfer upon providing the necessary details.",
  
  },
  {
    title: 'Contact Us:',
    text: "If you have any questions or concerns about our return and refund policy, please contact us at cs@interiorfilm.ae. Our customer service team is available to assist you from 9 am to 6 pm, Monday to Saturday (excluding public holidays).",
   
  },
  {
    text: "Thank you for choosing Interiorfilm.ae.",
  },
];
export const ShipmentPolicydata: PrivacyPolicyItem[] = [

  {
    title: 'Free Shipping On Orders Over 10 Meters',
    text: 'If your order exceeds over 10 meters and you are located inside the UAE, you will be offered free standard delivery at checkout. ',
  },
  {
    text: 'If your order is below 10 meters, we will offer standard delivery anywhere in the UAE for only AED 30. ',
  },
  {
    text: "CASH ON DELIVERY: NOT AVAILABLE",
  },

];

export const Terms_Conditions: PrivacyPolicyItem[] = [

  {
    title: '',
    text: "Please carefully consider this agreement before using this website. Yellowzone Trading LLC has all the rights to amend this site, its services, T&Cs and Delivery Policy, Refund and Return Policy, and Shipping Policy. Also, Yellowzone Trading LLC has all the right to modify the services offered on the website and these conditions at any moment without previous notice.",
  },
  {
    title:"1) Introduction:",
    text: "The Yellowzone Trading LLC Terms and Conditions ('Terms') considered as a legal agreement between you and ('User,' 'you,' or 'your') and Yellowzone Trading LLC, Inc. ('Yellowzone Trading LLC,' 'Company,' 'we,' 'our,' or 'us'). These terms and conditions, incorporated and presented after careful consideration, govern and secure your use of our website located at www.interiorfilm.ae ('website'), including all content that is posted, functionality, and services offered on or through the website by Yellowzone Trading LLC.",
  },
  {
    text: "Please carefully read these Terms and Conditions before you start using the website and the services offered. Our aim is to make this legal agreement as readable as possible.",
  },
  {
    text: "By accessing or using the website to buy and use the services by Yellowzone Trading LLC, you are bound to accept these terms and conditions. Also, it will be considered as a proof that you agree to the terms, conditions and notices contained on the website or referenced herein. If you do not agree to these terms, you must not access or use the website and its content or services provided by Yellowzone Trading LLC.",
  },
  {
    text: "To contact us please email us at: cs@interiorfilm.ae ",
  },
  {
    title:"2) By using our website (www.interiorfilm.ae.ae) and services, you accept these terms:",
    text: "By using our website, you agree and confirm that you accept these terms and our Privacy Policy, and are bound to comply with them, incorporated here by reference. If you do not feel comfortable with these terms and conditions and wish to disagree, we respect your decision.",
  },
  {
    text: "These T&Cs take effect from the date you first access our website. In addition to the general T&Cs mentioned in this page, you can also refer to Yellowzone Trading LLC’s Delivery Policy, Refund & Return Policy, Shipping Policy before making any purchase from our website (www.interiorfilm.ae.ae). Please be advised that by agreeing to these general T&Cs, you are accepting the other T&Cs outlined in the Delivery Policy, Refund & Return Policy and Shipping Policy. These policies are all part of a legally binding contract between Yellowzone Trading LLC and “you” (user of this website and services).",
  },
  {
    text: "By agreeing to these terms, you represent and warrant that you are of legal age to use the website and the services provided by Yellowzone Trading LLC, under the law of the United Arab Emirates to form a binding contract with Yellowzone Trading LLC.",
  },
  {
    title:"3) Updates of Terms and Services",
    text: "We may update or revise these Terms at any time at our sole discretion.",
  },
  {
    text: "Please be advised that any modifications made to the Terms and Conditions of our website (www.interiorfilm.ae.ae) will take effect immediately once they are updated. These changes and updates will apply to all future access and use of our website and services mentioned. By continuing to use the website after the revised terms have been posted, you are indicating your acceptance and agreement to the changes and updated T&Cs, Delivery Policy, Refund and Return Policy, and Shipping Policy.",
  },
  {
    text: "We strongly recommend you to regularly review and have a clear understanding of these Terms and Conditions that govern your use of the website and its services. Whenever these terms are updated, we will update the 'Last Updated' date at the top of this document.",
  },  
  {
    title:"4) User Conduct",
    text: "It is imperative to adhere and comply with the terms of use when accessing the website and its services. Users must avoid the following in order to access and engage with Yellowzone Trading LLC’s website and its services in future.",
    listItems: [
      "Any action that violates any applicable federal, state, local, or international law or regulation.",
      "The transmission, reception, posting, downloading, use, or reuse of any content that does not conform to the guidelines for acceptable submissions provided in these terms of service.",
      "The sending or arranging for the sending of any promotional or advertising materials.",
      "Impersonating the company, an employee of the company, another user, or any other entity or persona, including the use of email addresses associated with any of the aforementioned.",
    ],
  }, 
   {
    text: "Subject to these Terms, Yellowzone Trading LLC grants you a non-transferable, non-exclusive, revocable, limited license to access and use the website exclusively for your personal, non-commercial use.",
  }, 
  
  {
    text: "It is advised that users abide by these rules to avoid any legal consequences or violation of the terms of service.",
  }, 
];

export const detaildot = [
  {specsDetails:"Lorem ipsum dolor sit dsg"},
  {specsDetails:"Aliquam tincidunt mau"},
  {specsDetails:"Cras ornare tristique elit"},
  {specsDetails:"Lorem ipsum dolor sit dsg"},
  {specsDetails:"Fusce pellentesque"},
  {specsDetails:"Cras iaculis ultricies nulla."},
  {specsDetails:"Lorem ipsum dolor sit dsg"},
  {specsDetails:"Aliquam tincidunt mau"},
  {specsDetails:"Cras ornare tristique elit"},
  {specsDetails:"Lorem ipsum dolor sit dsg"},
  {specsDetails:"Fusce pellentesque"},
  {specsDetails:"Cras iaculis ultricies nulla."},
]
export const collapseData = [
  {
    title: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR',
    content: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR LOREM IPSUM DOLOR SIT AMET, CONSECTETUR...',
  },
  {
    title: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR',
    content: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR LOREM IPSUM DOLOR SIT AMET, CONSECTETUR...',
  },
  {
    title: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR',
    content: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR LOREM IPSUM DOLOR SIT AMET, CONSECTETUR...',
  },
];
