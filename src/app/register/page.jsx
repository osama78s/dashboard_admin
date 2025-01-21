import React, { Suspense } from 'react'
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import ToastMessage from '@/components/ToastMessage/ToastMessage';

export default function Register() {
  return (
    <>
      <ToastMessage />
      <div className='main flex flex-col items-center justify-center'>
        <div className="w-full  md:w-[700px] lg:w-[900px] xl:w-[1000px] rounded-md shadow-md p-[20px] dark:bg-gray dark:shadow-zinc-800 shadowNav">
          <h1 className='text-[40px] md:text-[60px] font-bold mb-6 text-center text-blue dark:text-white'>Sign Up</h1>
          <RegisterForm />
        </div>
      </div>
    </>
  )
}
