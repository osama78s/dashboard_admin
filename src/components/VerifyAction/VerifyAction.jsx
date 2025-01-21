'use server';
import { cookies } from 'next/headers';
import React from 'react'
import { VerifySchema } from '../VerifySchema/VerifySchema';
import { redirect } from 'next/navigation';

export default async function VerifyAction(state, formData) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const formValues = {
        code: formData.get('code')
    }

    if (!token) return { errors: { code: 'Token Not Found' }, data: formValues };

    const validatedFields = VerifySchema.safeParse(formValues);
    if (!validatedFields.success)
        return {
            errors:  validatedFields.error.flatten().fieldErrors,
            data: formValues
        }

    const res = await fetch('http://127.0.0.1:8000/api/users/check-code', {
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
        console.log(errorsData);
        return { errors: errorsData.errors, data: formValues }
    }

    const data = await res.json();
    cookieStore.delete('token');
    cookieStore.delete('email');

    cookieStore.set('user', JSON.stringify(data.data.userInDb));
    redirect('/');
}
