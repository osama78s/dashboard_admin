'use client'
import React, { useContext, useState } from 'react'
import { createContext } from 'react'

export const idProvider = createContext({});

export default function Id({ children }) {
    const [id, setId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    
  return <idProvider.Provider value={{ id, setId, categoryId, setCategoryId }}
  
  >{children}</idProvider.Provider>
}

export const useId = () => {
    return useContext(idProvider);
}