import EditBrandFrom from '@/components/EditBrandForm/EditBrandForm';
import GetBrand from '@/components/GetBrand/GetBrand';
import ToastMessage from '@/components/ToastMessage/ToastMessage';
import UpdateId from '@/components/UpdateId/UpdateID';

export default async function EditBrand({ params }) {
  const { id } = await params;
  const brand = await GetBrand(id);
  console.log(brand)
  return (  
    <>
      <ToastMessage/>
      <UpdateId id={id} />
      <div className="dark:text-white py-[10px]">
        <h1 className='text-[50px] text-blue dark:text-white font-semibold'>Edit Brand</h1>
        <EditBrandFrom id={id} brand={brand} />
      </div>
    </>
  )
}
