
import React, { useState } from 'react'
import { MdDateRange } from 'react-icons/md'

export type Status = 'applied' | 'rejected' | 'withdrawn' | 'offer' | 'interview';

interface CardProps {
    logo: string,
    job_title: string,
    company_name: string,
    date_of_application: string,
    status: Status,
}

const statusStyles: Record<Status, { text: string; bg: string; border: string }> = {
  applied: { text: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-700' },
  rejected: { text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-700' },
  withdrawn: { text: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-700' },
  offer: { text: 'text-green-700', bg: 'bg-green-100', border: 'border-green-700' },
  interview :  { text: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-700' },
};


const ApplicationCard = ({ logo, job_title, company_name, date_of_application, status }: CardProps) => {

   const { text, bg , border} = statusStyles[status];
  return (
      <div className='flex justify-between p-3 border rounded bg-white mt-3 items-center'>
          <div className='flex gap-2 items-center'>
              <div className='bg-gray-200 p-2 rounded flex items-center'>
                  <p className='text-gray-500'>{logo}</p>
              </div>
              <div>
                <h2 className='text-xl'>{job_title}</h2>
              <h3 className='text-gray-700'>{company_name}</h3>
          <p className='flex gap-2 items-center'>
            <MdDateRange />
            {date_of_application}</p>
              </div>
          </div>

          <div className={`rounded-xl ${bg} flex items-center p-2 ${border}`}>
              <p className={` ${text}`}>{status}</p> 
          </div>
    </div>
  )
}

export default ApplicationCard;