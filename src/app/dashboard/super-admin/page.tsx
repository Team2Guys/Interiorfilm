"use client"
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import Container from 'components/Layout/Container/Container';
import AllAdmin from 'components/SuperAdmin/AllAdmin/AllAdmin';
import CreateAdmin from 'components/SuperAdmin/CreateAdmin/CreateAdmin';
import React, { useState } from 'react'

const SuperAdmin = () => {
    const [selecteMenu, setselecteMenu] = useState<string | null | undefined>('AllAdmin');
  return (
    <>
    <DefaultLayout>
    <Breadcrumb pageName="Super Admin" />
    <div className='mt-10'>
        {selecteMenu == "AllAdmin" ?
        <AllAdmin setselecteMenu={setselecteMenu}/>
        :
        <CreateAdmin setselecteMenu={setselecteMenu}/>
        
        }
    </div>
    </DefaultLayout>
      </>
  )
}

export default SuperAdmin