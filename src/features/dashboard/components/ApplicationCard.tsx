import { ApplicationStatus } from '../types';
import { MdDateRange } from 'react-icons/md';

interface CardProps {
    id: string,
    logo?: string,
    title: string,
    company: string,
    date: string,
    status: ApplicationStatus,
}

const statusStyles: Record<ApplicationStatus, { text: string; bg: string; border: string }> = {
  applied: { text: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-700' },
  rejected: { text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-700' },
  withdrawn: { text: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-700' },
  offer: { text: 'text-green-700', bg: 'bg-green-100', border: 'border-green-700' },
  interview: { text: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-700' },
  unknown: { text: 'text-gray-700', bg: 'bg-gray-100', border: 'border-gray-700' },
};


const ApplicationCard = ({ id, logo, title, company, date, status, }: CardProps) => {

   const { text, bg , border} = statusStyles[status];
  return (
      <div className='flex justify-between p-3 rounded mt-3 items-center shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] '>
          <div className='flex gap-2 items-center'>
              <div className='bg-gray-200 p-2 rounded flex items-center'>
                  <p className='text-gray-500'>{logo}</p>
              </div>
              <div>
                <h2 className='text-xl'>{title}</h2>
              <h3 className='text-gray-700'>{company}</h3>
          <p className='flex gap-2 items-center'>
            <MdDateRange />
            {date}</p>
              </div>
          </div>

          <div className={`rounded-xl ${bg} flex items-center p-2 ${border}`}>
              <p className={` ${text}`}>{status}</p> 
          </div>
    </div>
  )
}

export default ApplicationCard;