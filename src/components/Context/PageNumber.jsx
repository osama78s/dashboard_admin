'use client'
import React, { createContext, useContext, useState } from 'react'
const numberPage = createContext({});

export default function PageNumber({ children }) {
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageNumberUsers, setPageNumberUsers] = useState(1);
    const [pageNumberCategories, setPageNumberCategories] = useState(1)
    const [pageNumberSubcategories, setPageNumberSubcategories] = useState(1);
    const [pageNumberBrands, setPageNumberBrands] = useState(1);

  return <numberPage.Provider 
  value={{ pageNumber, setPageNumber, totalPages, setTotalPages,
           pageNumberUsers, setPageNumberUsers, pageNumberCategories, setPageNumberCategories,
           pageNumberSubcategories, setPageNumberSubcategories, pageNumberBrands,
           setPageNumberBrands
    }}>
    {children}
    </numberPage.Provider>
}

export const UsePageNumber = () => {
    return useContext(numberPage);
}