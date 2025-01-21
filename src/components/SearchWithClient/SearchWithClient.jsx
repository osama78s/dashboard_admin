'use client'
import { MdOutlineSearch } from "react-icons/md";
import axios from 'axios';
import { useProducts } from '../Context/Products';

export default function SearchOnProducts({ token }) {

    const { setProducts } = useProducts();

    const handleChangeProducts = async (e) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/users/search/product?products=${e.target.value}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.data;
            setProducts(data?.data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='flex md:h-[35px] shadowNav'>
            <input
                onChange={handleChangeProducts}
                className="focus:outline-none focus:ring-0 border-none dark:text-black w-full md:w-[280px]"
                type="text"
                placeholder="Search For Products..."
            />
            <MdOutlineSearch className='dark:bg-gray bg-blue text-white h-full p-2 w-[45px]' />
        </form>
    )
}
