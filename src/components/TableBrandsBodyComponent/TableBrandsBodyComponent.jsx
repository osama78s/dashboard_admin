'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Alert } from "flowbite-react";
import { useMessages } from '../Context/Messages';
import { UsePageNumber } from '../Context/PageNumber';
import axios from 'axios';
import { useBrands } from '../Context/Brands';
import { useRouter } from 'next/navigation';

export default function TableBrandsBodyComponent({ user, token }) {
    const { brands, setBrands } = useBrands()
    const { message, setMessage } = useMessages();
    const { pageNumberBrands, setTotalPages, totalPages, setPageNumberBrands } = UsePageNumber();
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/brands?page=${pageNumberBrands}`, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.data;
            setBrands(data?.data?.brands?.data);
            setTotalPages(data?.data?.total);
        }
        if (token) {
            fetchProducts();
        }
    }, [token, pageNumberBrands]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/brands/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            setBrands(res?.data?.data?.brands?.data);
            setTotalPages(res?.data?.data?.total);
            setMessage('Brands Deleted Successfully');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }, [message]);


    useEffect(() => {
        if (pageNumberBrands > 1 && brands?.length === 0) {
            setPageNumberBrands(pageNumberBrands - 1)
        }else if (pageNumberBrands === 1 && brands?.length === 0 && totalPages > 1){
            setPageNumberBrands(pageNumberBrands + 1)
            
        }
    }, [brands,totalPages])


    return (
        <>
            {message && (
                <Alert className='block mb-4 dark:bg-[#a5bffc21] dark:text-white text-[16px]' >
                    <span className="font-medium">{message}</span>
                </Alert>
            )}
            <Table hoverable className='overflow-x-auto '>
                <TableHead className="text-center dark:bg-gray bg-blue text-white">
                    <TableHeadCell>Image</TableHeadCell>
                    <TableHeadCell>Brand name</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>Code</TableHeadCell>
                    {user.role === 'admin' &&
                        <TableHeadCell className="text-center">
                            Edit
                        </TableHeadCell>
                    }
                    <TableHeadCell className="text-center">
                        {user.role === 'admin' ? 'Delete' : 'Action'}
                    </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y text-center">
                    {brands && brands.length > 0 ? (
                        brands.map(brand => (
                            <TableRow key={brand.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-black text-[16px] border-y border-y-[#ccc]">
                                <TableCell className="flex justify-center items-center">
                                    <img className="rounded-full object-cover xl:w-[40px] xl:h-[40px] w-[30px] h-[30px] shadwos-2" src={brand.image_url} alt="Brand Image" />
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                    {brand.name}
                                </TableCell>
                                <TableCell className={`${brand.status == 1 ? 'dark:text-green-500 text-green-500' : 'dark:text-red text-red'}`}>
                                    {brand.status == 1 ? 'Active' : 'Not Active'}
                                </TableCell>
                                <TableCell>{brand.code}</TableCell>
                                {user.role === 'admin' && (
                                    <TableCell className=''>
                                        {user.id === brand.user_id && (
                                            <Link href={`/brands/${brand.id}`} className="font-medium text-white bg-blue px-4 py-1 rounded-sm dark:text-white dark:bg-black">
                                                Edit
                                            </Link>
                                        )}
                                    </TableCell>
                                )}
                                <TableCell className="space-x-2">
                                    {user.role === 'user' ? (
                                        <>
                                            <Link href={`/brands/${brand.id}`} className="font-medium text-white bg-blue px-4 py-1 rounded-sm dark:text-white dark:bg-black">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(brand.id)} type="submit" className="font-medium text-white bg-red px-4 py-1 rounded-sm  dark:text-white dark:bg-red">
                                                Delete
                                            </button>
                                        </>
                                    ) : (

                                        <button onClick={() => handleDelete(brand.id)} type="submit" className="font-medium text-white bg-red px-4 py-1 rounded-sm  dark:text-white dark:bg-red">
                                            Delete
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center text-[30px] font-bold dark:text-red text-red">
                                No Brands Here
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}