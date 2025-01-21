'use server'
import React from 'react'
import { profileSchema } from '../ProfileSchema/ProfileSchema'
import GetUserCookie from '../GetUserCookie/GetUserCookie'
import {  cookies } from 'next/headers';

export default async function ProfileAction(state, formData) {
    
    const cookiesStore = await cookies();
    const { token } = await GetUserCookie();
    if(!token){
        return { message: 'Not Authanticated User' }
    }
    const formValues = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        gender: formData.get('gender'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city')
    }

    const validatedFieldes = profileSchema.safeParse(formValues);

    if(!validatedFieldes.success){
        return {
            errors: validatedFieldes.error.flatten().fieldErrors,
            data: formValues
        }
    }

    const newForm = new FormData();
    newForm.append('first_name', formValues.first_name)
    newForm.append('last_name', formValues.last_name)
    newForm.append('phone', formValues.phone)
    newForm.append('city', formValues.city)
    newForm.append('address', formValues.address)
    newForm.append('gender', formValues.gender)

    const image = formData.get('image');
    if(image && image.size > 0){
        newForm.append('image', image);
    }

    const res = await fetch ('http://127.0.0.1:8000/api/users/update', {
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
        return { errors:  errorData.errors, data: formValues}
    }

    const data = await res.json();
    cookiesStore.delete('user');
    cookiesStore.set('user', JSON.stringify(data.data.user));
    return { errors: {}, data: data.data, message: 'Update Profile Successfully' }
}
