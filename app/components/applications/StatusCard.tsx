import React from 'react'

const StatusCard = ({ title, value }: { title: string; value: number }) => (
  <div className="p-6 shadow-lg rounded-lg flex flex-col justify-center min-h-[200px]
                  transform hover:scale-110 transition duration-300">
    <h3>{title}</h3>
    <h1 className="text-4xl">{value}</h1>
    </div>
)

export default StatusCard;