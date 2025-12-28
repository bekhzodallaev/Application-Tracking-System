import React from 'react'
import Pipeline from '../components/pipeline/Pipeline';
const Dashboard = () => {
  return (
    <div>
        <h1>Welcome, Bekhzod!</h1>
              <p>Here is a summary of your job application progress.</p>
              <div className='flex justify-between gap-3 mb-3'>
                  <div className='p-6 shadow-md rounded-lg flex flex-col align-middle justify-center min-h-[200px]'>
                  <h3>Total Applications</h3>
                  <h1>42</h1>
                  </div>
                  <div className='p-6 shadow-md rounded-lg flex flex-col align-middle justify-center min-h-[200px]'>
                  <h3>Interviews Scheduled</h3>
                  <h1>8</h1>
                  </div>
                  <div className='p-6 shadow-md rounded-lg flex flex-col align-middle justify-center min-h-[200px]'>
                  <h3>Offers Received</h3>
                  <h1>3</h1>
                  </div>
                  <div className='p-6 shadow-md rounded-lg flex flex-col align-middle justify-center min-h-[200px]'>
                  <h3>Rejections</h3>
                  <h1>12</h1>
              </div>
              </div>
              <h1 className='text-4xl mt-7'>Application Status Breakdown</h1>
              {/* Board here */}
              <div className='p-3 shadow-lg rounded-lg mt-4'>
                  <div className='flex justify-between mb-4'>
                      <div>
                          <p>Current Pipeline</p>
                        <p>All Time Applications</p>
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