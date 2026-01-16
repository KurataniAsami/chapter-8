'use client'
import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form"


export default function Contact() {
  const [apiError, setApiError] = useState("");

  // react-hook-form
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      text: ""
    }
  })

  type FormData = {
    name: string;
    email: string;
    text: string;
  }

  // API送信
  const onSubmit = async (formData:FormData) => {
    try {
      const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("送信しました。");
      reset();

    } catch (error) {
      console.error("送信エラー:", error);
      setApiError("送信に失敗しました。時間をおいて再度お試しください。");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate> 
      <p>{apiError}</p>

      <div className='flex gap-4 items-start my-3'>
        <label htmlFor='name' className='w-32'>
          お名前
        </label>

        <div className='flex-1'>
          <input id='name' type='text'
            className='border 1px solid'
            disabled={isSubmitting}
            {...register('name', {
              required: '名前は必須入力です',
              maxLength: {
              value: 30,
              message: '名前は30文字以内にしてください'
            }
            })}
          />
          <div className='text-red-600'>{errors.name?.message}</div>
        </div>
      </div>

      <div  className='flex gap-4 items-start my-3'>
        <label htmlFor='email' className='w-32'>
          メールアドレス
        </label>

        <div className='flex-1'>
          <input id='email' type='email'
            className='border 1px solid'
            disabled={isSubmitting}
            {...register('email', {
              required: 'メールアドレスは必須入力です。',
              pattern: {
              value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              message: 'メールアドレスの形式が不正です。'
            }
            })}
          />
          <div className='text-red-600'>{errors.email?.message}</div>
        </div>
      </div>

      <div className='flex items-start'>
        <label htmlFor='text' className='w-39'>
          本文
        </label>
        <div className='flex-1'>
          <textarea id='text' disabled={isSubmitting}
            className='border 1px solid '
            {...register('text', {
              required: '本文は必須入力です',
              minLength: {
              value: 10,
              message: '本文は10文字以上にしてください'
            }
            })}
          />
          <div className='text-red-600'>{errors.text?.message}</div>
        </div>
      </div>

      <div>
        <button type='submit' className='border 1px solid bg-gray-700 text-white
          font-bold px-3 py-2 rounded mt-3'
          disabled={isSubmitting}>
            送信
        </button>
      </div>
    </form>
  )
}
