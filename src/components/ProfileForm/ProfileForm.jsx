'use client'
import React, { useActionState, useEffect, useState } from 'react'
import ProfileAction from '../ProfileAction/ProfileAction';
import Cookies from 'js-cookie';
import { useMessages } from '../Context/Messages';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

export default function ProfileForm() {
    const [state, formAction, pending] = useActionState(ProfileAction, {});
    const { setMessage } = useMessages();
    const [user, setUser] = useState({});
    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState(user?.image_url);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };


    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
            setSelectedImage(JSON.parse(userCookie).image_url)
        }
    }, [])

    useEffect(() => {
        if(state?.message){
            setMessage(state.message);
            router.push('/');
        }
    }, [state?.message])

    return (
        <>
            {pending && <Loading />}
            <form action={formAction} className='mt-4'>

                <div className='flex items-center justify-center mb-4'>       
                    <label htmlFor="img" className='cursor-pointer'>
                        <img className='rounded-full object-center shadow-xl h-[250px] max-w-full w-[250px]'  src={selectedImage || '/default.jpg'}  alt='Your Image'/>
                        <input onChange={handleImageChange} accept='image/*' type="file" name='image' className='hidden' id='img'/>
                        {state?.errors?.image && <span className='dark:text-red'>{state.errors.image}</span>}
                    </label>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="first_name">First Name</label>
                        <input defaultValue={state?.data?.first_name || user?.first_name} type='text' name='first_name' id='first_name' placeholder='First Name'
                            className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                        />
                        {state?.errors?.first_name && <span className='dark:text-red'>{state.errors.first_name}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="last_name">Last Name</label>
                        <input defaultValue={state?.data?.last_name || user?.last_name} type='text' name='last_name' id='last_name' placeholder='Last Name'
                            className='focus:outline-none border-none focus:ring-0 dark:text-black shadowNav'
                        />
                        {state?.errors?.last_name && <span className='dark:text-red'>{state.errors.last_name}</span>}
                    </div>
                </div>
                <div className="flex gap-4 mt-4">
                    <div className="flex flex-col w-full ">
                        <label className='mb-1' htmlFor="phone">Phone</label>
                        <div className="relative">
                            <input defaultValue={state?.data?.phone || user?.phone} type='text' name='phone' id='phone' placeholder='Phone'
                                className='focus:outline-none border-none focus:ring-0 dark:text-black w-full shadowNav'
                            />
                        </div>
                        {state?.errors?.phone && <span className='dark:text-red'>{state.errors.phone}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="gender">Gender</label>
                        <select defaultValue={user?.gender || state?.data?.gender} className='focus:outline-none focus:ring-0 border-none text-black dark:text-black shadowNav' name="gender" id="gender">
                            <option disabled>Select Gender</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                        {state?.errors?.gender && <span className='dark:text-red'>{state.errors.gender}</span>}
                    </div>
                </div>
                <div className="flex gap-4 mt-4">
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="city">City</label>
                        <div className="relative">
                            <input defaultValue={state?.data?.city || user?.city} type='text' name='city' id='city' placeholder='City'
                                className='focus:outline-none border-none focus:ring-0 dark:text-black w-full shadowNav'
                            />
                        </div>
                        {state?.errors?.city && <span className='dark:text-red'>{state.errors.city}</span>}
                    </div>
                    <div className="flex flex-col w-full">
                        <label className='mb-1' htmlFor="address">Address</label>
                        <div className="relative">
                            <input defaultValue={state?.data?.address || user?.address} type='text' name='address' id='address' placeholder='Address'
                                className='focus:outline-none border-none focus:ring-0 dark:text-black w-full shadowNav'
                            />
                        </div>
                        {state?.errors?.address && <span className='dark:text-red'>{state.errors.address}</span>}
                    </div>
                </div>
                <button type='submit' className='dark:bg-gray bg-blue text-white block ml-auto mt-8 px-8 py-2'>
                    {pending ? 'Loading...' : 'Edit'}
                </button>
            </form>
        </>
    )
}
