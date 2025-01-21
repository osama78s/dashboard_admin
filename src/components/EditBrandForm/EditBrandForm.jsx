'use client'
import React, { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useMessages } from '../Context/Messages';
import Loading from '@/app/loading';
import EditBrandAction from '../EditBrandAction/EditBrandAction';

export default function EditBrandFrom({ id, brand }) {
    
    const [state, formAction, pending] = useActionState(EditBrandAction, {id});

    const { setMessage } = useMessages();
    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState(brand?.image_url);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    }

    useEffect(() => {
        if(state.message){
            setMessage(state.message);
            router.push('/brands');
        }
    },[state])

    return (
        <>
        { pending && <Loading/> }
        <form action={formAction} className='mt-4'>

            <div className='flex items-center justify-center mb-4'>       
                    <label htmlFor="img" className='cursor-pointer'>
                        <img className='rounded-full object-center shadow-xl h-[250px] max-w-full w-[250px]'  src={selectedImage}  alt='Your Image'/>
                        <input onChange={handleImageChange} accept='image/*' type="file" name='image' className='hidden' id='img'/>
                        {state?.errors?.image && <span className='dark:text-red'>{state.errors.image}</span>}
                    </label>
                </div>
                
            <div className="flex gap-4">
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="name">Brand Name</label>
                    <input defaultValue={state?.data?.name || brand?.name} type='text' name='name' id='name' placeholder='Brand Name'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.name && <span className='dark:text-red'>{state.errors.name}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="code">Code</label>
                    <input defaultValue={state?.data?.code ||  brand?.code} type='text' name='code' id='code' placeholder='Code'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.code && <span className='dark:text-red'>{state.errors.code}</span>}
                </div>
            </div>
          
            <div className="flex flex-col w-full mt-4">
                    <label className='mb-1' htmlFor="status">Status</label>
                    <select defaultValue={state?.data?.status ||  brand?.status } className='dark:text-black focus:outline-none focus:ring-0 border-none shadowNav' name="status" id="status">
                        <option disabled >Select Status</option>
                        <option value="1" className='hover:bg-transparent bg-transparent'>Active</option>
                        <option value="0" className='hover:bg-transparent bg-transparent'>Not Active</option>
                    </select>
                    {state?.errors?.status && <span className='dark:text-red'>{state.errors.status}</span>}
                </div>

            <div className='flex justify-between items-center'>
                <button className='dark:bg-gray bg-blue text-white px-4 py-2 mt-8 ml-auto' type='submit'>{
                    pending ? 'Loading...' : 'Edit'
                }</button>
            </div>
        </form>
        </>
    )
}
