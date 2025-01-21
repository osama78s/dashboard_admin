'use client'
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiOutlineUser } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { useProducts } from '../Context/Products';
import UserCookie, { useUserCookie } from '../Context/UserCookie';
import { useCategories } from '../Context/Categories';
import { useSubcategories } from '../Context/Subcategories';

export default function UserInformation({ user }) {
  const router = useRouter();
  const { token } = user;
  const { setProducts } = useProducts();
  const { userCookie ,setUserCookie } = useUserCookie();
  const { setCategories } = useCategories();
  const { setSubcategories } = useSubcategories();
  
  const handleLogout = async () => {
    const res = await fetch('http://localhost:8000/api/users/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (res.ok) {
      Cookies.remove('user');
      setUserCookie('');
      setProducts(null);
      setCategories(null);
      setSubcategories(null);
      router.push('/login');
    }
  }

  return (
    <>
      {userCookie && (
        <>
          <div className='hidden md:flex items-center gap-2'>
            <span className='border-r text-title dark:text-white border-gray pr-2'>{user.first_name + ' ' + user.last_name}</span>
          </div>

          <Navbar fluid rounded className='p-0 sm:px-0 bg-transparent hidden md:flex'>

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img={user.image_url || 'http://localhost:8000/images/users/default.jpg'} rounded />
              }
              className='p-0 border-none shadowNav'
            >
              <Dropdown.Item className='p-0'>
                <Link
                  href={'/profile'}
                  className="flex items-center gap-2 p-2 w-full  dark:text-black text-title text-[18px] hover:bg-[#f9f9f9] transition-all duration-300"
                >
                  <HiOutlineUser className='text-[16px]' />
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className='p-0'>
                <Link
                  onClick={handleLogout}
                  href={'#'}
                  className="flex items-center  w-full gap-2 p-2 dark:text-black text-title text-[18px] hover:bg-[#f9f9f9] transition-all duration-300"
                >
                  <IoLogOutOutline className='text-[16px]' />
                  Log Out
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </Navbar>
        </>
      )}

    </>
  )
}
