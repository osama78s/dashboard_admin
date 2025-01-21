'use client'
import React, { use, useEffect, useState } from 'react'
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import './style.css';
import { useThem } from '../Context/Them';

export default function ButtonThem() {
    const { them, setTheme } = useThem();
    const [dropDown, setDropDown] = useState(false);

    useEffect(() => {
        const removeDropDown = (e) => {
            // التأكد من أن النقر خارج القائمة
            if (!e.target.closest('.dropdown-container')) {
                setDropDown(false);
            }
        };
        document.body.addEventListener('click', removeDropDown);
        const stroageThem = localStorage.getItem('them') || 'light';
        setTheme(stroageThem);
        document.documentElement.classList.add(stroageThem);
    }, []);

    const handleThem = (e,newThem) => {
        e.stopPropagation();
        setTheme(newThem);
        localStorage.setItem('them', newThem);
        document.documentElement.classList.remove(them);
        document.documentElement.classList.add(newThem);
        setDropDown(prev => !prev);
    }

    const handleEvent = (e) => {
        e.stopPropagation();
        setDropDown(prev => !prev);
    }
    console.log(dropDown);

    return (
        <div className='dark:text-white text-title dropdown-container'>
            <button className='relative mt-2' onClick={handleEvent}>
                {them === 'light' ? <FaMoon /> : <FiSun />}
                <ul className={`${ dropDown === true ? 'flex flex-col dark:bg-white bg-white shadowNav p-1 gap-1 animation-start' : 'hidden animation-end'} absolute top-[30px] right-0 z-[2]  transform -translate-x-1/2 min-w-[100px] animation`}>
                    <li onClick={(e) => handleThem(e,'dark')} className='dark:text-zinc-800 text-title'>
                        Dark
                    </li>
                    <li onClick={(e) => handleThem(e,'light')} className='dark:text-zinc-800 text-title'>
                        Light
                    </li>
                </ul>
            </button>
        </div>
    )
}
