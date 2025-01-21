'use client'
import React, { useActionState, useEffect, useState } from 'react'
import RegisterAction from '../RegisterAction/RegisterAction';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Loading from '@/app/loading';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';


export default function RegisterForm() {
    const [state, formAction, pending] = useActionState(RegisterAction, {});
    const [showPassword, setShowPassword] = useState(true);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
    const pathName = usePathname();
    const router = useRouter();

    const handleShowEye = (parameter) => {
        if (parameter === 'password') {
            setShowPassword(prev => !prev);
        } else {
            setShowPasswordConfirm(prev => !prev);
        }
    }

    return (
        <>
            {pending && <Loading />}
            <form action={formAction}>
                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="first_name">First Name</label>
                        <input defaultValue={state?.data?.first_name} type='text' name='first_name' id='first_name' placeholder='First Name'
                            className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                        />
                        {state?.errors?.first_name && <span className='dark:text-red'>{state.errors.first_name}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="last_name">Last Name</label>
                        <input defaultValue={state?.data?.last_name} type='text' name='last_name' id='last_name' placeholder='Last Name'
                            className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                        />
                        {state?.errors?.last_name && <span className='dark:text-red'>{state.errors.last_name}</span>}
                    </div>
                </div>
                <div className="flex gap-4 mt-4 flex-col sm:flex-row">
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="email">Email</label>
                        <input defaultValue={state?.data?.email} type='email' name='email' id='email' placeholder='Email'
                            className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                        />
                        {state?.errors?.email && <span className='dark:text-red'>{state.errors.email[0]}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="gender">Gender</label>
                        <select className='focus:outline-none focus:ring-0 border-none text-black dark:text-black shadowNav' name="gender" id="gender">
                            <option disabled>Select Gender</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                        {state?.errors?.gender && <span className='dark:text-red'>{state.errors.gender}</span>}
                    </div>
                </div>  <div className="flex gap-4 mt-4 flex-col sm:flex-row">
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="password">Password</label>
                        <div className="relative">
                            <input defaultValue={state?.data?.password} type={!showPassword ? 'text' : 'password'} name='password' id='password' placeholder='Password'
                                className='focus:outline-none border-none focus:ring-0 dark:text-black w-full shadowNav'
                            />
                            {!showPassword ? (
                                <IoEyeOutline onClick={() => handleShowEye('password')} className='absolute right-[10px] cursor-pointer top-1/2 transform -translate-y-1/2 dark:text-black' />
                            ) : (
                                <IoEyeOffOutline onClick={() => handleShowEye('password')} className='absolute right-[10px] cursor-pointer top-1/2 transform -translate-y-1/2 dark:text-black' />
                            )}
                        </div>
                        {state?.errors?.password && <span className='dark:text-red'>{state.errors.password[0]}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="password_confirmation">Password Confirmation</label>
                        <div className="relative">
                            <input defaultValue={state?.data?.password} type={!showPasswordConfirm ? 'text' : 'password'} name='password_confirmation' id='password_confirmation' placeholder='Password Confirmation'
                                className='focus:outline-none border-none focus:ring-0 dark:text-black w-full shadowNav'
                            />
                            {!showPasswordConfirm ? (
                                <IoEyeOutline onClick={() => handleShowEye('passwordConfirmation')} className='absolute right-[10px] cursor-pointer top-1/2 transform -translate-y-1/2 dark:text-black' />
                            ) : (
                                <IoEyeOffOutline onClick={() => handleShowEye('passwordConfirmation')} className='absolute right-[10px] cursor-pointer top-1/2 transform -translate-y-1/2 dark:text-black' />
                            )}
                        </div>
                        {state?.errors?.password_confirmation && <span className='dark:text-red'>{state.errors.password_confirmation[0]}</span>}
                    </div>
                </div>

                <button type='submit' className='dark:bg-black bg-blue text-white block mx-auto mt-8 px-8 py-2'>
                    {pending ? 'Loading...' : 'Sign Up'}
                </button>
                <div className='flex justify-between items-center'>
                    <Link className='text-center dark:text-white text-blue block mt-4' href={'/login'}>Log In</Link>
                    <Link className='text-center dark:text-white text-blue block mt-4' href={'/forgetPassword'}>Forget Password</Link>
                </div>
            </form>
        </>
    )
}
