'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "components/Loader/Loader";
import Cookies from 'js-cookie';
import axios from "axios";

import { useAppSelector } from "components/Others/HelperRedux";
import { loggedInUserAction } from '../redux/slices/userSlice';
import { useAppDispatch } from "components/Others/HelperRedux";

function UserprotectedRoute(WrappedComponent: any) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const AddminProfileTriggerHandler = async (token: string | undefined | null) => {
      try {
        if(!token) return
        let user: any = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getuserHandler`, {
          headers: {
            "token": token
          }
        });
        dispatch(loggedInUserAction(user.data.user));
      } catch (err: any) {
        console.log(err, "err");
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      const token = Cookies.get("user_token");

      if (!token) {
        router.push("/login");
        setTimeout(() => {
          setLoading(false);
          
        }, 1000);
      } else {
        AddminProfileTriggerHandler(token);
      }
    }, [router]);
console.log(loading, "loading")
    if (loading) {
      return (
        <div
          style={{
            background: "#FFF",
            zIndex: 1111,
            alignItems: "center",
            display: "flex",
            height: "100vh",
            width: "-webkit-fill-available",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  return Wrapper;
}

export default UserprotectedRoute;
