'use server';
import { editSubcategorySchema } from '../EditSubcategorySchema/EditSubcategorySchema';
import GetUserCookie from '../GetUserCookie/GetUserCookie';

export default async function EditSubcategoryAction(state,formData) {
     const { token } = await GetUserCookie();
        if(!token){
            return {
                errors: 'Unauthorized',
                suucess: false
            }
        }

        const formValues = {
            name: formData.get('name'),
            code: formData.get('code'),
            category_id: formData.get('category_id'),
            status: formData.get('status'),
        }
        
        const validationFieldes = editSubcategorySchema.safeParse(formValues);

        if(!validationFieldes.success){
            return { 
                errors: validationFieldes.error.flatten().fieldErrors,
                data: formValues,
                id: state.id
            }
        }

        const res = await fetch(`http://127.0.0.1:8000/api/subcategories/update/${state.id}`, {
            method: 'POST',
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formValues)
        })

        if(!res.ok){
            const errorData = await res.json();
            return {
                errors: errorData.errors,
                data: formValues
            }
        }

        return { errors: {}, message: 'Updated Subcategory Successfully' }
}
