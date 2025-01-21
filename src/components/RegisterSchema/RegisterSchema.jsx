import { z } from "zod";

export const RegisterShecma = z.object({
    first_name: z.string().min(1, { message: 'First Name Is Required' }).trim(),
    last_name: z.string().min(1, { message: 'First Name Is Required' }).trim(),
    email: z.string().min(1,{ message: 'Email Is Required' }).email({ message: 'Field Must Be Email' }).trim(),
    gender: z.string().min(1, { message: 'Gender Is Required' }).trim(),
    password: z.string().min(1,{ message: 'Password Is Required' }).min(8, { message: 'Passsword Must Be At Least 8 Charachter' }).trim(),
}).refine((data) => data.password !== data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords Must Be Matched'
})
