import { FAQ } from "./faq";

export type FaqItem = {
  active: number | null;
  handleToggle: any;
  faq: FAQ;
};
