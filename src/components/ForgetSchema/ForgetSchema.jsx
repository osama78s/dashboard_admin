import React from 'react'
import { z } from 'zod'

export const ForgetSchema = z.object({
    email: z
    .string()
    .min(1, { message: 'Email Is Required' })
    .email({ message: 'The Email Field  Must Be Email' })
    .trim(),

    password: z
    .string()
    .min(1, { message: 'Password Is Required' })
    .min(8, { message: 'Password Must Be At Least 8 Charachter' })
    .trim(),

}).refine((data) => data.password !== data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Password Must Be Matched'
});
