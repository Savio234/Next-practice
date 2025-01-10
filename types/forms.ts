import { z } from 'zod'

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string()
}).refine(data => data?.password === data?.confirm_password, {
    message: 'Passwords must match',
    path: ['confirm_password']
})
export type SignUpSchema = z.infer<typeof signUpSchema>

export type formType = {
    type: 'zod' | 'no_zod'
}