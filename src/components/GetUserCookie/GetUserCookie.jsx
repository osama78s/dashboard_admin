'use server'
import { cookies } from 'next/headers';

export default async function GetUserCookie() {
      const userCookie = (await cookies()).get('user')?.value;
      const user = userCookie ? JSON.parse(userCookie) : '';
      return user;
}

