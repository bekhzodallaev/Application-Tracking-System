// 'use client';
// import { MdEmail } from 'react-icons/md'
// import React, {useActionState} from 'react'
// import Link from 'next/link'
// // import { POST } from '@/app/api/auth/forget-password/route';
// const page = () => {
//   // const [state, action, pending] = useActionState(POST, undefined);
  
//   return (
//        <div className=' w-full h-screen flex flex-col items-center justify-center'>
//             <h1 className='text-3xl mb-4'>AppTrackr</h1>
//             <form action ={action} className='min-w-2xl px-8 py-6 shadow-md rounded-lg flex flex-col gap-2 bg-white mb-3'>
//               <h2 className='text-4xl text-center'>Forgot your password?</h2>
//               <p className='text-center'>No worries! Enter your registered email address below and we will send you instructions to reset it.</p>
               
//               <label htmlFor="email">Email</label>
//               <div className='relative'>
//                 <MdEmail className='absolute left-3 w-4 h-4 top-1/2 -translate-y-1/2' color='#9CA1B0' />
//                  <input  className='w-full rounded outline-none border border-[#b6babe8a] pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 bg-[#F6F7F8]' type="email" name="email" id="email" placeholder='Enter your email' />
//         </div>
//               {state?.errors?.email?.map((err) => <p key={err}>{err}</p>)}

//               <button className='bg-blue-500 hover:bg-blue-700 text-white rounded p-2 mt-2 cursor-pointer' disabled={pending}>Send reset link</button>
//             <Link className='text-blue-700 text-center mt-2 hover:text-blue-500' href="/auth/signin"> ← Back to Login</Link>
//             </form> 
//           </div>
//   // 
// }
// export default page
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page