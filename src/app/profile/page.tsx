"use client"
import Container from 'components/Layout/Container/Container';
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppSelector } from "components/Others/HelperRedux";
import { uploadPhotosToBackend } from 'utils/helperFunctions'
import { IMAGE_INTERFACE } from 'types/interfaces'
import axios from 'axios';
import Cookies from 'js-cookie';

import { loggedInUserAction } from '../../redux/slices/userSlice';
import { useAppDispatch } from "components/Others/HelperRedux";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import UserprotectedRoute from 'hooks/AuthHook'


const Profile: React.FC = () => {
  const { loggedInUser }: any = useAppSelector(state => state.userSlice);
  const router = useRouter()
  const dispatch = useAppDispatch();
  const initialFormData = { fullName: loggedInUser ? `${loggedInUser.fullName}` : "dfdfdfdf" };

  const [formData, setFormData] = useState(initialFormData);
  const [profilePhoto, setProfilePhoto] = useState<IMAGE_INTERFACE[]>([]);
  const token = Cookies.get('user_token');

  useEffect(()=>{
    if(!token)
    {
      router.push('/login')
    }
  },[token])

  const initialValue = {
    name: loggedInUser ? `${loggedInUser.email}` : "",
  };


  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      let imageUrl: any = await uploadPhotosToBackend([file])

      imageUrl ? setProfilePhoto(imageUrl) : null

    }
  };

  const AddminProfileTriggerHandler = async () => {
    try {
      let user: any = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getuserHandler`, {
        headers: {
          "token": token
        }
      })
      dispatch(loggedInUserAction(user.data.user))
    } catch (err: any) {
      console.log(err, "err")
    }
  }

  const adminUpdateHandler = async () => {
    try {
      let initialFormData: any = {
        email: loggedInUser.email,
        fullName: formData.fullName,

      };
      if (profilePhoto.length > 0) {
        initialFormData = {
          ...initialFormData,
          ProfilePhoto: profilePhoto[0],
        };
      }


      if (loggedInUser) {
        let { fullName, ProfilePhoto, ...extractedData } = loggedInUser;
        console.log(fullName, ProfilePhoto ,"loggedInUser")
        if (!initialFormData.fullName) throw new Error('Full name is required or Full is required')
        let combinedData = {
          ...initialFormData,
          ...extractedData
        };

        let response: any = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/userEdit/${loggedInUser._id}`, combinedData, {
          headers: {
            "token": token
          }
        }
        );

        if (response.status === 200) {
          console.log("Admin updated successfully:", response.data);
        } else {
          console.error("Failed to update admin");
        }
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await adminUpdateHandler();
      await AddminProfileTriggerHandler()
    }
    catch (err) {
      console.log(err, "err")
    }
  };



  const logoutHhandler = () => {
    try {
      Cookies.remove('user_token');
      router.push('/login')

    } catch (err) {
      console.log(err)
    }

  }


  useLayoutEffect(() => {
    if (loggedInUser && loggedInUser.ProfilePhoto) {
      Object.keys(loggedInUser.ProfilePhoto).length > 0 ? setProfilePhoto([loggedInUser.ProfilePhoto]) : null
    }
  }, [loggedInUser]);
  return (
    <>
      <Overlay title='Profile' />
      <Container className='mt-10'>
        <div className='flex flex-wrap md:flex-nowrap md:gap-4'>
          <div className='p-2 rounded-md shadow w-full md:w-4/12 hidden md:block'>
            <div className='space-y-2 flex flex-col w'>
              <Link className='border border-gray p-2 w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/wishlist"}>Wishlist</Link>
              <Link className='border border-gray p-2 w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/order-history"}>Order History</Link>
              <Link className='border border-gray p-2 w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' href={"/about"}>About Us</Link>
              <p className='border border-gray p-2 w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold' onClick={logoutHhandler}>Log Out</p>
            </div>
          </div>
          <div className='p-4 rounded-md shadow w-full md:w-8/12'>
            <div>
              <div className="mb-4 flex items-center gap-3">

                {
                  profilePhoto.map((profilePhoto) => {
                    return (
                      <>

                        <div className="h-14 w-14 rounded-full overflow-hidden">
                          <Image
                            src={(profilePhoto && profilePhoto.imageUrl) ? profilePhoto.imageUrl : '/images/dummy-avatar.jpg'}
                            width={55}
                            height={55}
                            alt="User"
                          />
                        </div>


                        <div>
                          <span className="mb-1.5 text-black dark:text-white">
                            Edit your photo
                          </span>
                          <span className="flex gap-2.5">
                            <button className="text-sm hover:text-primary text-black dark:text-white" type="button" onClick={() => ImageRemoveHandler(profilePhoto?.public_id ? profilePhoto?.public_id : '', setProfilePhoto)}>
                              Delete
                            </button>
                            <button className="text-sm hover:text-primary text-black dark:text-white" type="button" >
                              Update
                            </button>
                          </span>
                        </div>

                      </>

                    )

                  })

                }





              </div>
              <div className="relative mb-4 h-36 rounded-md border-dashed border-stroke dark:border-strokedark bg-gray dark:bg-meta-4">
                <input

                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center">
                  <span className="my-2 inline-block rounded-full bg-white border-primary border  p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#c72031" d="M10 16v-5h4v5h5l-7 7-7-7h5zm-4-16v2h12v-2h-12zm-4 4h20v2h-20v-2z" />
                    </svg>
                  </span>
                  <p className="text-black dark:text-white text-sm">
                    <span className="text-primary dark:text-white text-sm">Click to upload</span> or drag and drop
                  </p>
                  <p className="mt-1.5 text-black dark:text-white text-sm">SVG, PNG, JPG or GIF</p>
                  <p className="text-black dark:text-white text-sm">(max, 800 X 800px)</p>
                </div>
              </div>

            </div>



            <div className="col-span-5 xl:col-span-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Personal Information
                  </h3>
                </div>
                <div className="p-7">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                      <div className="mb-5.5 w-full">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Full Name
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-5.5 w-full">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4 text-black dark:text-white">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            value={initialValue.name}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>


                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </>
  );
}

export default UserprotectedRoute(Profile);