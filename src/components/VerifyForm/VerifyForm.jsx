'use client';
import React, { useActionState, useEffect, useState } from 'react'
import VerifyAction from '../VerifyAction/VerifyAction';
import Loading from '@/app/loading';
import Link from 'next/link';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Alert } from 'flowbite-react';

export default function VerifyForm() {
    const [state, formAction, pending] = useActionState(VerifyAction, {});
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState(null);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const email = Cookies.get('email');
        const token = Cookies.get('token');
        if (email && token) {
            setEmail(email);
            setToken(token);
        }
    }, [])

    const handleResendCode = async () => {
        const res = await axios.post('http://127.0.0.1:8000/api/users/send-code', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.data;
        setMessage(data.message);
    }

    const handleChange = (e) => {
        const { value } = e.target;
        // هتفضل true لحد م ال value.length يكون لا يساوي 5 اذا ساواها ساعتها هتتغير 
        setDisabled(value.length !== 5)
    }

    useEffect(() => {
        if(message){
            setTimeout(() => {
                setMessage(null)
            }, 3000);
        }
    },[message])

    return ( 
        <>
            {pending && <Loading />}
            {message && (
                <Alert className='mb-4 text-[16px] text-blue' color='success'>
                    <span className="font-medium">{message}</span>
                </Alert>
            )}
            <div className='mb-4'>
                <span>We Sent Code For Your Email <strong className='dark:text-[#eee]'>{email}</strong></span>
            </div>
            <form action={formAction}>
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="code">Code</label>
                    <input onChange={handleChange} defaultValue={state?.data?.code} type='text' name='code' id='code' placeholder='Code'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.code && <span className='dark:text-red text-red'>{state.errors.code}</span>}
                </div>
                <button type='submit' className='disabled:opacity-50 disabled:cursor-not-allowed dark:bg-black bg-blue text-white px-8 py-2 block mx-auto mt-4' disabled={disabled}>
                    {pending ? 'Loading...' : 'Continue'}
                </button>
                <div className='flex items-center justify-between'>
                    <span>Didn’t receive the email? <strong className='cursor-pointer text-blue dark:text-[#eee]' onClick={handleResendCode}>Click to resend</strong></span>
                    <Link href={'/login'} className='text-blue dark:text-white'>Log In</Link>
                </div>
            </form>
        </>
    )
}
