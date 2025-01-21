'use client'
import { MdOutlineSearch } from "react-icons/md";
import axios from 'axios';
import { useUsers } from "../Context/Users";

export default function SearchOnUsers({ token }) {

    const { setUsers } = useUsers();

    const handleChangeUsers = async (e) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/users/search/user?users=${e.target.value}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.data;
            setUsers(data?.users);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='flex md:h-[35px] shadowNav'>
            <input
                onChange={handleChangeUsers}
                className="focus:outline-none focus:ring-0 border-none dark:text-black w-full md:w-[280px]"
                type="text"
                placeholder="Search For Users..."
            />
            <MdOutlineSearch className='dark:bg-gray bg-blue text-white h-full p-2 w-[45px]' />
        </form>
    )
}

