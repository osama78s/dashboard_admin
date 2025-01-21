'use client'
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react'

const userCookieProvider = createContext({});

export default function UserCookie({ children }) {
    const [userCookie, setUserCookie] = useState('');
    const user = Cookies.get('user');
    useEffect(() => {
      user && setUserCookie(JSON.parse(user));
    },[user])
  return <userCookieProvider.Provider value={{ userCookie, setUserCookie }}>{ children }</userCookieProvider.Provider>
}

export const useUserCookie = () => {
    return useContext(userCookieProvider);
}