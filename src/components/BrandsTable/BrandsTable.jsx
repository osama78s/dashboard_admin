'use server'
import React from 'react'
import GetUserCookie from "../GetUserCookie/GetUserCookie";
import TableBrandsBodyComponent from '../TableBrandsBodyComponent/TableBrandsBodyComponent';
import PaginationBrands from '../PaginationBrands/PaginationBrands';

export default async function BrandsTable({ user }) {
  const { token } = await GetUserCookie();
  return (
    <>
      <div className="overflow-x-auto">
        <TableBrandsBodyComponent user={user} token={token}/>
      </div>
      <PaginationBrands user={user} />
    </>
  )
}
