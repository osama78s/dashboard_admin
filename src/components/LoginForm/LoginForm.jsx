'use client'
import React, { useActionState, useEffect, useState } from 'react'
import LoginAction from '../LoginAction/LoginAction'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import Loading from '@/app/loading';
import { useRouter } from 'next/navigation';
import { useMessages } from '../Context/Messages';
import Link from 'next/link';

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(LoginAction, {});
    const [showPassword, setShowPassword] = useState(true);
    const { setMessage } = useMessages();
    const router = useRouter();

    useEffect(() => {
        if(state.message){
            router.replace('/verify');
            setMessage(state.message);
        }
    },[state?.message])
    const handleShowEye = () => {
        setShowPassword(prev => !prev);
    }
    return (
        <>
            { pending && <Loading/> }
            { state?.errors?.error && (
                   <Alert className='dark:bg-[#a25f5f] bg-[#e78282] mb-4 text-[16px] text-[#eee]' color='failure' icon={HiInformationCircle}>
                   <span className="font-medium">{ state?.errors?.error }</span> 
                 </Alert>
            ) }
            <form action={formAction}>
                <div className="flex flex-col w-full mb-4">
                    <label className='mb-1' htmlFor="email">Email</label>
                    <input defaultValue={state?.data?.email} type='text' name='email' id='email' placeholder='Email'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.email && <span className='dark:text-red'>{state.errors.email[0]}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="password">Password</label>
                    <div className="relative">
                        <input defaultValue={state?.data?.password} type={!showPassword ? 'text' : 'password'} name='password' id='password' placeholder='Password'
                            className='focus:outline-none border-none focus:ring-0 dark:text-black w-full shadowNav'
                        />
                        {!showPassword ? (
                            <IoEyeOutline onClick={handleShowEye} className='absolute right-[10px] cursor-pointer top-1/2 transform -translate-y-1/2 dark:text-black' />
                        ) : (
                            <IoEyeOffOutline onClick={handleShowEye} className='absolute right-[10px] cursor-pointer top-1/2 transform -translate-y-1/2 dark:text-black' />
                        )}
                    </div>
                    {state?.errors?.password && <span className='dark:text-red'>{state.errors.password[0]}</span>}
                </div>
                <button type='submit' className='dark:bg-black bg-blue text-white block mx-auto mt-8 px-8 py-2'>
                    {pending ? 'Loading...' : 'Log In'}
                </button>
                <div className='flex justify-between items-center'>
                    <Link className='text-center block mt-4 dark:text-white text-blue' href={'/register'}>Sign Up</Link>
                    <Link className='text-center block mt-4 dark:text-white text-blue' href={'/forgetPassword'}>Forget Password</Link>
                </div>
            </form>
        </>
    )
}
