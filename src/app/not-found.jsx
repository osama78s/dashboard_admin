import React from 'react'
import Image from 'next/image'
import notFound from '../../public/6333074.jpg'
import Link from 'next/link'
export default function NotFound() {
  return (
    <div className='absolute left-0 top-0 w-full h-full dark:bg-white z-[4] flex flex-col gap-5 items-center justify-center'>
        <Image src={notFound} height={800} width={800} alt='Not Found Image'/>
        <Link href={'/'} className='bg-black rounded-sm px-4 py-2'>Go To Dashboard</Link>
    </div>
  )
}
