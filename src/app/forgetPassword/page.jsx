import ForgetForm from '@/components/ForgetForm/ForgetForm'
import ToastMessage from '@/components/ToastMessage/ToastMessage'
import React from 'react'

export default function ForgetPassword() {
    return (
        <>
            <ToastMessage />
            <div className='main flex flex-col items-center justify-center'>
                <div className="w-full  md:w-[700px] lg:w-[900px] xl:w-[1000px] rounded-md shadow-md p-[20px] dark:bg-gray dark:shadow-zinc-800 shadwoNav">
                    <h1 className='text-[40px] md:text-[60px] font-bold mb-6 text-center dark:text-white text-blue '>Forget Password</h1>
                    <ForgetForm />
                </div>
            </div>
        </>
    )
}
