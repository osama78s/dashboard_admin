'use client'
import { useEffect } from "react";
import { useHandleSideBar } from "../Context/HandleSideBar"
import { CiCircleList } from "react-icons/ci";
import { usePathname } from "next/navigation";

export default function ListIcon() {
    const pathName = usePathname();

    const allowedPath = !(pathName.startsWith('/login') || pathName.startsWith('/register') || pathName.startsWith('/verify'))

    const { setHandleSideBar } = useHandleSideBar();

    const handleSideBar = (e) => {
        e.stopPropagation();
        setHandleSideBar(prev => !prev);
    }

    useEffect(() => {
        window.addEventListener('click', () => {
            setHandleSideBar(false);
        })
    }, [])

    return (
        <>
            {allowedPath && (
                <CiCircleList onClick={handleSideBar}
                    className='cursor-pointer dark:text-white text-[20px] lg:hidden' />
            )}
        </>
    )
}
