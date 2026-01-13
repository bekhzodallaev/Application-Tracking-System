
'use client';

import React from 'react'
import { HiOutlineDownload } from "react-icons/hi";
import Card from '@/app/components/Card';
import { FiUsers } from 'react-icons/fi';
import { FiMessageSquare } from 'react-icons/fi';
import { FiCheckCircle } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
   LineChart,
  Line,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const funnelData = [
  { stage: 'Applied', value: 1240, percent: 100 },
  { stage: 'Screened', value: 860, percent: 69 },
  { stage: 'Interviewed', value: 223, percent: 18 },
  { stage: 'Offer Sent', value: 45, percent: 3.6 },
  { stage: 'Hired', value: 33, percent: 2.6 },
];
const COLORS = [
  '#E5EDFF',
  '#C7D7FE',
  '#93B4FD',
  '#5B8DF8',
  '#2F6AF5',
];

const jobRole = [
  { role: "Frontend Engineer", percent: 45 },
  { role: "Backend Enginer", percent: 30 },
  { role: "Designer", percent: 10 },
  { role: "Devops Engineer", percent: 7 },

]
const jobColors = ['#EF4444', '#3B82F6', '#22C55E', '#F97316'];

const avgTimeData = [
  { stage: 'Applied', days: 2 },
  { stage: 'Screened', days: 9 },
  { stage: 'Interviewed', days: 6 },
  { stage: 'Offer Sent', days: 4 },
];


const page = () => {
  return (
      <div>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-4xl'>Application Analytics</h1>
      <p className='text-lg mt-4 mb-4'>Insight and performance metrics for your application pipeline</p>
        </div>
        <button type='button' className='flex gap-2 rounded text-white bg-blue-400 items-center p-3'>
          <HiOutlineDownload />
          Export Report</button>
      </div>

      <div className='flex flex-wrap gap-4 justify-between'>
        <Card title="Total Applications" numOfApplications='321' percentage='23' bgColor="bg-blue-200">
           <FiUsers className='text-blue-600'/>
        </Card>
        <Card title="Interview Rate" numOfApplications='23' percentage='3' bgColor='bg-purple-200' >
           <FiMessageSquare className='text-purple-600'/>
        </Card>
        <Card title="Offer Acceptance" numOfApplications='21' percentage='12' bgColor='bg-orange-200' >
           <FiCheckCircle className='text-orange-600'/>
        </Card>
        <Card title="AvgTime to Hire" numOfApplications='21' percentage='12' bgColor='bg-green-200'>
           <FiClock className='text-green-600'/>
        </Card>
        
      </div>  
      <div className='flex gap-4'>
        <div className='rounded shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] p-3 relative mt-5 w-1/2'>
          <h1>Application Funnel</h1>
      <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={funnelData}
        layout="vertical"
        margin={{ left: 20 }}
      >
        <XAxis type="number" hide /> 
        <YAxis
          type="category"
          dataKey="stage"
          width={100}
        />
      <Bar dataKey="percent" radius={[6, 6, 6, 6]}>
      {COLORS.map((entry, index) => (
       <Cell key={index} fill={entry} />
       ))}
             
          <LabelList
  content={({ x, y, width, index }) => {
    const item = funnelData[index!];

    const xPos = Number(x) + Number(width) + 8;
    const yPos = Number(y) + 12;

    return (
      <text
        x={xPos}
        y={yPos}
        fontSize={16}
        fill="#475569"
        dominantBaseline="middle"
      >
        {item.value} ({item.percent}%)
      </text>
    );
  }}
/>
          </Bar>
      </BarChart>
    </ResponsiveContainer>
        </div> 
        <div className='rounded p-3 relative mt-5 w-1/2 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]'>
          <h1>Application By Role</h1>
      <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={jobRole}
        layout="vertical"
        margin={{ left: 20 }}
      >
        <XAxis type="number" hide /> 
        <YAxis
          type="category"
          dataKey="role"
          width={100}
        />
      <Bar dataKey="percent" radius={[6, 6, 6, 6]}>
      {jobColors.map((entry, index) => (
       <Cell key={index} fill={entry} />
       ))}
             
          <LabelList
  content={({ x, y, width, index }) => {
    const item = jobRole[index!];

    const xPos = Number(x) + Number(width) + 8;
    const yPos = Number(y) + 12;

    return (
      <text
        x={xPos}
        y={yPos}
        fontSize={16}
        fill="#475569"
        dominantBaseline="middle"
      >
        ({item.percent}%)
      </text>
    );
  }}
/>
          </Bar>
      </BarChart>
    </ResponsiveContainer>
        </div>
      </div>

      <div className='p-4 rounded mt-4 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]'>
        <h1>Average Time in Stage(Days)</h1>
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={avgTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="stage" />
    <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
    <Tooltip />
    <Bar dataKey="days" fill="#3B82F6" radius={[6, 6, 0, 0]}>
      <LabelList dataKey="days" position="top" formatter={(val) => `${val}d`} />
    </Bar>
  </BarChart>
</ResponsiveContainer>

      </div>
    </div>
  )
}

export default page