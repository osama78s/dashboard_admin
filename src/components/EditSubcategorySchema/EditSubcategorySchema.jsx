import { z } from "zod";

export const editSubcategorySchema = z.object({
    name: z
    .string()
    .min(1, { message: 'Name Is Required' })
    .trim(),

    code: z
    .string()
    .min(1, { message: 'Code Is Required' })
    .min(1, { message: 'Code Must Be 8 Charachter' })
    .trim(),

    status: z
    .string()
    .min(1, { message: 'Status Is Required' })
    .trim()
})