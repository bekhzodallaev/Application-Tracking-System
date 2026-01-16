import React from 'react'
import Sidebar from '../components/Sidebar'
import Pipeline from '../components/pipeline/Pipeline'

const layout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();
  return (
    <div className='flex min-h-screen'>
      <aside className=' h-screen sticky top-0 bg-white' >
          <Sidebar />
      </aside>
          <main  className='flex-1 p-6 overflow-x-hidden'>
            {children}

             <p className='text-center mt-10'>@ {year} AppTrackr.com </p>
          </main>
    </div>
  )
}

export default layout