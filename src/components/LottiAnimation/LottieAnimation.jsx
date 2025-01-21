'use client'
import React, { useEffect, useState } from 'react'
import animation from '../../../public/Animation.json';
import Lottie from 'lottie-react';

export default function LottieAnimation() {

    return (
        <div className='absolute left-0 top-0 w-full h-full flex items-center justify-center z-[2] bg-black dark:bg-black'>
            <Lottie className='w-[500px]' animationData={animation} loop={true} />
        </div>
    )
}
