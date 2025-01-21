'use client' 
import { createContext, useContext, useState } from "react"

const providerContext = createContext({});


export default function Them({ children }) {
    const [them, setTheme] = useState('light');
  return (
    <providerContext.Provider value={{ them, setTheme }}>{children}</providerContext.Provider>
  )
}

export const useThem = () => {
    return useContext(providerContext);
}