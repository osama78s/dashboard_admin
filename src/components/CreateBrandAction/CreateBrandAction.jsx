'use server';
import GetUserCookie from '../GetUserCookie/GetUserCookie';
import { editbrandSchema } from '../BrandSchema/BrandSchema';

export default async function CreateBrandAction(state,formData) {
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
        
        const validationFieldes = editbrandSchema.safeParse(formValues);

        if(!validationFieldes.success){
            return { 
                errors: validationFieldes.error.flatten().fieldErrors,
                data: formValues,
            }
        }

        const newForm = new FormData();
        newForm.append('name', formValues.name);
        newForm.append('status', formValues.status);
        newForm.append('code', formValues.code);
        const image = formData.get('image');
        if(image && image.size > 0){
            newForm.append('image', image);
        }

        const res = await fetch(`http://127.0.0.1:8000/api/brands/create`, {
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
                code: errorData?.errors?.error,
                data: formValues
            }
        }
        return { errors: {}, message: 'Create Brand Successfully' }
}
