'use server'
import React from 'react'
import GetUserCookie from "../GetUserCookie/GetUserCookie";
import TableSubcategoriesBodyComponent from '../TableSubcategoriesBodyComponent/TableSubcategoriesBodyComponent';
import PaginationSubcategories from '../PaginationSubcategories/PaginationSubcategories';

export default async function SubcategoriesTable({ user }) {
  const { token } = await GetUserCookie();
  return (
    <>
      <div className="overflow-x-auto">
        <TableSubcategoriesBodyComponent user={user} token={token}/>
      </div>
      <PaginationSubcategories user={user} />
    </>
  )
}
