'use client';
import { usePathname } from 'next/navigation';
import { IoCreateOutline } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { Sidebar } from 'flowbite-react';
import { FaUserEdit } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { useLengthOfUsers } from '../Context/LengthOfUsers';
import { useUserCookie } from '../Context/UserCookie';
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TbBrandSuperhuman } from "react-icons/tb";
import { useHandleSideBar } from '../Context/HandleSideBar';
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SidebarComponent() {
    const { userCookie } = useUserCookie()
    const pathName = usePathname();
    const { length } = useLengthOfUsers();
    const { handleSideBar } = useHandleSideBar();
    const router = useRouter();

    const handleLogout = async () => {
        try{
            const res = axios.get('http://localhost:8000/api/users/logout', {
                headers: {
                    'Authorization': `Bearer ${userCookie.token}`
                }
            })
            Cookies.remove('user');
            router.push('/login');
        } catch(error){
            console.log(error)
        }
    }

    // القسم اللي مفتوح دلوقت
    const [openCollapse, setOpenCollapse] = useState(null); 
    
    // لما ادوس علي اي واحد فيهم لو وهو بيساوي القيمه المتخزنه فمش هعمل حاجه طب لو مش بيساويه معناها ان عاوز اقفله
    const handleCollapseToggle = (collapseId) => {
        setOpenCollapse(openCollapse === collapseId ? null : collapseId);
    };

    const allowedPath = !(pathName === '/register' || pathName === '/login' || pathName === '/verify' || pathName === '/forgetPassword')

    return (
        <div onClick={(e) => e.stopPropagation()}
         className={` ${handleSideBar ? 'left-0 ' : 'left-[-100%] '} lg:sticky top-0 h-full lg:h-screen lg:flex absolute transition-all duration-500 ease-in z-[2]`}>
            {allowedPath && (
                <div className='dark:bg-gray dark:text-white text-white text-center bg-blue h-full py-2 lg:w-[220px] xl:w-[250px]'>
                    <Link href='/' className='flex items-center gap-2 p-2 border-b dark:border-neutral-700 border-transparent pb-6'>
                        <HiChartPie className='lg:w-[25px] lg:h-[25px] xl:w-[30px] xl:h-[30px] w-[30px] h-[30px]' />
                        <span className='lg:text-[35px] xl:text-[40px] text-[40px] font-bold leading-2 tracking-wide'>Dashboard</span>
                    </Link>
                    <Sidebar className='h-auto lg:w-auto' aria-label="Sidebar with multi-level dropdown example">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup className='text-start flex flex-col gap-3 md:gap-4'>

                                <Sidebar.Collapse
                                open={openCollapse === 'products'} 
                                onClick={() => handleCollapseToggle('products')}
                                className='lg:text-[18px] xl:text-[20px] text-[20px] font-semibold' icon={AiFillProduct} label="Products">
                                    <div className='bg-white text-title flex flex-col gap-3 dark:bg-[#0000008c] dark:text-white rounded-md p-2'>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <IoMdEye className='w-[20px] h-[20px] ' />
                                            <Link href='/' className='text-[17px]'>
                                                Show
                                            </Link>
                                        </div>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <IoIosCreate className='w-[20px] h-[20px]' />
                                            <Link href='/create' className='text-[17px]'>
                                                Create
                                            </Link>
                                        </div>
                                    </div>
                                </Sidebar.Collapse>

                                <Sidebar.Collapse 
                                open={openCollapse === 'categories'} 
                                onClick={() => handleCollapseToggle('categories')} 
                                className='lg:text-[18px] xl:text-[20px] text-[20px] font-semibold' icon={MdCategory} label="Categories">
                                    <div className='bg-white text-title flex flex-col gap-3 dark:bg-[#0000008c] dark:text-white rounded-md p-2'>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <IoMdEye className='w-[20px] h-[20px]' />
                                            <Link href='/categories' className='text-[17px]'>
                                                Show
                                            </Link>
                                        </div>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <IoIosCreate className='w-[20px] h-[20px]' />
                                            <Link href='/categories/create' className='text-[17px]'>
                                                Create
                                            </Link>
                                        </div>
                                    </div>
                                </Sidebar.Collapse>

                                <Sidebar.Collapse 
                                open={openCollapse === 'subcategories'} 
                                onClick={() => handleCollapseToggle('subcategories')}
                                className='lg:text-[18px] xl:text-[20px] text-[20px] font-semibold' icon={BiSolidCategoryAlt} label="Subcategories">
                                    <div className='bg-white text-title flex flex-col gap-3 dark:bg-[#0000008c] dark:text-white rounded-md p-2'>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <IoMdEye className='w-[20px] h-[20px]' />
                                            <Link href='/subcategories' className='text-[17px]'>
                                                Show
                                            </Link>
                                        </div>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <IoIosCreate className='w-[20px] h-[20px]' />
                                            <Link href='/subcategories/create' className='text-[17px]'>
                                                Create
                                            </Link>
                                        </div>
                                    </div>
                                </Sidebar.Collapse>

                                <Sidebar.Collapse 
                                open={openCollapse === 'brands'} 
                                onClick={() => handleCollapseToggle('brands')}
                                className='lg:text-[18px] xl:text-[20px] text-[20px] font-semibold' icon={TbBrandSuperhuman} label="Brands">
                                    <div className='bg-white text-title flex flex-col gap-3 dark:bg-[#0000008c] dark:text-white rounded-md p-2'>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <IoMdEye className='w-[20px] h-[20px]' />
                                            <Link href='/brands' className='text-[17px]'>
                                                Show
                                            </Link>
                                        </div>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <IoIosCreate className='w-[20px] h-[20px]' />
                                            <Link href='/brands/create' className='text-[17px]'>
                                                Create
                                            </Link>
                                        </div>
                                    </div>
                                </Sidebar.Collapse>

                                <Sidebar.Collapse 
                                open={openCollapse === 'pages'} 
                                onClick={() => handleCollapseToggle('pages')}
                                className='lg:text-[18px] xl:text-[20px] text-[20px] font-semibold' icon={FaFolderOpen} label="Pages">
                                    <div className='bg-white text-title flex flex-col gap-3 dark:bg-[#0000008c] dark:text-white rounded-md p-2'>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <FaUserEdit className='w-[20px] h-[20px]' />
                                            <Link href='/register' className='text-[17px]'>
                                                Register
                                            </Link>
                                        </div>
                                        <div className='flex items-center gap-2 pl-2'>
                                            <FaUserCog className='w-[20px] h-[20px]' />
                                            <Link href='/login' className='text-[17px]'>
                                                Login
                                            </Link>
                                        </div>
                                    </div>
                                </Sidebar.Collapse>

                                {userCookie && userCookie.role === 'admin' && (
                                    <Sidebar.Item className='lg:text-[18px] xl:text-[20px] text-[20px] font-semibold' as={Link} href="/users" icon={HiUser}>
                                        <div className="flex items-center justify-between">
                                            <span className='text-[17px]'>Users</span>
                                            <span>{length}</span>
                                        </div>
                                   </Sidebar.Item>
                                )} 

                                {userCookie &&  (
                                    <Sidebar.Item onClick={handleLogout} className='lg:text-[18px] md:hidden cursor-pointer xl:text-[20px] text-[20px] font-semibold' icon={CiLogout}>
                                        <div className="flex items-center justify-between">
                                            <span className='text-[17px]'>Logout</span>
                                        </div>
                                    </Sidebar.Item>
                                )}

                                {userCookie && (
                                    <Sidebar.Item className='md:hidden text-[20px] ml-[-5px] p-0 font-semibold' as={Link} href="/profile">
                                        <div className="flex items-center gap-2">
                                            <img src={userCookie.image_url} className='rounded-full w-[30px] h-[30px] object-center' alt="" />
                                            <span className='text-[17px]'>Profile</span>
                                        </div>
                                    </Sidebar.Item>
                                )}

                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </div>
            )}
        </div>
    );
}
