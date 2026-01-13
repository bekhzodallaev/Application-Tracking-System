import React from 'react'
import Pipeline from '../components/pipeline/Pipeline';
const Dashboard = () => {
  return (
    <div className='p-4'>
        <h1 className='text-4xl font-bold'>Welcome, Bekhzod!</h1>
              <p className='mt-4 mb-2 text-lg'>Here is a summary of your job application progress.</p>
              <div className='flex justify-between gap-3 mb-3 mt-4'>
        <div className='p-6 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded-lg flex flex-col align-middle justify-center min-h-[200px] min-w-2xs
                  transform hover:scale-110 transition duration-300
                  '>
                  <h3>Total Applications</h3>
                  <h1 className='text-4xl'>42</h1>
                  </div>
        <div className='p-6 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded-lg flex flex-col align-middle justify-center min-h-[200px] min-w-2xs
                  transform hover:scale-110 transition duration-300
                  '>
                  <h3>Interviews Scheduled</h3>
                  <h1  className='text-4xl'>8</h1>
                  </div>
        <div className='p-6 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded-lg flex flex-col align-middle justify-center min-h-[200px] min-w-2xs
                  transform hover:scale-110 transition duration-300
                  '>
                  <h3>Offers Received</h3>
                  <h1  className='text-4xl'>3</h1>
                  </div>
        <div className='p-6 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded-lg flex flex-col align-middle justify-center min-h-[200px] min-w-2xs
                  transform hover:scale-110 transition duration-300
                  '>
                  <h3>Rejections</h3>
                  <h1 className='text-4xl'>12</h1>
              </div>
              </div>
              <h1 className='text-3xl mt-7'>Application Status Breakdown</h1>
              {/* Board here */}
              <div className='p-3 shadow-lg rounded-lg mt-4'>
                  <div className='flex justify-between mb-4'>
                      <div>
                          <p className='text-xl mb-3'>Current Pipeline</p>
                        <p className='text-gray-600'>All Time Applications</p>
                      </div>
                      <div>
                          <h1>27 Active</h1>
                      </div>
                  </div>
                  <div >
                      <Pipeline />
                  </div>
              </div>
    </div>
  )
}

export default Dashboard;