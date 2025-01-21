import { z } from "zod";

export const CreateSubcategorySchema = z.object({
    name: z
    .string()
    .min(1, { message: 'Name Is Required' })
    .trim(),

    code: z
    .string()
    .min(1, { message: 'Code Is Required' })
    .min(1, { message: 'Code Must Be 5 Charachter' })
    .trim(),

    status: z
    .string()
    .min(1, { message: 'Status Is Required' })
    .trim(),

    category_id: z
    .string()
    .min(1, { message: 'Category Is Required' })
    .trim()
})