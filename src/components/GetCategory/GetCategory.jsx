import { notFound } from 'next/navigation';
import GetUserCookie from '../GetUserCookie/GetUserCookie'

export default async function GetCategory(id) {

    const { token } = await GetUserCookie();

    const res = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!res.ok){
        return notFound()
    }

    const data = await res.json();
    return data.data.category;
}
