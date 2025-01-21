import CreateBrandForm from "@/components/CreateBrandForm/CreateBrandForm";

export default async function CreateBrand() {

  return (
    <>
      <div className="dark:text-white py-[10px]">
        <h1 className='text-[50px] text-blue dark:text-white font-semibold'>Create Brand</h1>
        <CreateBrandForm />
      </div>
    </>
  )

}
