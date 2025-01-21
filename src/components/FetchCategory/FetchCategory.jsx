export const fetchCategory = async (token) => {
    if(!token) return ;
    const res = await fetch ('http://127.0.0.1:8000/api/categories', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(res.ok){
        const data = await res.json();
        return (data?.data?.categories?.data);
    }
}
