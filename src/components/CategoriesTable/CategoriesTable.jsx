'use server'
import React from 'react'
import GetUserCookie from "../GetUserCookie/GetUserCookie";
import TableCategoriesBodyComponent from '../TableCategoriesBodyComponent/TableCategoriesBodyComponent';
import PaginationCategories from '../PaginationCategories/PaginationCategories';

export default async function CategoriesTable({ user }) {
  const { token } = await GetUserCookie();
  return (
    <>
      <div className="overflow-x-auto">
        <TableCategoriesBodyComponent user={user} token={token}/>
      </div>
      <PaginationCategories user={user} />
    </>
  )
}
