import EditSubcategoryForm from '@/components/EditSubcategoryForm/EditSubcategoryForm';
import GetCategory from '@/components/GetCategory/GetCategory';
import GetSubcategory from '@/components/GetSubcategory/GetSubcategory';
import ToastMessage from '@/components/ToastMessage/ToastMessage';
import UpdateId from '@/components/UpdateId/UpdateID';

export default async function EditSubcategory({ params }) {
  const { id } = await params;
  const data = await GetSubcategory(id);
  
  return (
    <>
      <ToastMessage/>
      <UpdateId id={id} />
      <div className="dark:text-white py-[10px]">
        <h1 className='text-[50px] text-blue dark:text-white font-semibold'>Edit Subcategory</h1>
        <EditSubcategoryForm id={id} data={data} />
      </div>
    </>
  )
}
