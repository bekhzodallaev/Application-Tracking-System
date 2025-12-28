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
      <div className='flex justify-between min-w-sm border rounded flex-col p-3'>
          <div className='flex justify-between'>
              <h1>{title}</h1>
              <div className={`p-2 rounded ${bgColor}`}>{children}</div>
          </div>
          <h2>{numOfApplications}</h2>
          <p>{date}</p>
      </div>
  )
}

export default Card