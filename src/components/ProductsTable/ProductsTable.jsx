'use server'
import React from 'react'
import GetUserCookie from "../GetUserCookie/GetUserCookie";
import TableBodyComponent from '../TableBody/TableBody';
import Pagination from '../Pagination/Pagination';

export default async function ProductsTable({ user }) {
  const { token } = await GetUserCookie();
  return (
    <>
      <div className="overflow-x-auto">
        <TableBodyComponent user={user} token={token} />
      </div>
      <Pagination user={user} />
    </>
  )
}
