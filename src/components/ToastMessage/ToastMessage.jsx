'use client'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

export default function ToastMessage() {
    const [message, setMessage] = useState('');
    const cookieStore = Cookies.get('message') || '';

    useEffect(() => {
        setMessage(cookieStore);
        const timer =  setTimeout(() => {
            setMessage('');
            Cookies.remove('message');
        }, 3000);
        return () => clearTimeout(timer)
    },[cookieStore]);

    useEffect(() => {
        const cookieStore = Cookies.get('message');
        if(cookieStore){
            Cookies.remove('message');
        }
    },[message])
         
    return (
        <div className={` ${message ? 'top-[20px]' : '-top-[100%]'} absolute transition-all duration-500 ease left-1/2 transform -translate-x-1/2 shadow-md dark:bg-white shadwos-2 dark:text-red px-4 py-2 z-[100] text-[18px] rounded-sm`}>
            {message && (
                <div className='flex items-center justify-between'>
                    <span>{message}</span>
                </div>
            )}
        </div>
    )
}
