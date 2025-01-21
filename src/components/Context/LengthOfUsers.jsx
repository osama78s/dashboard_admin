'use client'
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUserCookie } from './UserCookie';
import { useUsers } from './Users';
const lengthProvider = createContext({});

export default function LengthOfUsers({ children }) {
    const [length, setLength] = useState(0); 
    const [token, setToken] = useState('');

    useEffect(() => {
      const cookieStore = Cookies.get('user');
      if(cookieStore){
        setToken(JSON.parse(cookieStore).token);
      }
    },[])

    useEffect(() => {
      if(!token) return;
      
      const getLengthOfUsers = async () => {
        const res = await fetch(`http://localhost:8000/api/admin/users/usersLength`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
      })

        if (res.ok) {
          const data = await res.json();
          setLength(data?.data?.users)
        }

      } 
      getLengthOfUsers();
    },[token]);

  return <lengthProvider.Provider value={{ length, setLength }}>{ children }</lengthProvider.Provider>
}

export const useLengthOfUsers = () => {
    return useContext(lengthProvider);
}