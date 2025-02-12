'use client';
import React from 'react';
import { InputField } from '@/shared';
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpSchema, formType } from '@/types/forms';
import styles from './Forms.module.css'
import toast from 'react-hot-toast';

const Forms = () => {
    const { register, handleSubmit, 
        formState: { errors, isSubmitting }, 
        reset, 
        watch, 
        setValue,
        setError,
        getValues
    } = useForm<SignUpSchema>();

    const onSubmit = async (data: FieldValues) => {
        await new Promise((resolve: any) => setTimeout(resolve, 2000));
        reset();
    }
  return (
    <div className='flex flex-col gap-4 w-full h-full items-center justify-center'>
        <h1 className='text-[4.5rem]'>React Hook form without Zod</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mb-[4rem]'>
            <>
                <InputField register={register('email', {
                    required: 'Email is required'
                })} label='Email'
                    placeholder='Enter your email' type='email'
                    className={`${errors?.email && `border border-red-500`}`}
                />
                {errors?.email && (
                    <p className='text-red-500'>
                        {`${errors?.email?.message}`}
                    </p>
                )}
            </>
            <>
                <InputField isPassword label='Password' placeholder='Enter your password' 
                    type='password' register={register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 10,
                            message: 'Password must be at least 10 characters'
                        }
                    })}
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
                    register={register('confirm_password', {
                        required: 'Confirm password is required',
                        validate: (value: any) =>
                            value === getValues('password') || "Passwords must match"
                    })}
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

export default Forms