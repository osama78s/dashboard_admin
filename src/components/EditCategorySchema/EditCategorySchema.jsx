import { z } from "zod";

export const categorySchema = z.object({
    name: z
    .string()
    .min(1, { message: 'Name Is Required' })
    .trim(),


    code: z
    .string()
    .min(1, { message: 'Code Is Required' })
    .max(5, { message: 'Code Must Be 5 Charachters' })
    .trim(),
    
    status: z
    .string()
    .min(1, { message: 'Status Is Required' })
    .trim()
})