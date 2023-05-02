import React, {useState} from 'react';
import {supabase} from "@/lib/supabaseClient";
import {useForm, UseFormRegister} from "react-hook-form";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useRouter} from "next/router";
import {FormDataI} from "@/types";




const Auth = () => {
  const router = useRouter()

  const [loading,setLoading]=useState(false)
  const [isRegister,setIsRegister]=useState(true)


  const { register, handleSubmit, formState: { errors }} = useForm<FormDataI>();
    const handleRegister = async (formData)=>{
    const email = formData.email
    const password = formData.password
    try {
      setLoading(true)
      const data = await supabase.auth.signUp({ email, password })
      if (data.error) throw error
      await supabase.from('users').insert({
        id:data?.data.user?.id,
        email:email,
        name_first:formData.firstname,
        name_last:formData.lastname
      })
      setIsRegister(true)
      await router.push('/')
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setLoading(false)
    }
  }
  const handleLogin = async (formData:FormDataI)=>{
    const email = formData.email
    const password = formData.password
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      await router.push('/')
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='m-8 flex flex-col items-center'>
      <div className='m-3'>
        <h2 className='text-green-900 text-xl mb-10'>Авторизация</h2>
      </div>
      <button
        onClick={e => {
          e.preventDefault()
          setIsRegister(!isRegister)
        }}
          className='mb-3 text-green-900 hover:font-bold'>
        {isRegister ? 'Уже есть аккаунт - Войти' : 'Зарегестрироваться'}
      </button>
      {isRegister ?<>
{/*Регистрация пользователя*/}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className='flex flex-col gap-2 w-60'
        >
          <input
            {...register("firstname", { required: "Введите имя" })}
            className='m-1 text-amber-950 p-1 focus:outline-none
            border border-emerald-500 rounded-md'
            type="text"
            placeholder='Имя'
          />
          {errors.firstname && <p className='text-red-300'>{errors.firstname.message}</p>}
          <input
            {...register("lastname", { required: "Введите фамилию" })}
            className='m-1 text-amber-950 p-1 focus:outline-none
            border border-emerald-600  rounded-md'
            type="text"
            placeholder='Фамилия'
          />
          {errors.lastname && <p className='text-red-300'>{errors.lastname.message}</p>}
          <input
            {...register("email",
              { required: "Введите Email",
                        pattern: { value: /^\S+@\S+$/i,
                                    message: "Email не корректен" }
                      })
            }
            className='m-1 text-amber-950 p-1 focus:outline-none
            border border-emerald-700  rounded-md'
            type="email"
            placeholder='email'
          />
          {errors.email && <p className='text-red-300'>{errors.email.message}</p>}
          <input
            {...register("password",
              { required: "Введите пароль",
                        minLength: { value: 6,
                                      message: "Пароль должен быть не менее 6 символов" }
                      })
            }
            className='m-1 text-amber-950 p-1 focus:outline-none
            border border-emerald-800  rounded-md'
            type="password"
            placeholder='пароль'

          />
          {errors.password && <p className='text-red-300'>{errors.password.message}</p>}
          <button
            type="submit"
            className='m-1'
            disabled={loading}
          >
            <span
              className='mt-2 text-green-900 hover:font-bold'
            >
              {loading ? 'Загрузка...' : 'Зарегестрироваться'}
            </span>
          </button>
        </form>
        </>
// Вход ползователя
        : <form onSubmit={handleSubmit(handleLogin)}
                className='flex flex-col gap-2 w-60'>
            <input
              {...register("email",
                { required: "Введите Email",
                  pattern: { value: /^\S+@\S+$/i,
                    message: "Email не корректен" }
                })
              }
              className='m-1 text-amber-950 p-1 focus:outline-none
              border border-emerald-600  rounded-md'
              type="email"
              placeholder='email'
            />
            {errors.email && <p className='text-red-300'>{errors.email.message}</p>}
            <input
              {...register("password",
                { required: "Введите пароль",
                  minLength: { value: 6,
                    message: "Пароль должен быть не менее 6 символов" }
                })
              }
              className='m-1 text-amber-950 p-1 focus:outline-none
              border border-emerald-800  rounded-md'
              type="password"
              placeholder='пароль'
            />
            {errors.password && <p className='text-red-300'>{errors.password.message}</p>}
            <button
              type="submit"
              className='m-1'
              disabled={loading}
            >
              <span className='mt-2 text-green-900 hover:font-bold'>
                {loading ? 'Загрузка...' : 'Войти'}
              </span>
            </button>
          </form>
      }
    </div>
   
  );
};

export default Auth;