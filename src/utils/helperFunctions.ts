import axios, { AxiosResponse,AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";


const token = Cookies.get("2guysAdminToken");
const superAdminToken = Cookies.get("superAdminToken");
let finalToken = token ? token : superAdminToken;

export const uploadPhotosToBackend = async (files: File[]): Promise<any[]> => {
    const formData = new FormData();

    if (files.length === 0) throw new Error("No files found");

    try {
      for (const file of files) {
        formData.append("image", file);
      }

      const response: AxiosResponse<any> = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/addProductImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response from the backend
      return response.data?.productsImageUrl;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };

  const headers = {
    token: finalToken,
  };

  
 export const ImageRemoveHandler = async (imagePublicId: string,setterFunction: any) => {


    const requestConfig: AxiosRequestConfig = {data: { imageUrl: imagePublicId },headers: headers,};
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/removeProductImage`,requestConfig);
      console.log("Image removed successfully:", response.data);
      setterFunction((prev: any) =>
        prev.filter((item: any) => item.public_id != imagePublicId)
      );
    } catch (error) {
      console.error("Failed to remove image:", error);
    } finally{
           setterFunction((prev: any) =>
        prev.filter((item: any) => item.public_id != imagePublicId)
      );
    }
  };

 export const formatCategoryName = (slug?: string) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};