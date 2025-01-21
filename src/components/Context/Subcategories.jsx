'use client';
import { createContext, useContext, useState } from "react";
const subcategoriesProvider = createContext({});

export default function Subcategories({ children }) {
    const [subcategories, setSubcategories] = useState([]);
  return <subcategoriesProvider.Provider value={{ subcategories, setSubcategories }}>{ children }</subcategoriesProvider.Provider>
}

export const useSubcategories = () => {
    return useContext(subcategoriesProvider);
}