'use client'
import React, { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useMessages } from '../Context/Messages';
import Loading from '@/app/loading';
import CreateSubCategoryAction from '../CreateSubCategoryAction/CreateSubCategoryAction';
import { fetchCategory } from '../FetchCategory/FetchCategory';

export default function CreateSubcategoryForm({ token }) {
    const [state, formAction, pending] = useActionState(CreateSubCategoryAction, {});
    const [categories, setCategories] = useState([]);

    const { setMessage } = useMessages();
    const router = useRouter();

    useEffect(() => {
        if (state.message) {
            setMessage(state.message);
            router.push('/subcategories');
        }
    }, [state])

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategory(token);
            setCategories(data)
        }
        getCategories()
    }, [token])

    return (
        <>
            {pending && <Loading />}
            <form action={formAction} className='mt-4'>
                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="name">Subcategory Name</label>
                        <input defaultValue={state?.data?.name} type='text' name='name' id='name' placeholder='Subcategory Name'
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

                <div className='flex gap-4 mt-4 flex-col sm:flex-row'>

                    <div className='flex flex-col w-full'>
                        <label className='mb-1' htmlFor="category_id">Category</label>
                        <select defaultValue={state?.data?.category_id || 'Select Category'} className='dark:text-black focus:outline-none focus:ring-0 border-none shadowNav' name="category_id" id="category_id">
                            <option disabled>Select Category</option>
                            {categories && categories.length > 0 && (
                                categories.map(category => (
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                ))
                            )}
                        </select>
                        {state?.errors?.category_id && <span className='dark:text-red'>{state.errors.category_id}</span>}
                    </div>

                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="status">Status</label>
                        <select defaultValue={state?.data?.status} className='dark:text-black focus:outline-none focus:ring-0 border-none shadowNav' name="status" id="status">
                            <option disabled >Select Status</option>
                            <option value="1" className='hover:bg-transparent bg-transparent'>Active</option>
                            <option value="0" className='hover:bg-transparent bg-transparent'>Not Active</option>
                        </select>
                        {state?.errors?.status && <span className='dark:text-red'>{state.errors.status}</span>}
                    </div>

                </div>


                <div className='flex justify-between items-center'>
                    <button className='dark:bg-gray text-white bg-blue px-4 py-2 mt-8 mx-auto sm:mx-0 sm:ml-auto' type='submit'>{
                        pending ? 'Loading...' : 'Create'
                    }</button>
                </div>
            </form>
        </>
    )
}
