'use server';

import { z } from 'zod';
import { LoginShema } from '../_schemas';

export const login = async (values: z.infer<typeof LoginShema>) => {
    const validatedFields = LoginShema.safeParse(values);

    if (!validatedFields.success) return {error: "Invalid fields!"};

    return { success: "Email sent!"}
}