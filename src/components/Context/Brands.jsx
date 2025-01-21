'use client';
import { createContext, useContext, useState } from "react";
const brandsProvider = createContext({});

export default function Brands({ children }) {
    const [brands, setBrands] = useState([]);
  return <brandsProvider.Provider value={{ brands, setBrands }}>{ children }</brandsProvider.Provider>
}

export const useBrands = () => {
    return useContext(brandsProvider);
}