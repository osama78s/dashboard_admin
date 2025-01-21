'use client'
import { MdOutlineSearch } from "react-icons/md";
import axios from 'axios';
import { useBrands } from "../Context/Brands";

export default function SearchOnBrands({ token }) {

    const { setBrands } = useBrands();

    const handleChangeBrands = async (e) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/users/search/brand?brands=${e.target.value}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.data;
            setBrands(data?.data?.brands);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='flex md:h-[35px] shadowNav'>
            <input
                onChange={handleChangeBrands}
                className="focus:outline-none focus:ring-0 border-none dark:text-black w-full md:w-[280px]"
                type="text"
                placeholder="Search For Brands..."
            />
            <MdOutlineSearch className='dark:bg-gray bg-blue text-white h-full p-2 w-[45px]' />
        </form>
    )
}

