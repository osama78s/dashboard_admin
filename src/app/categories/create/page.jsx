import CreateCategoryForm from '@/components/CreateCategoryForm/CreateCategoryForm';

export default async function CreateCategory() {

  return (
    <>
      <div className="dark:text-white py-[10px]">
        <h1 className='text-[50px] text-blue dark:text-white font-semibold'>Create Category</h1>
        <CreateCategoryForm />
      </div>
    </>
  )

}
