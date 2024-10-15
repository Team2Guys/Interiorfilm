"use client"
import AddAds from 'components/AddAds/AddAds'
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb'
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout'
import AdsTable from 'components/Dashboard/Tables/AdsTable'
import React, { useState } from 'react'

const AdsProduct = () => {
    
  const [menuType, setMenuType] = useState<string>("AdsData")
  return (
    <DefaultLayout>
    <Breadcrumb pageName={menuType} />
    {
      menuType === "AdsData" ?
    <div className="flex flex-col gap-10">

      <AdsTable setMenuType={setMenuType}/>

    </div>
    
    : <AddAds setMenuType={setMenuType}  />
    }

  </DefaultLayout>
  )
}

export default AdsProduct