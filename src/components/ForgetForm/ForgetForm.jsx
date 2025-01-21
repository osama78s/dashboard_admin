'use client';
import Loading from "@/app/loading";
import { useActionState, useState } from "react";
import ForgetAction from "../ForgetAction/ForgetAction";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Link from "next/link";

export default function ForgetForm() {
    const [state, formAction, pending] = useActionState(ForgetAction, {});
    const [showPassword, setShowPassword] = useState(true);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);

    const handleShowEye = (parameter) => {
        if(parameter === 'password'){
            setShowPassword(prev => !prev);
        }else {
            setShowPasswordConfirm(prev => !prev);
        }
    }

    return (
        <>
            {pending && <Loading />}
            <form action={formAction}>
                <div className="flex flex-col w-full mb-4">
                    <label className='mb-1' htmlFor="email">Email</label>
                    <input defaultValue={state?.data?.email} type='text' name='email' id='email' placeholder='Email'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.email && <span className='dark:text-red'>{state.errors.email[0]}</span>}
                </div>
                <div className="flex gap-4 mt-4 flex-col sm:flex-row">
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
                            <input defaultValue={state?.data?.password_confirmation} type={!showPasswordConfirm ? 'text' : 'password'} name='password_confirmation' id='password_confirmation' placeholder='Password Confirmation'
                                className='focus:outline-none border-none focus:ring-0 dark:text-black w-full shadowNav'
                            />
                            {!showPasswordConfirm ? (
                                <IoEyeOutline onClick={() => handleShowEye('passwordConfirmation')} className='absolute right-[10px] cursor-pointer top-1/2 transform -translate-y-1/2 dark:text-black' />
                            ) : (
                                <IoEyeOffOutline onClick={() => handleShowEye('passwordConfirmation')} className='absolute right-[10px] cursor-pointer top-1/2 transform -translate-y-1/2 dark:text-black' />
                            )}
                        </div>
                        {state?.errors?.password_confirmation && <span className='dark:text-red'>{state.errors.password_confirmation}</span>}
                    </div>
                </div>
                <button type='submit' className='dark:bg-black bg-blue text-white block mx-auto mt-8 px-8 py-2'>
                    {pending ? 'Loading...' : 'Continue'}
                </button>
                <Link className='text-center block mt-4 dark:text-white text-blue' href={'/register'}>Sign Up</Link>
            </form>
        </>
    )
}
