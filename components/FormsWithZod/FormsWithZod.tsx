'use client';
import React from 'react';
import { InputField } from '@/shared';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpSchema, formType } from '@/types/forms';
import styles from './FormsWithZod.module.css'
import toast from 'react-hot-toast';

const FormsWithZod = () => {
    const { register, handleSubmit, 
        formState: { errors, isSubmitting }, 
        reset, 
        watch, 
        setValue,
        setError,
        getValues
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    });

    const submitForm = async (data: SignUpSchema) => {
        const response = await fetch('/api/signup', {
            method: "POST",
            // body: JSON.stringify(data),
            body: JSON.stringify({
                email: data?.email,
                password: data?.password,
                confirm_password: data?.confirm_password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const responseData = await response.json();
        if (!response.ok) {
            toast.error('Submitting form failed')
        }
        if (responseData.errors) {
            const errors = responseData?.errors;

            if (errors?.email) {
                setError('email', {
                    type: 'server',
                    message: errors?.email
                })
                toast.error(errors.email);
            } else if (errors?.password) {
                setError('password', {
                    type: 'server',
                    message: errors?.password
                })
                toast.error(errors.password);
            } else if (errors?.confirm_password) {
                setError('confirm_password', {
                    type: 'server',
                    message: errors?.confirm_password
                })
                toast.error(errors.confirm_password);
            }
        } else {
            toast.error('Something went wrong')
        }
        reset();
    }
  return (
    <div className='flex flex-col gap-4 w-full h-full items-center justify-center'>
        <h1 className='text-[4.5rem]'>React Hook form with Zod</h1>
        <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-4'>
            <>
                <InputField className={`${errors?.email && `border border-red-500`}`} register={register('email')} label='Email'
                    placeholder='Enter your email' type='email'
                />
                {errors?.email && (
                    <p className='text-red-500'>
                        {`${errors?.email?.message}`}
                    </p>
                )}
            </>
            <>
                <InputField isPassword label='Password' placeholder='Enter your password' 
                    type='password' register={register('password')}
                    className={`${errors?.password && `border border-red-500`}`}
                />
                {errors?.password && (
                    <p className='text-red-500'>
                        {`${errors?.password?.message}`}
                    </p>
                )}
            </>
            <>
                <InputField isPassword label='Confirm password'
                    placeholder='Re-Enter your password' type='password'
                    register={register('confirm_password')}
                    className={`${errors?.confirm_password && `border border-red-500`}`}
                />
                {errors?.confirm_password && (
                    <p className='text-red-500'>
                        {`${errors?.confirm_password?.message}`}
                    </p>
                )}
            </>
            {isSubmitting ? (
                <button type='button' className={`bg-gray-500 cursor-not-allowed h-[4.5rem]
                    p-[1rem] rounded-3xl w-[40rem] text-2xl mt-8`}
                >
                    Submit
                </button>
            ) : (
                <button type='submit' className={`bg-blue-500 p-[1rem] rounded-3xl w-[40rem]
                    text-2xl mt-8 h-[4.5rem]`}
                >
                    Submit
                </button>
            )}
        </form>
    </div>
  )
}

export default FormsWithZod