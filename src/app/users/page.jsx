'use server'
import GetUserCookie from '@/components/GetUserCookie/GetUserCookie'
import SearchOnUsers from '@/components/SearchOnUsers/SearchOnUsers';
import Title from '@/components/Title/Title';
import ToastMessage from '@/components/ToastMessage/ToastMessage';
import UserPagination from '@/components/UserPagination/Userpagination';
import UsersTable from '@/components/UsersTable/UsersTable'
import React from 'react'

export default async function Users() {
  const user = await GetUserCookie();
  return (
    <div className='relative'>
      <ToastMessage />
      <div className="dark:text-white py-[10px]">
      <div className="flex flex-col mb-4 w-full md:flex-row md:items-center md:mb-0 text-center md:justify-between">
          <Title title={'Users'} />
          { user && <SearchOnUsers token={user.token} /> }
        </div>
        <UsersTable token={user.token} />
        <UserPagination user={user} />
      </div>
    </div>
  )
}
