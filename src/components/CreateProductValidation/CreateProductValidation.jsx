'use server';
import { createProductSchema } from '../ValidationProduct/ValidationProduct'
import { redirect } from 'next/navigation';
import GetUserCookie from '../GetUserCookie/GetUserCookie';

export default async function CreateProductValidation(formState,formData) {
    const {token} = await GetUserCookie();
    
    if(!token){
        return {
            errors: 'Unauthorized',
            suucess: false
        }
    }

    const formValues = {
        name: formData.get('name'),
        price: formData.get('price'),
        quantity: formData.get('quantity'),
        code: formData.get('code'),
        brand_id: formData.get('brand_id'),
        subcategory_id: formData.get('subcategory_id'),
        image: formData.get('image'),
        desc: formData.get('desc'),
        status: formData.get('status'),
    }

    const validationFieldes = createProductSchema.safeParse(formValues);
    if(!validationFieldes.success){
        return {
            errors: validationFieldes.error.flatten().fieldErrors,
            data: formValues,
            success: false
        }
    }   

        const newForm = new FormData();
        newForm.append('image', formValues.image);
        newForm.append('name', formValues.name);
        newForm.append('price', formValues.price);
        newForm.append('quantity', formValues.quantity);
        newForm.append('code', formValues.code);
        newForm.append('brand_id', formValues.brand_id);
        newForm.append('subcategory_id', formValues.subcategory_id);
        newForm.append('status', formValues.status);
        newForm.append('desc', formValues.desc);

        const res = await fetch('http://127.0.0.1:8000/api/products/create', {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
             },
             body: newForm
        })

        if(!res.ok){
            const errorData = await res.json();
            console.log(errorData)
            return {
                errors: errorData.errors,
                data: formValues,
                error: errorData.errors.error,
                success: false
            }
        }
        return {
            errors: {},
            data: {},
            message: 'Create Product Successfully'
        }
}
