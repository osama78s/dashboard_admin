// 'use server';
import { categorySchema } from "../EditCategorySchema/EditCategorySchema";
import GetUserCookie from "../GetUserCookie/GetUserCookie";

export default async function CreateCategoryAction(state, formData) {
    const { token } = await GetUserCookie();

    const formValues = {
        name: formData.get('name'),
        code: formData.get('code'),
        status: formData.get('status')
    }

    const validatedFieldes = categorySchema.safeParse(formValues);
    if(!validatedFieldes.success){
        return {
            errors: validatedFieldes.error.flatten().fieldErrors,
            data: formValues
        }
    }

    const res = await fetch ('http://127.0.0.1:8000/api/categories/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
    })

    if(!res.ok){
        const errorsData = await res.json();
        return { errors: errorsData.errors, code: errorsData?.errors?.error, data: formValues }
    }

    return { message: 'Create Category Successfully' };
}
