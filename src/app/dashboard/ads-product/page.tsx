
import { getAlladsproducts } from "config/fetch";
import AddProd from "./AddProd";


const Products = async() => {
const products = await getAlladsproducts()

 
  return (
    <AddProd products={products}/>
  );
};

export default Products

