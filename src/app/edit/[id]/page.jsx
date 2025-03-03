'use server'
import Loading from '@/app/loading';
import EditProductForm from '@/components/EditProductForm/EditProductForm';
import GetProduct from '@/components/GetProduct/GetProduct';
import Title from '@/components/Title/Title';
import ToastMessage from '@/components/ToastMessage/ToastMessage';
import UpdateId from '@/components/UpdateId/UpdateId';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

export default async function page({ params }) {
  const { id } = params;
  const product = await GetProduct(id);
  if (!product) {
    return notFound()
  }
  return (
    <>
      <UpdateId id={id} />
      <ToastMessage/>
      <div className="dark:text-white py-[10px]">
        <h1 className='text-[50px] text-blue dark:text-white font-semibold'>Edit Product</h1>
        <EditProductForm id={id} product={product} />
      </div>
    </>
  )
}
