import { CreateSubcategorySchema } from "../CreateSubcategorySchema/CreateSubcategorySchema";
import GetUserCookie from "../GetUserCookie/GetUserCookie";

export default async function CreateSubCategoryAction(state, formData) {
    const { token } = await GetUserCookie();

    const formValues = {
        name: formData.get('name'),
        code: formData.get('code'),
        category_id: formData.get('category_id'),
        status: formData.get('status')
    }

    const validatedFieldes = CreateSubcategorySchema.safeParse(formValues);
    if(!validatedFieldes.success){
        return {
            errors: validatedFieldes.error.flatten().fieldErrors,
            data: formValues
        }
    }

    const res = await fetch ('http://127.0.0.1:8000/api/subcategories/create', {
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
        return { errors: errorsData.errors, error: errorsData.errors.error, data: formValues }
    }

    return { message: 'Create Subcategory Successfully' };
}
