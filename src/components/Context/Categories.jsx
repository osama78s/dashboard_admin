'use client';
import { createContext, useContext, useState } from "react";
const categoriesProvider = createContext({});

export default function Categories({ children }) {
    const [categories, setCategories] = useState([]);
  return <categoriesProvider.Provider value={{ categories, setCategories }}>{ children }</categoriesProvider.Provider>
}

export const useCategories = () => {
    return useContext(categoriesProvider);
}