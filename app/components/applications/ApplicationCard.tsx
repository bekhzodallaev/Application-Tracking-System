import React from 'react'

interface CardProps {
    logo: string,
    job_title: string,
    company_name: string,
    date_of_application: string,
    status: string,
    status_color:string,
    status_bg_color:string
}
const ApplicationCard = ({logo, job_title, company_name, date_of_application, status, status_color, status_bg_color}:CardProps) => {
  return (
      <div className='flex justify-between p-3 border rounded bg-white mt-3'>
          <div className='flex gap-2'>
              <div className='bg-gray-400 p-2 rounded'>
                  <p>{logo}</p>
              </div>
              <div>
                <h2>{job_title}</h2>
              <h3>{company_name}</h3>
              <p>{date_of_application}</p>
              </div>
          </div>

          <div className={`rounded p-2 ${status_bg_color}`}>
              <p className={` ${status_color}`}>{status}</p> 
          </div>
    </div>
  )
}

export default ApplicationCard;