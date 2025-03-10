'use client'
import React, { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useMessages } from '../Context/Messages';
import Loading from '@/app/loading';
import CreateCategoryAction from '../CreateCategoryAction/CreateCategoryAction';

export default function CreateCategoryForm() {
    
    const [state, formAction, pending] = useActionState(CreateCategoryAction, {});

    const { setMessage } = useMessages();
    const router = useRouter();

    useEffect(() => {
        if(state.message){
            setMessage(state.message);
            router.push('/categories');
        }
    },[state])

    return (
        <>
        { pending && <Loading/> }
        <form action={formAction} className='mt-4'>
            <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="name">Category Name</label>
                    <input defaultValue={state?.data?.name} type='text' name='name' id='name' placeholder='Product Name'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.name && <span className='dark:text-red'>{state.errors.name}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="code">Code</label>
                    <input defaultValue={state?.data?.code} type='text' name='code' id='code' placeholder='Code'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.code && <span className='dark:text-red'>{state.errors.code}</span>}
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

            <div className='flex justify-between items-center'>
                <button className='dark:bg-gray bg-blue text-white px-4 py-2 mt-8 mx-auto sm:mx-0 sm:ml-auto' type='submit'>{
                    pending ? 'Loading...' : 'Create'
                }</button>
            </div>
        </form>
        </>
    )
}
