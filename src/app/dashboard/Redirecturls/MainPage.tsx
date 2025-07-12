"use client"
import React, {useState } from 'react'
import { RedirectUrls } from 'types/interfaces';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import dynamic from 'next/dynamic';
const AddRedirecturl = dynamic(() => import("./AddRedirecturl"), { ssr: false });
const ViewRedirecturl = dynamic(() => import("./ViewRedirecturl"), { ssr: false });

function MainPage({ Redirecturls }: { Redirecturls: RedirectUrls[] }) {
    const [RedirectUrls, setRedirectUrls] = useState<RedirectUrls | undefined>();
    const [selecteMenu, setselecteMenu] = useState<string>("All RedirectUrls");

console.log(Redirecturls,"RedirecturlsRedirecturls",RedirectUrls)

    return (

        <DefaultLayout>
            {selecteMenu == "Add RedirectUrls" ?

                <AddRedirecturl setRedirectUrls={setRedirectUrls} setselecteMenu={setselecteMenu}  RedirectUrls={RedirectUrls} /> :
                <ViewRedirecturl Redirecturls={Redirecturls}  setRedirectUrls={setRedirectUrls} setselecteMenu={setselecteMenu} />
                }

        </DefaultLayout>

    )
}

export default MainPage