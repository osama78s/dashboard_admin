'use client'
import React, { createContext, useContext, useState } from 'react'
const usersProvider = createContext({});

export default function Users({ children }) {
    const [users, setUsers] = useState([]);
  return  <usersProvider.Provider value={{ users, setUsers }}>{children}</usersProvider.Provider>
}

export const useUsers = () => {
    return useContext(usersProvider);
}