'use client'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import './style.css';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { UsePageNumber } from "../Context/PageNumber";
import { useUsers } from "../Context/Users";

export default function UserPagination({ user }) {
    const { setPageNumberUsers , totalPages, pageNumberUsers } = UsePageNumber();
    const { users } = useUsers();
    const pageCount = totalPages

    const handlePageChange = (number) => {
        setPageNumberUsers(number.selected + 1);
    };

    return (
        <>
            {user && users?.length > 0 && (
                <ReactPaginate
                    breakLabel=".."
                    pageCount={pageCount}
                    nextLabel={
                        <span className={
                            `${(pageNumberUsers === totalPages && totalPages > 1) || totalPages === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'opacity-[1]'
                            } 
                                h-full flex gap-[2px] items-center px-4  bg-blue text-white dark:bg-gray dark:text-white transition-all duration-300 ease-in-out text-[17px]`
                        }>
                            Next
                            <MdOutlineKeyboardArrowRight className="text-[25px] right" />
                        </span>
                    }
                    previousLabel={
                        <span className={
                            `${(pageNumberUsers === 1 && totalPages > 1) || totalPages === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'opacity-[1]'
                            } 
                                h-full flex gap-[2px] items-center px-4 bg-blue text-white dark:bg-gray dark:text-white transition-all duration-300 ease-in-out text-[17px]`
                        }>
                            <MdOutlineKeyboardArrowLeft className="text-[25px] left" />
                            Prev
                        </span>
                    }
                    onPageChange={handlePageChange}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    renderOnZeroPageCount={null}
                    className="dark:bg-[#2b2828d4] shadowNav dark:text-white flex justify-center items-center gap-1 mt-4 relative"
                    nextClassName="next"
                    previousClassName="prev"
                    pageLinkClassName="w-[40px] h-[40px] flex items-center justify-center gap-2 rounded-md hover:dark:bg-gray hover:dark:text-white hover:bg-blue hover:text-white transition-all duration-300 ease-in-out"
                    breakClassName="w-[40px] h-[40px] rounded-md flex items-center justify-center text-[25px] hover:dark:bg-gray hover:dark:text-white hover:bg-blue hover:text-white transition-all duration-300 ease-in-out"
                    breakLinkClassName="w-full h-full text-center"
                    activeLinkClassName="dark:bg-gray dark:text-white bg-blue text-white"
                />
            )}
        </>
    );
}
