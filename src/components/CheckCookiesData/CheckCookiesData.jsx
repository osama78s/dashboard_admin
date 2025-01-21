'use client'
import Cookies from "js-cookie";
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export const CheckCookiesData = () => {
    const pathName = usePathname();
    useEffect(() => {
        const email = Cookies.get('email');
        const token = Cookies.get('token');
        if (!pathName.startsWith('/verify') && email && token) {
            Cookies.remove('email');
            Cookies.remove('token');
        }
    }, [pathName]);

    return null;
}

