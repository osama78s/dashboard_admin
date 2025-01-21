'use client'
import { MdOutlineSearch } from "react-icons/md";
import axios from 'axios';
import { useCategories } from "../Context/Categories";

export default function SearchOnCategories({ token }) {

    const { setCategories } = useCategories();

    const handleChangeCategories = async (e) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/users/search/category?categories=${e.target.value}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.data;
            console.log(data.data.categories)
            setCategories(data?.data?.categories);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='flex md:h-[35px] shadowNav'>
            <input
                onChange={handleChangeCategories}
                className="focus:outline-none focus:ring-0 border-none dark:text-black w-full md:w-[280px]"
                type="text"
                placeholder="Search For Categories..."
            />
            <MdOutlineSearch className='dark:bg-gray bg-blue text-white h-full p-2 w-[45px]' />
        </form>
    )
}
