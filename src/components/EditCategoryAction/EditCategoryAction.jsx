'use server';
import GetUserCookie from '../GetUserCookie/GetUserCookie';
import { categorySchema } from '../EditCategorySchema/EditCategorySchema';

export default async function EditCategoryAction(state,formData) {
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
            status: formData.get('status'),
        }
        
        const validationFieldes = categorySchema.safeParse(formValues);

        if(!validationFieldes.success){
            return { 
                errors: validationFieldes.error.flatten().fieldErrors,
                data: formValues,
                id: state.id
            }
        }

        const res = await fetch(`http://127.0.0.1:8000/api/categories/update/${state.id}`, {
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

        return { errors: {}, message: 'Updated Category Successfully' }
}
