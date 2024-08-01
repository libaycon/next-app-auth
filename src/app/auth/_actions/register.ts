'use server';

import { z } from 'zod';
import { RegisterSchema } from '../_schemas';
import bcrypt from "bcrypt";
import { db } from '@/utils/db';
import { getUserByEmail } from '../_data/get-user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) return {error: "Invalid fields!"};

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return {error: "Email already in use!"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // TODO send verification token email

    return { success: "User created!"}
}