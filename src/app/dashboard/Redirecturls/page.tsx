
import React from "react";
import MainPage from "./MainPage";
import { fetchRedirectUrl } from "utils/fetch";

const Page = async () => {
 const redirect= await fetchRedirectUrl()
  return <MainPage Redirecturls={redirect} />;
};

export default Page;
