'use client'
import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const messagesProvider = createContext({});

export default function Messages({ children }) {
    const [message, setMessage] = useState('');
  return <messagesProvider.Provider value={{ message, setMessage }}>{children}</messagesProvider.Provider>
}

export const useMessages = () => {
    return useContext(messagesProvider);
}
