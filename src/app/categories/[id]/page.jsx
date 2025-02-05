import EditCategoryForm from '@/components/EditCategoryForm/EditCategoryForm';
import GetCategory from '@/components/GetCategory/GetCategory';
import ToastMessage from '@/components/ToastMessage/ToastMessage';
import UpdateId from '@/components/UpdateId/UpdateID';

export default async function EditCategory({ params }) {
  const { id } = await params;
  const category = await GetCategory(id);
  
  return (
    <>
      <ToastMessage/>
      <UpdateId id={id} />
      <div className="dark:text-white py-[10px]">
        <h1 className='text-[50px] text-blue dark:text-white font-semibold'>Edit Category</h1>
        <EditCategoryForm id={id} category={category} />
      </div>
    </>
  )
}
