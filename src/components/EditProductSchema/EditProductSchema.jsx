import { z } from "zod";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const editProductSchema = z.object({
    name: z.string().min(1, { message:  'Name Is Required' }).trim(),
    price: z.string().min(1, { message: 'Price Is Required' }).trim(),
    quantity: z.string().min(1, { message: 'Quantity Is Required' }),
    code: z.string().min(1, { message: 'Code Is Required' }).max(5, { message: 'Code Must Be At Least 5 Charachters' }).trim(),
    brand_id: z.string().min(1, { message: 'Brand Is Required' }).trim(),
    status: z.string().min(1, { message: 'Status Is Required' }).trim(),
    subcategory_id: z.string().min(1, { message: 'Subcategory Is Required' }).trim(),
    desc: z.string().min(1, { message: 'Description Is Required' }),
})