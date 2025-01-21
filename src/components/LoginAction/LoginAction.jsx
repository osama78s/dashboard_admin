'use server'
import { LoginSchema } from '../LoginSchema/LoginSchema'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginAction(state,formData) {
    const cookieStore = await cookies();

    const formValues = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const validationFieldes = LoginSchema.safeParse(formValues);
    if(!validationFieldes.success){
        return { errors: validationFieldes.error.flatten().fieldErrors, data: formValues }
    }


    const res = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    })

    if(!res.ok){
        const errorsData = await res.json();
        return { errors: errorsData.errors, data: formValues }
    }

    const data = await res.json();
    if(data.message === 'Email Not Verified'){
        cookieStore.set('message', 'Please Verfiey Your Email');
        cookieStore.set('token', data.data.token);
        cookieStore.set('email', data.data.user.email);
        redirect('/verify');
    }
    cookieStore.set('user', JSON.stringify(data.data.user));
    redirect('/');
}
