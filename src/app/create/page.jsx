'use server';
import CreateProductForm from '@/components/CreateProductForm/CreateProductForm'
import GetUserCookie from '@/components/GetUserCookie/GetUserCookie';
import ToastMessage from '@/components/ToastMessage/ToastMessage';

export default async function CreateProduct() {

  let data = [];
  const { token } = await GetUserCookie();

  const res = await fetch('http://127.0.0.1:8000/api/users/subcategories-brands', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (res.ok) {
    const resData = await res.json();
    data = resData.data;
  }

  return (
    <div className='relative'>
      <ToastMessage/>
      <div className="dark:text-white  py-[10px]">
        <h1 className='text-[50px] dark:text-white text-blue font-semibold'>Create Product</h1>
        <CreateProductForm data={data} />
      </div>
    </div>

  )
}
