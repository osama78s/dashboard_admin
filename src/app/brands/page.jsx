import BrandsTable from '@/components/BrandsTable/BrandsTable';
import GetUserCookie from '@/components/GetUserCookie/GetUserCookie';
import SearchOnBrands from '@/components/SearchOnBrands/SearchOnBrands';
import Title from '@/components/Title/Title';
import ToastMessage from '@/components/ToastMessage/ToastMessage';
import React from 'react'

export default async function Brands() {
    const user = await GetUserCookie();
    return (
        <>
            <div className="dark:text-white main pt-[20px] overflow-hidden relative">
            <div className="flex flex-col mb-4 w-full md:flex-row md:items-center md:mb-0 text-center md:justify-between">
                    <Title title={'Brands'} />
                    { user && <SearchOnBrands token={user.token} /> }
                </div>
                <BrandsTable user={user} />
                <ToastMessage />
            </div>
        </>
    )
}
