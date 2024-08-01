'use client'


import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { RegisterSchema } from "../_schemas"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { CardWrapper } from "./card-wrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"

import { register } from "../_actions/register"

interface FormState {
    error?: string,
    success?: string,
}

export const RegisterForm = () => {
    const [formState, setFormState] = useState<FormState>({error: undefined, success: undefined})
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            register(values).then(data => {
                setFormState(data)
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                    <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-xs font-semibold">Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            disabled={isPending}
                                            placeholder="John Doe"
                                        />
                                    </FormControl>
                                    <FormMessage 
                                        className="text-[0.7rem]"
                                    />
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-xs font-semibold">Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            disabled={isPending}
                                            placeholder="your@email.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage 
                                        className="text-[0.7rem]"
                                    />
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-xs font-semibold">Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            disabled={isPending}
                                            placeholder="*************"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage 
                                        className="text-[0.7rem]"
                                    />
                                </FormItem>
                            )}
                        >
                        </FormField>
                    </div>
                    <FormError message={formState.error}/>
                    <FormSuccess message={formState.success} />
                    <Button 
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Create and account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}