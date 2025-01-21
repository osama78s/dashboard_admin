'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Alert } from "flowbite-react";
import { useMessages } from '../Context/Messages';
import { UsePageNumber } from '../Context/PageNumber';
import { useCategories } from '../Context/Categories';
import axios from 'axios';

export default function TableCategoriesBodyComponent({ user, token }) {
    const { categories, setCategories } = useCategories();
    const { message, setMessage } = useMessages();
    const { pageNumberCategories, setTotalPages, totalPages, setPageNumberCategories } = UsePageNumber();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/categories?page=${pageNumberCategories}`, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.data;
            setCategories(data?.data?.categories?.data);
            setTotalPages(data?.data?.total);
        }
        if (token) {
            fetchProducts();
        }
    }, [token, pageNumberCategories]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/categories/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            setCategories(res?.data?.data?.categories?.data);
            setTotalPages(res?.data?.data?.total);
            setMessage('Category Deleted Successfully');
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
          if (pageNumberCategories > 1 && categories?.length === 0) {
              setPageNumberCategories(pageNumberCategories - 1)
          }else if (pageNumberCategories === 1 && categories?.length === 0 && totalPages > 1){
            setPageNumberCategories(pageNumberCategories + 1)
              
          }
      }, [categories,totalPages])


    return (
        <>
            {message && (
                <Alert className='block mb-4 dark:bg-[#a5bffc21] dark:text-white text-[16px]' >
                    <span className="font-medium">{message}</span>
                </Alert>
            )}
            <Table hoverable className='overflow-x-auto '>
                <TableHead className="text-center dark:bg-gray bg-blue text-white">
                    <TableHeadCell>Categoty name</TableHeadCell>
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
                    {categories && categories.length > 0 ? (
                        categories.map(category => (
                            <TableRow key={category.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-black text-[16px] border-y border-y-[#ccc]">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                    {category.name}
                                </TableCell>
                                <TableCell className={`${category.status == 1 ? 'dark:text-green-500 text-green-500' : 'dark:text-red text-red'}`}>
                                    {category.status == 1 ? 'Active' : 'Not Active'}
                                </TableCell>
                                <TableCell>{category.code}</TableCell>
                                {user.role === 'admin' && (
                                    <TableCell className=''>
                                        {user.id === category.user_id && (
                                            <Link href={`/categories/${category.id}`} className="font-medium text-white bg-blue px-4 py-1 rounded-sm dark:text-white dark:bg-black">
                                                Edit
                                            </Link>
                                        )}
                                    </TableCell>
                                )}
                                <TableCell className="space-x-2">
                                    {user.role === 'user' ? (
                                        <>
                                            <Link href={`/subcategories/${category.id}`} className="font-medium text-white bg-blue px-4 py-1 rounded-sm dark:text-white dark:bg-black">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(category.id)} type="submit" className="font-medium text-white bg-red px-4 py-1 rounded-sm  dark:text-white dark:bg-red">
                                                Delete
                                            </button>
                                        </>
                                    ) : (

                                        <button onClick={() => handleDelete(category.id)} type="submit" className="font-medium text-white bg-red px-4 py-1 rounded-sm  dark:text-white dark:bg-red">
                                            Delete
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center text-[30px] font-bold dark:text-red text-red">
                                No Categories Here
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}