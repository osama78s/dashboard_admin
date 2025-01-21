import { ForgetSchema } from '../ForgetSchema/ForgetSchema'
import { redirect } from 'next/navigation';

export default async function ForgetAction(state, formData) {
    const formValues = {
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const validationFieldies = ForgetSchema.safeParse(formValues);

    if(!validationFieldies.success){
        return {
            errors: validationFieldies.error.flatten().fieldErrors,
            data: formValues
        }
    }

    const res = await fetch ('http://localhost:8000/api/users/forget-password',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues)
    });

    if(!res.ok){
        const errorsData = await res.json();
        return {
            errors: errorsData.errors,
            data: formValues
        }
    }

    redirect('/login');
}
