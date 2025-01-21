'use client'
import React, { useEffect, useState } from 'react'
import { Dropdown, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Alert } from "flowbite-react";
import { useMessages } from '../Context/Messages';
import { UsePageNumber } from '../Context/PageNumber';
import { useUsers } from '../Context/Users';
import axios from 'axios';

export default function UsersTable({ token }) {
    const { users, setUsers } = useUsers();
    const { message, setMessage } = useMessages();
    const [userRole, setUserRole] = useState(false);
    const { pageNumberUsers, setTotalPages, totalPages, setPageNumberUsers } = UsePageNumber();

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`http://localhost:8000/api/admin/users?page=${pageNumberUsers}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                const data = await res.json();
                const users = data?.data?.users?.data
                setUsers(users);
                setTotalPages(data?.data?.total);
            }
        }
        if (token) {
            fetchUsers()
        }
    }, [token, pageNumberUsers, userRole]);

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:8000/api/admin/users/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUsers(res?.data?.data?.users?.data);
        setTotalPages(res?.data?.data?.total);
        setMessage('Deleted User Successfully');
    }

    const handleChangeRole = async (role, id) => {
        const res = await fetch(`http://localhost:8000/api/admin/updateRole/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ role })
        })

        if (res.ok) {
            setUserRole(prev => !prev);
            setMessage('Updated User Role Successfully');
        }
    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }, [message]);

    useEffect(() => {
        if (pageNumberUsers > 1 && users?.length === 0) {
            setPageNumberUsers(pageNumberUsers - 1)
        } else if (pageNumberUsers === 1 && users?.length === 0 && totalPages > 1) {
            setPageNumberUsers(pageNumberUsers + 1)

        }
    }, [users, totalPages])

    return (
        <>
            {message && (
                <Alert className='block mb-4 dark:bg-[#a5bffc21] dark:text-white text-[16px]' >
                    <span className="font-medium">{message}</span>
                </Alert>
            )}
            <div className="overflow-x-auto">
                <Table hoverable className='w-full '>
                    <TableHead className="text-center dark:bg-gray bg-blue text-white">
                        <TableHeadCell>Image</TableHeadCell>
                        <TableHeadCell>First Name</TableHeadCell>
                        <TableHeadCell>Last Name</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
                        <TableHeadCell>Gender</TableHeadCell>
                        <TableHeadCell>Phone</TableHeadCell>
                        <TableHeadCell>status</TableHeadCell>
                        <TableHeadCell>Role</TableHeadCell>
                        <TableHeadCell className="text-center">
                            Action
                        </TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y text-center">
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <TableRow key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-black text-[16px] border-y border-y-[#ccc]">
                                    <TableCell className="flex justify-center items-center">
                                        <img className="rounded-full object-cover w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] shadwos-2" src={user?.image_url} alt="User Image" />
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                        {user.first_name}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                        {user.last_name}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                        {user.gender === 'm' ? 'Male' : 'Female'}
                                    </TableCell>

                                    <TableCell>{user.phone}</TableCell>

                                    <TableCell className={`${user.status == 1 ? 'dark:text-green-500 text-green-500' : 'dark:text-red text-red'}`}>
                                        {user.status == 1 ? 'Active' : 'Not Active'}
                                    </TableCell>

                                    <TableCell>
                                        <Dropdown className='w-[80px] h-[80px] z-[8] border-none shadowNav' label={user.role} inline>
                                            <Dropdown.Item onClick={() => handleChangeRole('admin', user.id)} className='dark:text-black dark:hover:bg-black hover:bg-blue hover:text-white w-full text-center'>admin</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleChangeRole('user', user.id)} className='dark:text-black dark:hover:bg-black hover:bg-blue hover:text-white w-full text-center'>user</Dropdown.Item>
                                        </Dropdown>
                                    </TableCell>

                                    <TableCell>
                                        <button onClick={() => handleDelete(user.id)} type="submit" className="font-medium text-white bg-red px-4 py-1 rounded-sm  dark:text-white dark:bg-red">
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center text-[30px] font-bold dark:text-red text-red">
                                    No Users Here
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table >
            </div>
        </>
    );
}