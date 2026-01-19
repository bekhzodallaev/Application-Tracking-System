'use client';

import React from 'react'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { signin } from '@/app/lib/actions/auth'
import { useActionState } from 'react'

const SignIn = () => {
    const [state, action, pending] = useActionState(signin, undefined);
  return (
      <div className=' w-full h-screen flex flex-col items-center justify-center'>
            <h1 className='text-3xl mb-4'>AppTrackr</h1>
            <form action={action} className='min-w-2xl px-8 py-6 shadow-md rounded-lg flex flex-col gap-2 bg-white mb-3'>
              <h2 className='text-4xl text-center'>Sign in to your account</h2>
              <p className='text-center'>Track all your job applications in one place</p>
               
              <label htmlFor="email">Email</label>
      
              <div className='relative'>
                <MdEmail className='absolute left-3 w-4 h-4 top-1/2 -translate-y-1/2' color='#9CA1B0' />
                 <input  className='w-full rounded outline-none border border-[#b6babe8a] pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 bg-[#F6F7F8]' type="email" name="email" id="email" placeholder='Enter your email' />
              </div>
        <div className='flex justify-between align-middle'>
                  {state?.errors?.email?.map((err) => <p key={err}>{err}</p>)}

                  <label htmlFor="password">Password</label>
                  <Link href="/auth/reset-password" className='text-blue-700 hover:text-blue-500'>Forgot your password?</Link>
               </div>
              <div className='relative'>
                <RiLockPasswordFill className='absolute left-3 w-4 h-4 top-1/2 -translate-y-1/2' color='#9CA1B0' />
              <input className='w-full rounded outline-none border border-[#b6babe8a] pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 bg-[#F6F7F8]' type="password" name="password" id="password" placeholder='Enter your password' />
              </div>
                 {state?.errors?.email?.map((err) => <p key={err}>{err}</p>)}

        <button className='rounded w-full border bg-blue-500 hover:bg-blue-700 text-white p-2 mt-2' type='submit' disabled={pending}>Continue</button>
          <p className='text-center'>Or sign up with</p>
          <div className="flex items-center">
         <button className="w-full rounded border border-[#b6babe8a] py-2 flex items-center justify-center gap-2 hover:bg-gray-200">
          <FcGoogle className="w-5 h-5" />
           <span>Sign up with Google</span>
         </button>
          </div>
        <p className='text-center'>Don't you have an account ? <Link className='text-blue-700 hover:text-blue-500' href="/auth/signup">Sign up</Link></p>
            </form>
        
          </div>
  )
}

export default SignIn