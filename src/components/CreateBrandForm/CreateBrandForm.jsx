'use client'
import React, { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useMessages } from '../Context/Messages';
import Loading from '@/app/loading';
import CreateBrandAction from '../CreateBrandAction/CreateBrandAction';
import { FileInput, Label } from 'flowbite-react';

export default function CreateBrandForm() {

    const [state, formAction, pending] = useActionState(CreateBrandAction, {});

    const { setMessage } = useMessages();
    const router = useRouter();

    console.log(state)
    useEffect(() => {
        if (state.message) {
            setMessage(state.message);
            router.push('/brands');
        }
    }, [state])

    return (
        <>
            {pending && <Loading />}
            <form action={formAction} className='mt-4'>


                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="name">Brand Name</label>
                        <input defaultValue={state?.data?.name} type='text' name='name' id='name' placeholder='Brand Name'
                            className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                        />
                        {state?.errors?.name && <span className='dark:text-red'>{state.errors.name}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="code">Code</label>
                        <input defaultValue={state?.data?.code} type='text' name='code' id='code' placeholder='Code'
                            className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                        />
                        {state?.errors?.code && <span className='dark:text-red'>{state.errors.code[0]}</span>}
                        {state?.errors?.error && <span className='dark:text-red'>{state.errors.error}</span>}
                    </div>
                </div>

                <div className="flex flex-col w-full mt-4">
                    <label className='mb-1' htmlFor="status">Status</label>
                    <select defaultValue={state?.data?.status} className='dark:text-black focus:outline-none focus:ring-0 border-none shadowNav' name="status" id="status">
                        <option disabled >Select Status</option>
                        <option value="1" className='hover:bg-transparent bg-transparent'>Active</option>
                        <option value="0" className='hover:bg-transparent bg-transparent'>Not Active</option>
                    </select>
                    {state?.errors?.status && <span className='dark:text-red'>{state.errors.status}</span>}
                </div>

                <div className='flex sm:justify-between sm:items-center flex-col sm:flex-row'>
                    <div className='mt-4 basis-[50%]'>
                        <div className="mb-2 block">
                            <Label htmlFor="file-upload" value="Upload Image" />
                        </div>
                        <FileInput id="file-upload" name='image' className='focus:outline-none focus:ring-0 focus:border-none border-none shadowNav' />
                        {state?.errors?.image && <span className='dark:text-red'>{state.errors.image}</span>}
                    </div>
                    <button className='dark:bg-gray bg-blue text-white px-4 py-2 mx-auto sm:mx-0 mt-8' type='submit'>{
                        pending ? 'Loading...' : 'Craete'
                    }</button>
                </div>
            </form>
        </>
    )
}
