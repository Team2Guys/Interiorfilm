
import * as Yup from 'yup';
import PRODUCTS_TYPES, { Category, FormValues, ITabbyList, ITabbyPayList, ITamaraList } from 'types/interfaces'
import { PrivacyPolicyItem } from 'types/types';
import masterCard from './../../public/images/payment-icons/Mastercard-Logo.png'
import viseCard from './../../public/images/payment-icons/visacard-logo.png'
import gPayCard from './../../public/images/payment-icons/googlepay-logo.png'
import applypayCard from './../../public/images/payment-icons/apply-pay-black.png'
import tabbyLogo from "./../../public/images/payment-icons/tabby-logo.png";
import tamaraLogo from "./../../public/images/payment-icons/tamara-logo.png";
import icon1 from './../../public/images/enviroment-icon/icon1.png'
import icon2 from './../../public/images/enviroment-icon/icon2.png'
import icon3 from './../../public/images/enviroment-icon/icon3.png'
import icon5 from './../../public/images/enviroment-icon/icon5.png'
import icon6 from './../../public/images/enviroment-icon/icon6.png'
import oil from './../../public/images/enviroment-icon/oil.png'
import icon7 from './../../public/images/enviroment-icon/icon7.png'
import icon8 from './../../public/images/enviroment-icon/icon8.png'
import icon9 from './../../public/images/enviroment-icon/icon9.png'
import { StaticImageData } from 'next/image';
import { ACCORDINTYPES } from 'types/faq';

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

export const withoutVariation = [
  { name: "totalStockQuantity", type: 'number' },
];


export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('required'),
  custom_url: Yup.string().required('required')
});


export const categoryInitialValues: Category = {
  name: '',
  description: "",
  Meta_Title: "",
  Meta_Description: "",
  Canonical_Tag: "",
  custom_url: "",
  breadcum: ""
};



/* eslint-disable */
export const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};
/* eslint-enable */
export const AddProductvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string().required('Required'),
  salePrice: Yup.number()
    .min(1, "Minimum sales price must be at least 1")
    .required('Required'),
    custom_url: Yup.string().required('Required'),
  // purchasePrice: Yup.number()
  //   .min(1, "Must be at least 1")
  //   .required('Required'),


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
  totalStockQuantity: 0,
  modelDetails: [],
  spacification: [],
  category: "",
  code: "",
  Meta_Title: "",
  Meta_Description: "",
  URL: "",
  Canonical_Tag: "",
  Images_Alt_Text: "",
 breadcum: "",
 custom_url: "",
};


export const privacyPolicyData: PrivacyPolicyItem[] = [
  {
    title: 'Privacy Policy',
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


export const tabbyfeature: ITabbyList[] = [
  { id: 1, para: 'No interest. No fees.' },
  { id: 2, para: 'Trusted by 4,5m+ customers.' },
  { id: 3, para: 'Shariah-compliant.' },
];

export const tabbyhowitwork: ITabbyList[] = [
  { id: 1, para: 'Choose Tabby at checkout' },
  { id: 2, para: 'Enter your information and add your debit or credit card.' },
  { id: 3, para: 'Your first payment is taken when the order is made.' },
  { id: 4, para: 'We will send you a reminder when your next payment is due' },
];

export const tabbypayicon: ITabbyPayList[] = [
  { id: 1, imageUrl: masterCard },
  { id: 2, imageUrl: viseCard },
  { id: 3, imageUrl: gPayCard },
];

export const tamarawhy: ITamaraList[] = [
  { id: 1, para: 'Sharia-compliant' },
  { id: 2, para: 'No late fees' },
  { id: 3, para: 'Quick and easy' },
];
export const tamaralist: ITamaraList[] = [
  {
    id: 1,
    para: 'Payment options availability may vary based on your order value and Tamara record.',
  },
  { id: 2, para: 'Subject to terms and conditions.' },
  { id: 3, para: 'Tamara is Sharia-compliant.' },
  { id: 4, para: 'Eligible for customers in United Arab Emirates.' },
  {
    id: 5,
    para: 'Your final payment plan may vary depending on your credit history.',
  },
];

export const tamarafeature: ITamaraList[] = [
  {
    id: 1,
    title: 'Split in 4',
    para: 'Pay a fraction now and the rest in 3 payments over the next 3 months. No late fees, shariah-compliant!*',
  },
  {
    id: 2,
    title: 'Pay in Full',
    para: 'Pay the full amount today and enjoy exclusive perks with Tamara!*',
  },
];


export const PaymentMethods: ITabbyPayList[] = [
  { id: 1, imageUrl: viseCard },
  { id: 2, imageUrl: masterCard },
  { id: 3, imageUrl: applypayCard },
  { id: 4, imageUrl: gPayCard },
];
export const FooterPaymentMethods: ITabbyPayList[] = [
  { id: 1, imageUrl: viseCard },
  { id: 2, imageUrl: masterCard },
  { id: 3, imageUrl: applypayCard },
  { id: 4, imageUrl: gPayCard },
  { id: 5, imageUrl: tabbyLogo },
  { id: 6, imageUrl: tamaraLogo },
];



export const EnvironmentData: { title: string, icon: StaticImageData }[] = [
  { title: '100% waterproof', icon: icon1 },
  { title: 'Low-Temperature Resistance', icon: icon9 },
  { title: 'Eco-Friendly Material ', icon: icon8 },
  
  { title: 'Stain resistance', icon: icon6 },
  { title: 'Scratch Resistance', icon: icon2 },
  
  { title: 'Fully Wear Resistance', icon: icon3 },
  { title: 'Ductile Reusable', icon: icon5 },
  { title: '100% Oil-proof', icon: oil },
  { title: 'Abrasion Resistance', icon: icon7 },

];

export const navarlink = [
  { ref: "", title: "Home" },
  { ref: "metal-series", title: "Metal Series" },
  { ref: "symphony-series", title: "Symphony Series" },
  { ref: "skin-touch-series", title: "Skin Touch Series" },
  { ref: "plain-series", title: "Plain Series" },
  { ref: "marble-series", title: "Marble Series" },
  { ref: "leather-series", title: "Leather Series" },
  { ref: "cement-grey-series", title: "Cement Grey Series" },
  { ref: "fabric-series", title: "Fabric Series" },
  { ref: "wood-grain-series", title: "Wood Grain Series" },
  { ref: "accessories", title: "accessories Series" },
  { ref: "about", title: "About Us" },
  { ref: "contact", title: "Contact Us" },
  { title: "FAQs", ref: "frequently-asked-questions" },
];
export const footerlink = [
  { ref: "metal-series", title: "Metal Series" },
  { ref: "symphony-series", title: "Symphony Series" },
  { ref: "skin-touch-series", title: "Skin Touch Series" },
  { ref: "plain-series", title: "Plain Series" },
  { ref: "marble-series", title: "Marble Series" },
  { ref: "leather-series", title: "Leather Series" },
  { ref: "cement-grey-series", title: "Cement Grey Series" },
  { ref: "fabric-series", title: "Fabric Series" },
  { ref: "wood-grain-series", title: "Wood Grain Series" },
  { ref: "accessories", title: "Accessories Series" },


];

export const CountryCode = [
  { title: "+971", code: "+971" },
  { title: "+1", code: "+1" },
  { title: "+61", code: "+61" },
  { title: "+49", code: "+49" },
  { title: "+33", code: "+33" },
  // Add more country codes as needed
];



export const AccordionsArray: ACCORDINTYPES[] = [
  {
    Title: "What is architectural vinyl film wrap?",
    Description: "Architectural vinyl film wrap is a high-quality, adhesive-backed film designed to cover and transform surfaces such as doors, kitchen counters, and furniture. It offers a cost-effective alternative to traditional remodeling by enhancing aesthetics without extensive renovations.",
  },
  {
    Title: "What surfaces can I use vinyl film on?",
    Description: "Our vinyl films are suitable for a variety of surfaces, including doors, kitchen counters, cabinets, walls, furniture, and backsplashes.",
  },
  {
    Title: "Is vinyl film durable?",
    Description: "Yes, our architectural vinyl films are designed to be durable and long-lasting. They are resistant to scratches, stains, and moisture, making them ideal for high-traffic areas like kitchens and bathrooms.",
  },
  {
    Title: "Can I install the vinyl film myself?",
    Description: "While many customers choose to install the film themselves, we recommend hiring a professional for the best results, especially for larger surfaces or intricate designs. We provide detailed installation instructions to assist DIY enthusiasts.",
  },
  {
    Title: "How do I clean and maintain vinyl film?",
    Description: "To maintain the appearance of your vinyl film, simply wipe it down with a soft cloth and mild soap. Avoid abrasive cleaners and scrubbing pads, as they can damage the surface.",
  },
  {
    Title: "Can I remove the vinyl film later?",
    Description: "Yes, our vinyl films are designed for easy removal without damaging the underlying surface. If you decide to change the look of your space, you can safely peel off the film.",
  },
  {
    Title: "What colors and textures are available?",
    Description: "We offer a wide range of colors, patterns, and textures to suit your design needs. From sleek matte finishes to wood and stone textures, you can find the perfect match for your style.",
  },
  {
    Title: "How do I order vinyl film?",
    Description: "You can browse our selection on Interiorfilm.ae and place your order directly through the website. If you need assistance, feel free to contact our customer service team.",
  },
  {
    Title: "What is the delivery time for my order?",
    Description: "Delivery times for most addresses in mainland UAE is 24-48 hours. For outlying areas or off shore areas, please consider an extra day or 2. ",
  },
  {
    Title: "Do you offer custom sizes or designs?",
    Description: "Our material is delivered in roll width of 122cm but if you have a custom requirement, we can check with the factory if it’s possible. There will be a minimum order requirement but this can vary from style to style. .",
  },
  {
    Title: "What if I have more questions?",
    Description: "If you have any additional questions or need further assistance, feel free to reach out to our customer service team via our contact page or through email. We're here to help!",
  },
];

export const specificProductCodesByCategory: Record<string, string[]> = {
  "plain-series":        ["KH9003", "KH9025", "KH9022"],
  "cement-grey-series":  ["KS5004", "KS5007", "KS5005"],
  "wood-grain-series":   ["CA162",  "CA164",  "CA126"],
  "marble-series":       ["KS6007", "KS6004", "KS6011"],
  "metal-series":        ["KW006",  "KW012",  "KW013"],
  "fabric-series":       ["KS8005", "KS8006", "KS8002"],
  "skin-touch-series":   ["KH9603", "KH9612", "KH9611"],
  "leather-series":      ["KS7715", "KS7710", "KS7701"],
  "accessories":         ["AS1541", "AS122",  "AS789"],
};

export const specificImageIndexByCode: Record<string, number> = {
  KH9615: 0,
  KH9603: 1,
  KS5005: 2,
  KS5004: 2,
  KS5007: 1,
  KH9025: 2,
  KH9022: 2,
  KS6007: 2,
  KS6004: 0,
  KS6011: 2,
  CA126:  2,
  KS5002: 2,
  KW013:  1,
  KS8005: 2,
  KS8002: 2,
  KS7701: 2,
};
export const sortProductsByCode = (products: PRODUCTS_TYPES[]): PRODUCTS_TYPES[] => {
  return products.sort((a, b) => {
    return (a.code ?? "").localeCompare(b.code ?? "", undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
};

export const ShipmentPolicydata: PrivacyPolicyItem[] = [

  {
    title: 'Free shipping throughout mainland UAE on all orders above AED 250',
    text: 'If your order exceeds Above AED 250 and you are located inside the UAE, you will be offered free standard delivery at checkout. ',
  },
  {
    text: 'If your order is below AED 250, we will offer standard delivery anywhere in the UAE for only AED 20. ',
  },
  {
    text: "CASH ON DELIVERY: NOT AVAILABLE",
  },

];
