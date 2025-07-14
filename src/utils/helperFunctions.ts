import axios, { AxiosResponse,AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import React from "react";


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


  console.log(finalToken, "finalToken")
    const requestConfig: AxiosRequestConfig = {data: { imageUrl: imagePublicId },headers: headers,};
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/removeProductImage`,requestConfig);
      console.log("Image removed successfully:", response.data);
      setterFunction((prev: any) =>
        prev.filter((item: any) => item.public_id != imagePublicId)
      );
    } catch (error) {
      console.error("Failed to remove image:", error);
    }
  };

 export const formatCategoryName = (slug?: string) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const DateFormatHandler = (input: Date | string) => {
  if (!input) return "Not available";

  const parsedDate = typeof input === "string" ? new Date(input) : input;

  if (isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(parsedDate).toUpperCase();
};

export function dragImageSort<T>(
  list: T[],
  dragIndex: number | null,
  hoverIndex: number | null
): T[] {
  if (
    dragIndex === null ||
    hoverIndex === null ||
    dragIndex === hoverIndex
  ) {
    return list;
  }

  const updated = [...list];
  const temp = updated[dragIndex];
  updated[dragIndex] = updated[hoverIndex];
  updated[hoverIndex] = temp;

  return updated;
}


export function handleImageDragSort<T>(
  items: T[],
  dragIndex: number | null,
  hoverIndex: number | null,
  setter?: (items: T[]) => void  // eslint-disable-line
): T[] {
  const sorted = dragImageSort(items, dragIndex, hoverIndex);

  if (setter) {
    setter(sorted);
  }

  return sorted;
}

export function handleFieldChange<T>(
  index: number,
  field: keyof T,
  value: any,
  arrayState: T[] | null | undefined,
  setArrayState:
    | React.Dispatch<React.SetStateAction<T[]>>
    | React.Dispatch<React.SetStateAction<T[] | null>>
    | React.Dispatch<React.SetStateAction<T[] | null | undefined>>
): void {
  if (!arrayState) return;

  const updatedArray = arrayState.map((item, i) =>
    i === index ? { ...item, [field]: value } : item
  );

  setArrayState(updatedArray as any); // safely assert for now
}