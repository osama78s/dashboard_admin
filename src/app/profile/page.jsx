import ProfileForm from '@/components/ProfileForm/ProfileForm'
import ToastMessage from '@/components/ToastMessage/ToastMessage'
import React from 'react'

export default function Profile() {
  return (
    <div className='relative'>
      <ToastMessage />
      <div className="dark:text-white py-[10px]">
        <h1 className='text-[50px] text-blue dark:text-white font-semibold'>Edit Profile</h1>
        <ProfileForm />
      </div>
    </div>
  )
}
