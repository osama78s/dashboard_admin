'use client'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import './style.css';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { UsePageNumber } from "../Context/PageNumber";
import { useBrands } from "../Context/Brands";

export default function PaginationBrands({ user }) {
    const { setPageNumberBrands, totalPages, pageNumberBrands } = UsePageNumber();
    const { brands } = useBrands()
    const pageCount = totalPages;

    const handlePageChange = (number) => {
        setPageNumberBrands(number.selected + 1);
    };

    return (
        <>
            {user && brands?.length > 0 && (
                <ReactPaginate
                    breakLabel=".."
                    pageCount={pageCount}
                    nextLabel={
                        <span className={
                            `${(pageNumberBrands === totalPages && totalPages > 1) || totalPages === 1
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
                            `${(pageNumberBrands === 1 && totalPages > 1) || totalPages === 1
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
