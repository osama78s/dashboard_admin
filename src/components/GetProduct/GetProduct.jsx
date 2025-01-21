'use server'
import GetUserCookie from '../GetUserCookie/GetUserCookie'

export default async function GetProduct(id) {
    const { token } = await GetUserCookie();
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: 'GET',
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if(res.ok){
        const data = await res.json();
        return data.data;
    }
}
