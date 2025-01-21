'use server'
import ProductsTable from '@/components/ProductsTable/ProductsTable'
import Title from '@/components/Title/Title'
import React from 'react'
import ToastMessage from '@/components/ToastMessage/ToastMessage'
import GetUserCookie from '@/components/GetUserCookie/GetUserCookie'
import SearchField from '@/components/SearchField/SearchField'

export default async function Home() {
    const user = await GetUserCookie();
  return (
    <>
      <div className="dark:text-white main pt-[20px] overflow-hidden relative">
        <div className="flex flex-col mb-4 w-full md:flex-row md:items-center md:mb-0 text-center md:justify-between">
          <Title title={'Products'} />
          { user &&  <SearchField/>}
        </div>
        <ProductsTable user={user}/>
        <ToastMessage/>
      </div>
    </>
  )
}
