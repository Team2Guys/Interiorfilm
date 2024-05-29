'use client'

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  const darkModehandler =()=>{
    const className = "dark";
    const ISSERVER = typeof window === "undefined"
if(!ISSERVER){
  const bodyClass = window.document.body.classList;

  colorMode === "dark" ? bodyClass.add(className) : bodyClass.remove(className);

}
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    darkModehandler()
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
