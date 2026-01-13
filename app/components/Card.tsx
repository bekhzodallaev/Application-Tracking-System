import React from 'react'

interface CardProps{
    title: string,
    numOfApplications: string,
    percentage?: string
    children: React.ReactNode,
    bgColor?: string,
    date?:string,
}

const Card = ({title, children, numOfApplications, percentage, bgColor, date}:CardProps) => {
  return (
      <div className='flex justify-between min-w-sm rounded flex-col p-3 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] transform hover:scale-110 transition duration-300'>
          <div className='flex justify-between'>
              <h1>{title}</h1>
              <div className={`p-2 rounded ${bgColor}`}>{children}</div>
          </div>
          <h2 className='text-2xl'>{numOfApplications}</h2>
          <p>{date}</p>
      </div>
  )
}

export default Card