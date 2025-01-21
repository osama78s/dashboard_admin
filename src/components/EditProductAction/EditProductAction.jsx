'use server'
import GetUserCookie from '../GetUserCookie/GetUserCookie';
import { editProductSchema } from '../EditProductSchema/EditProductSchema';

export default async function EditProductAction(state, formData) {
    
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
            desc: formData.get('desc'),
            status: formData.get('status'),
        }
        
        const validationFieldes = editProductSchema.safeParse(formValues);

        if(!validationFieldes.success){
            return { 
                errors: validationFieldes.error.flatten().fieldErrors,
                data: formValues,
                id: state.id
            }
        }

        const newForm = new FormData();
        newForm.append('name', formValues.name)
        newForm.append('price', formValues.price)
        newForm.append('quantity', formValues.quantity)
        newForm.append('code', formValues.code)
        newForm.append('brand_id', formValues.brand_id)
        newForm.append('subcategory_id', formValues.subcategory_id)
        newForm.append('desc', formValues.desc)
        newForm.append('status', formValues.status)
        const image =  (formData.get('image'));
        if( image && image.size !== 0 && image.name !== 'undefiend'){
            newForm.append('image', image);
        }

        const res = await fetch(`http://127.0.0.1:8000/api/products/update/${state.id}`, {
            method: 'POST',
            headers : {
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: newForm
        })

        if(!res.ok){
            const errorData = await res.json();
            return {
                errors: errorData.errors,
                data: formValues
            }
        }

        return { errors: {}, message: 'Updated Product Successfully' }
}
