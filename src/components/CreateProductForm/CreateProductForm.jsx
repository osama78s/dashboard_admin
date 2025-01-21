'use client'
import React, { useActionState, useEffect } from 'react'
import CreateProductValidation from '../CreateProductValidation/CreateProductValidation';
import { FileInput, Label } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useMessages } from '../Context/Messages';
import Loading from '@/app/loading';

export default function CreateProductForm({ data }) {
    const [state, formAction, pending] = useActionState(CreateProductValidation, {});
    const { setMessage } = useMessages();
    const router = useRouter();

    useEffect(() => {
        if(state.message){
            setMessage(state.message);
            router.push('/');
        }
    },[state])
    
    return (
        <>
        { pending && <Loading/> }
        <form action={formAction} className='mt-4'>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="name">Product Name</label>
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
            <div className="flex gap-4 mt-4 flex-col sm:flex-row">
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="price">Price</label>
                    <input defaultValue={state?.data?.price} type='text' name='price' id='price' placeholder='Price'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.price && <span className='dark:text-red'>{state.errors.price}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="quantity">Quantity</label>
                    <input defaultValue={state?.data?.quantity} type='number' name='quantity' id='quantity' placeholder='Quantity'
                        className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                    />
                    {state?.errors?.quantity && <span className='dark:text-red'>{state.errors.quantity}</span>}
                </div>
            </div>

            <div className="flex gap-4 mt-4 flex-col sm:flex-row">
            <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="brand_id">Brands</label>
                    <select defaultValue={ state?.data?.brand_id || 'Select Brand'} className='dark:text-black focus:outline-none focus:ring-0 border-none shadowNav' name="brand_id" id="brand_id">
                        <option disabled className='dark:text-black'>Select Brand</option>
                        { data.brands ? (data.brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))) : (
                            <option className='dark:text-red'>No Brands here</option>
                        ) }
                    </select>
                    {state?.errors?.brand_id && <span className='dark:text-red'>{state.errors.brand_id}</span>}
                </div>
                <div className="flex flex-col w-full">
                    <label className='mb-1' htmlFor="subcategory_id">Subcategories</label>
                    <select defaultValue={ state?.data?.subcategory_id ||  'Select Subcategory'} className='dark:text-black focus:outline-none focus:ring-0 border-none shadowNav' name="subcategory_id" id="subcategory_id">
                        <option disabled >Select Subcategory</option>
                        { data.subcategories ? (
                            data.subcategories.map((sub) => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))
                        ) : (
                            <option className='dark:text-red'>No Subcategories here</option>
                        ) }
                    </select>
                    {state?.errors?.subcategory_id && <span className='dark:text-red'>{state.errors.subcategory_id}</span>}
                </div>
            </div>

            <div className="flex flex-col w-full mt-4">
                    <label className='mb-1' htmlFor="status">Status</label>
                    <select defaultValue={state?.data?.status || 'Select Status'} className='dark:text-black focus:outline-none focus:ring-0 border-none shadowNav' name="status" id="status">
                        <option disabled >Select Status</option>
                        <option value="1" className='hover:bg-transparent bg-transparent'>Active</option>
                        <option value="0" className='hover:bg-transparent bg-transparent'>Not Active</option>
                    </select>
                    {state?.errors?.status && <span className='dark:text-red'>{state.errors.status}</span>}
                </div>

            <div className="flex flex-col w-full mt-4">
                <label className='mb-1' htmlFor="desc">Description</label>
                <textarea defaultValue={state?.data?.desc} className='dark:text-black focus:outline-none focus:ring-0 border-none shadowNav' name="desc" id="desc"></textarea>
                {state?.errors?.desc && <span className='dark:text-red'>{state.errors.desc}</span>}
            </div>

            <div className='flex sm:justify-between sm:items-center flex-col sm:flex-row'>
                <div className='mt-4 basis-[50%]'>
                    <div className="mb-2 block">
                        <Label htmlFor="file-upload" value="Upload Image" />
                    </div>
                    <FileInput id="file-upload" name='image' className='focus:outline-none focus:ring-0 focus:border-none border-none ' />
                    {state?.errors?.image && <span className='dark:text-red'>{state.errors.image}</span>}
                </div>
                <button className='dark:bg-gray bg-blue text-white px-4 py-2 mt-8 mx-auto sm:mx-0' type='submit'>{
                    pending ? 'Loading...' : 'Craete'
                }</button>
            </div>
        </form>
        </>
    )
}
