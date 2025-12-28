import React from 'react'
import Sidebar from '../components/Sidebar'
import Pipeline from '../components/pipeline/Pipeline'

const layout = ({children} : {children:React.ReactNode}) => {
  return (
      <div className='flex'>
          <Sidebar />
          <main  className='flex-1 p-6 overflow-x-hidden'>
            {children}
          </main>
    </div>
  )
}

export default layout