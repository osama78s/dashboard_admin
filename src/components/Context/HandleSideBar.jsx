'use client'
import React, { useContext, useState } from 'react'
import { createContext } from 'react'

export const handleSideBarProvider = createContext({});

export default function HandleSideBar({ children }) {
    const [handleSideBar, setHandleSideBar] = useState(false);
    
  return <handleSideBarProvider.Provider value={{ handleSideBar,setHandleSideBar }}
  
  >{children}</handleSideBarProvider.Provider>
}

export const useHandleSideBar = () => {
    return useContext(handleSideBarProvider);
}