'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Alert } from "flowbite-react";
import { useMessages } from '../Context/Messages';
import PageNumber, { UsePageNumber } from '../Context/PageNumber';
import { useProducts } from '../Context/Products';
import axios from 'axios';

export default function TableBodyComponent({ user, token }) {
    const { products, setProducts } = useProducts();
    const { message, setMessage } = useMessages();
    const { pageNumber, setTotalPages, totalPages, setPageNumber } = UsePageNumber();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/products?page=${pageNumber}`, {
                headers: {

                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.data;
            setProducts(data?.data?.products?.data);
            setTotalPages(data?.data?.total);
        }
        if (token) {
            fetchProducts({ pageNumber, token, setProducts, setTotalPages });
        }
    }, [token, pageNumber]);
    

    useEffect(() => {
        if (pageNumber > 1 && products?.length === 0) {
            setPageNumber(pageNumber - 1)
        }else if (pageNumber === 1 && products?.length === 0 && totalPages > 1){
            setPageNumber(pageNumber + 1)
            
        }
    }, [products,totalPages])


    const handleDelete = async (id) => {
        const res = await axios.delete(`http://127.0.0.1:8000/api/products/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setProducts(res?.data?.data?.products?.data);
        setTotalPages(res?.data?.data?.total);
        setMessage('Product Deleted Successfully');
    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }, [message]);


    return (
        <>
            {message && (
                <Alert className='block mb-4 dark:bg-[#a5bffc21] dark:text-white  text-[16px]' >
                    <span className="font-medium">{message}</span>
                </Alert>
            )}
            <Table hoverable>
                <TableHead className="text-center dark:bg-gray shadowNav bg-blue text-white">
                    <TableHeadCell>Image</TableHeadCell>
                    <TableHeadCell>Product name</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>Price</TableHeadCell>
                    <TableHeadCell>Quantity</TableHeadCell>
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
                    {products && products.length > 0 ? (
                        products.map(product => (
                            <TableRow key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-black text-[16px] border-y border-y-[#ccc]">
                                <TableCell className="flex justify-center items-center">
                                    <img className="rounded-full object-cover w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] shadwos-2" src={product.image_url} alt="Product Image" />
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                    {product.name}
                                </TableCell>
                                <TableCell className={`${product.status == 1 ? 'dark:text-green-500 text-green-500' : 'dark:text-red text-red'}`}>
                                    {product.status == 1 ? 'Active' : 'Not Active'}
                                </TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.code}</TableCell>
                                {user.role === 'admin' && (
                                    <TableCell className=''>
                                        {user.id === product.user_id && (
                                            <Link href={`/edit/${product.id}`} className="font-medium text-white bg-blue px-4 py-1 rounded-sm dark:text-white dark:bg-black">
                                                Edit
                                            </Link>
                                        )}
                                    </TableCell>
                                )}
                                <TableCell className="space-x-2">
                                    {user.role === 'user' ? (
                                        <>
                                            <Link href={`/edit/${product.id}`} className="font-medium text-cyan-600 px-4 py-1 rounded-sm dark:text-white dark:bg-black">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(product.id)} type="submit" className="font-medium text-white px-4 py-1 rounded-sm  dark:text-white dark:bg-red bg-red">
                                                Delete
                                            </button>
                                        </>
                                    ) : (

                                        <button onClick={() => handleDelete(product.id)} type="submit" className="font-medium px-4 py-1 rounded-sm  dark:text-white dark:bg-red bg-red text-white">
                                            Delete
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center text-[30px] font-bold dark:text-red text-red">
                                No Products Here
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}