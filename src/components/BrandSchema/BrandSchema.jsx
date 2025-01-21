import { z } from "zod";

export const editbrandSchema = z.object({
    name: z
    .string()
    .min(1, { message: 'Name Is Required' })
    .trim(),

    code: z
    .string()
    .min(1, { message: 'Code Is Required'})
    .min(5, { message: 'Code Must Be 5 Charachter' })
    .trim(),

    status: z
    .string()
    .min(1, { message: 'Code Is Required' })
    .trim(),

})