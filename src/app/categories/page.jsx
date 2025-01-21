'use server'
import CategoriesTable from '@/components/CategoriesTable/CategoriesTable';
import GetUserCookie from '@/components/GetUserCookie/GetUserCookie';
import SearchOnCategories from '@/components/SearchOnCategories/SearchOnCategories';
import Title from '@/components/Title/Title';
import ToastMessage from '@/components/ToastMessage/ToastMessage';
import React from 'react'

export default async function Categories() {
    const user = await GetUserCookie();
    return (
        <>
            <div className="dark:text-white main pt-[20px] overflow-hidden relative">
            <div className="flex flex-col mb-4 w-full md:flex-row md:items-center md:mb-0 text-center md:justify-between">
                  <Title title={'Categories'} />
                   { user && <SearchOnCategories token={user.token}/> }
                </div>
                <CategoriesTable user={user} />
                <ToastMessage />
            </div>
        </>
    )
}
