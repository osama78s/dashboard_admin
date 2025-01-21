'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Alert } from "flowbite-react";
import { useMessages } from '../Context/Messages';
import { UsePageNumber } from '../Context/PageNumber';
import { useSubcategories } from '../Context/Subcategories';
import axios from 'axios';

export default function TableSubcategoriesBodyComponent({ user, token }) {
    const { subcategories, setSubcategories } = useSubcategories();
    const { message, setMessage } = useMessages();
    const { pageNumberSubcategories, setTotalPages, totalPages, setPageNumberSubcategories } = UsePageNumber();

    useEffect(() => {
        const fetchSubcategories = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/subcategories?page=${pageNumberSubcategories}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.data;
            setSubcategories(data?.data?.subcategories?.data);
            setTotalPages(data?.data?.subcategories?.last_page);
        }
        if (token) {
            fetchSubcategories();
        }
    }, [token, pageNumberSubcategories]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/subcategories/delete/${id}`, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
            setSubcategories(res?.data?.data?.subcategories?.data);
            setTotalPages(res?.data?.data?.total);
            setMessage('Category Deleted Successfully');
        } catch (error) {
            console.log(error)
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
        if (pageNumberSubcategories > 1 && subcategories?.length === 0) {
            setPageNumberSubcategories(pageNumberSubcategories - 1)
        } else if (pageNumberSubcategories === 1 && subcategories?.length === 0 && totalPages > 1) {
            setPageNumberSubcategories(pageNumberSubcategories + 1)

        }
    }, [subcategories, totalPages])

    return (
        <>
            {message && (
                <Alert className='block mb-4 dark:bg-[#a5bffc21] dark:text-white text-[16px]' >
                    <span className="font-medium">{message}</span>
                </Alert>
            )}
            <div className='overflow-x-auto'>
                <Table hoverable className='w-full'>
                    <TableHead className="text-center dark:bg-gray  bg-blue text-white">
                        <TableHeadCell>Subcategory name</TableHeadCell>
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
                        {subcategories && subcategories.length > 0 ? (
                            subcategories.map(sub => (
                                <TableRow key={sub.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-black text-[16px] border-y border-y-[#ccc]">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                        {sub.name}
                                    </TableCell>
                                    <TableCell className={`${sub.status == 1 ? 'dark:text-green-500 text-green-500' : 'dark:text-red text-red'}`}>
                                        {sub.status == 1 ? 'Active' : 'Not Active'}
                                    </TableCell>
                                    <TableCell>{sub.code}</TableCell>
                                    {user.role === 'admin' && (
                                        <TableCell className=''>
                                            {user.id === sub.user_id && (
                                                <Link href={`/subcategories/${sub.id}`} className="font-medium text-white bg-blue px-4 py-1 rounded-sm dark:text-white dark:bg-black">
                                                    Edit
                                                </Link>
                                            )}
                                        </TableCell>
                                    )}
                                    <TableCell className="space-x-2">
                                        {user.role === 'user' ? (
                                            <>
                                                <Link href={`/subcategories/${sub.id}`} className="font-medium text-white bg-blue px-4 py-1 rounded-sm dark:text-white dark:bg-black">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(sub.id)} type="submit" className="font-medium text-white bg-red px-4 py-1 rounded-sm  dark:text-white dark:bg-red">
                                                    Delete
                                                </button>
                                            </>
                                        ) : (

                                            <button onClick={() => handleDelete(sub.id)} type="submit" className="font-medium text-white bg-red px-4 py-1 rounded-sm  dark:text-white dark:bg-red">
                                                Delete
                                            </button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center text-[30px] font-bold dark:text-red">
                                    No Subcategories Here
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}