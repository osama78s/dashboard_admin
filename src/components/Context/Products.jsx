'use client'
import React, { createContext, useContext, useState } from 'react'
const productsProvider = createContext({});

export default function Products({ children }) {
    const [products, setProducts] = useState([]);
  return  <productsProvider.Provider value={{ products, setProducts }}>{children}</productsProvider.Provider>
}

export const useProducts = () => {
    return useContext(productsProvider);
}