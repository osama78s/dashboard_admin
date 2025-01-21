import React, { Suspense } from 'react'
import VerifyForm from '@/components/VerifyForm/VerifyForm'
import ToastMessage from '@/components/ToastMessage/ToastMessage'
import GetUserCookie from '@/components/GetUserCookie/GetUserCookie'
import { cookies } from 'next/headers'

export default async function Verify() {
    const token = (await cookies()).get('token')?.value;
    console.log(token);
    try{
        const res = await fetch('http://127.0.0.1:8000/api/users/send-code', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

    } catch(error){}

    return (
        <>
            <ToastMessage/>
            <div className='main flex flex-col items-center justify-center'>
                <div className="w-full  md:w-[700px] lg:w-[900px] xl:w-[1000px] rounded-md shadow-md p-[20px] dark:bg-gray shadow-zinc-800 shadowNav">
                    <h1 className='text-[40px] md:text-[60px] font-bold mb-6 text-center dark:text-white text-blue'>Check Code</h1>
                    <VerifyForm />
                </div>
            </div>
        </>
    )
}
