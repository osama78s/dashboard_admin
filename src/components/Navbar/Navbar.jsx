// import React, { useEffect, useState } from 'react'
import ButtonThem from '../ButtonThem/ButtonThem'
import UserInformation from '../UserInfornation/UserInformation'
import Image from 'next/image'
import blackLogo from '../../../public/825159_preview.jpg';
import GetUserCookie from '../GetUserCookie/GetUserCookie'
import ListIcon from '../ListIcon/ListIcon';
import Link from 'next/link';
export default async function Navbar() {
  const user = await GetUserCookie();

  return (
    <nav className='p-5 dark:bg-gray bg-white shadowNav rounded-sm flex-1 flex items-center justify-between'>
      <Link href={'/'}>
        <Image className='rounded-full w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]' src={blackLogo} width={50} height={50} alt='Logo' />
      </Link>
      <div className="flex items-center gap-4">
        <ButtonThem />
        <UserInformation user={user} />
        <ListIcon/>
      </div>
    </nav>
  )
}
