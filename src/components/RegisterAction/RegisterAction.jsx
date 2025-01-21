'use server'
import { cookies } from 'next/headers';
import { RegisterShecma } from '../RegisterSchema/RegisterSchema'
import { redirect } from 'next/navigation';

export default async function RegisterAction(state,formData) {

    const formValues = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      gender: formData.get('gender'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
    }

    const validationFields = RegisterShecma.safeParse(formValues);

    if(!validationFields.success){
      return {
        errors: validationFields.error.flatten().fieldErrors,
        data: formValues,
      }
    }

    const res = await fetch('http://127.0.0.1:8000/api/users/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    
    if(!res.ok){
      const dataErrors = await res.json();
      console.log(dataErrors);
      return { errors: dataErrors.errors, data: formValues }
    }

    const data = await res.json();
    const cookieStore = await cookies(); 
    cookieStore.set('email', data.data.email);
    cookieStore.set('token', data.data.token);
    redirect('/verify');
}
