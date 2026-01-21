
'use client';

import React, {useActionState} from 'react'
import Link from 'next/link'
import { RiLockPasswordFill } from 'react-icons/ri'
import { signup } from "@/app/lib/actions/auth"


const page = () => {
      const [state, action, pending] = useActionState(signup, undefined);

  return (
            <div className=' w-full h-screen flex flex-col items-center justify-center'>
                      <h1 className='text-3xl mb-4'>AppTrackr</h1>
                      <form action={action} className='min-w-2xl px-8 py-6 shadow-md rounded-lg flex flex-col gap-2 bg-white mb-3'>
                        <h2 className='text-4xl text-center'>Set New Password</h2>
                        <p className='text-center'>Choose a secure password to keep your application data safe.</p>
                                
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
                       
               <button className='rounded w-full border bg-blue-500 hover:bg-blue-700 text-white p-2 mt-2 cursor-pointer' disabled={pending} type='submit'>Update Password</button>
                      </form> 
                    </div>
  )
}

export default page