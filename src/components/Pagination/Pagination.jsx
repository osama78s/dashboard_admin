'use client'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import './style.css';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { UsePageNumber } from "../Context/PageNumber";
import { useProducts } from "../Context/Products";

export default function Pagination({ user }) {
    const { setPageNumber, totalPages, pageNumber } = UsePageNumber();
    const { products } = useProducts();
    const pageCount = totalPages;

    const handlePageChange = (number) => {
        setPageNumber(number.selected + 1);
    };

    return (
        <>
            {user && products?.length > 0 && (
                <ReactPaginate
                    breakLabel=".."
                    pageCount={pageCount}
                    nextLabel={
                        <span className={
                            `${(pageNumber === totalPages && totalPages > 1) || totalPages === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'opacity-[1]'
                            } 
                                h-full flex gap-[2px] items-center px-4 dark:bg-gray bg-blue text-white dark:text-white transition-all duration-300 ease-in-out text-[17px]`
                        }>
                            Next
                            <MdOutlineKeyboardArrowRight className="text-[25px] right" />
                        </span>
                    }
                    previousLabel={
                        <span className={
                            `${(pageNumber === 1 && totalPages > 1) || totalPages === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'opacity-[1]'
                            } 
                                h-full flex gap-[2px] items-center px-4 dark:bg-gray bg-blue text-white dark:text-white transition-all duration-300 ease-in-out text-[17px]`
                        }>
                            <MdOutlineKeyboardArrowLeft className="text-[25px] left" />
                            Prev
                        </span>
                    }
                    onPageChange={handlePageChange}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    renderOnZeroPageCount={null}
                    className="dark:bg-[#2b2828d4] bg-white shadowNav dark:text-white flex justify-center items-center gap-1 mt-4 mb-6 md:mb-0 relative"
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
