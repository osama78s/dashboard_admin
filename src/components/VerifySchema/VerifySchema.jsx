import { z } from "zod";

export const VerifySchema = z.object({
    code: z.string().min(1, { message: 'Code Is Required' }).max(5, { message: 'Code Must Be 5 Charachters' }).trim()
})