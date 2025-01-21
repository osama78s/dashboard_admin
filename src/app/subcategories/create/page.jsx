import CreateSubcategoryForm from "@/components/CreateSubcategoryForm/CreateSubcategoryForm";
import GetUserCookie from "@/components/GetUserCookie/GetUserCookie";

export default async function CreateSubcategory() {
  const { token } = await GetUserCookie();
  return (
    <>
      <div className="dark:text-white py-[10px]">
        <h1 className='text-[50px] dark:text-white text-blue font-semibold'>Create Subcategory</h1>
        <CreateSubcategoryForm token={token}/>
      </div>
    </>
  )

}
