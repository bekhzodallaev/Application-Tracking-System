'use client';

import React, { useActionState } from 'react'
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import  {signup} from "@/app/api/auth/signup/route"

const SignUp = () => {

  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <div className=' w-full h-screen flex flex-col items-center justify-center'>
      <h1 className='text-3xl mb-4'>AppTrackr</h1>
      <form action={action} className='px-8 py-6 shadow-md rounded-lg flex flex-col gap-2 min-w-2xl bg-white'>
        <h2 className='text-4xl text-center'>Create your account</h2>
        <p className='text-center'>Track all your job applications in one place</p>
         
        <label htmlFor="name">Name</label>
        <div className='relative'>
          <FaUser className='absolute left-3 w-4 h-4 top-1/2 -translate-y-1/2' color='#9CA1B0' />
           <input  className='bg-[#F6F7F8] w-full rounded outline-none border border-[#b6babe8a] pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400' type="text" name="name" id="name" placeholder='Enter your name' />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}
        
        <label htmlFor="email">Email</label>
        <div className='relative'>
          <MdEmail className='absolute left-3 w-4 h-4 top-1/2 -translate-y-1/2' color='#9CA1B0' />
           <input  className='bg-[#F6F7F8] w-full rounded outline-none border border-[#b6babe8a] pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400' type="email" name="email" id="email" placeholder='Enter your email' />
        </div>
       {state?.errors?.email && <p>{state.errors.email}</p>}
        <label htmlFor="password">Password</label>
        <div className='relative'>
          <RiLockPasswordFill className='absolute left-3 w-4 h-4 top-1/2 -translate-y-1/2' color='#9CA1B0' />
        <input className='bg-[#F6F7F8] w-full rounded outline-none border border-[#b6babe8a] pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400' type="password" name="password" id="password" placeholder='Enter your password' />
        </div>
        {state?.errors?.password &&
          (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      ) 
        }
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className='relative'>
         <RiLockPasswordFill className='absolute left-3 w-4 h-4 top-1/2 -translate-y-1/2' color='#9CA1B0' />
        <input className='w-full rounded outline-none border border-[#b6babe8a] pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 bg-[#F6F7F8]' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm your password' />
        </div>
        {state?.errors?.confirmPassword && 
          (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.confirmPassword.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )
        }

        <button className='rounded w-full border bg-blue-500 hover:bg-blue-700 text-white p-2 mt-2' disabled={pending} type='submit'>Create Account</button>
              <p className='text-center'>Or sign up with</p>
          <div className="flex items-center">
             <button className="w-full rounded border border-[#b6babe8a] py-2 flex items-center justify-center gap-2 hover:bg-gray-200">
              <FcGoogle className="w-5 h-5" />
               <span>Sign up with Google</span>
             </button>
              </div>
      <p className='text-center'>Already have an account ? <Link className='text-blue-700 hover:text-blue-500' href="/auth/signin">Sign in</Link></p>
      </form>

    </div>
  )
}

export default SignUp;