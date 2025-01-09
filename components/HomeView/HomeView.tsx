'use client';
import { InputField } from '@/shared';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styles from './HomeView.module.css'

const HomeView = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [errors, setErrors] = useState<string[]>([])

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            setIsSubmitting(false);
            return;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsSubmitting(false);
    }

  return (
    <div className='flex flex-col gap-4 w-full h-full items-center justify-center'>
        <form onSubmit={handleSubmitForm} className='flex flex-col gap-4'>
            {
                errors?.length > 0 && (
                    errors.map((error: string, index: number) =>
                        <div className='bg-red-100 rounded px-4 py-2' key={index}>
                            <h3 className='text-red-500'>{error}</h3>
                        </div>
                    )
                )
            }
            <InputField label='Email' placeholder='Enter your email' type='email' required
                onChange={(e) => setEmail(e.target.value)} value={email}
            />
            <InputField isPassword label='Password' placeholder='Enter your password' required
                onChange={(e) => setPassword(e.target.value)} value={password} type='password'
            />
            <InputField isPassword label='Confirm password' value={confirmPassword}
                placeholder='Re-Enter your password' type='password' required
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button data-disabled={isSubmitting} type='submit' className='bg-blue-500 disabled:bg-gray-500
                p-[1rem] rounded-3xl w-[40rem] text-2xl mt-8 h-[4.5rem]'
                disabled={isSubmitting}
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default HomeView