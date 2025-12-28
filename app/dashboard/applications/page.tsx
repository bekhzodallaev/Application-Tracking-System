import React from 'react'
import Card from '@/app/components/Card'
import { FiUsers, FiCheckCircle, FiCalendar} from 'react-icons/fi'
import ApplicationCard from '@/app/components/applications/ApplicationCard'


const jobApplications = [
  { id: '1', logo:"W", job_title: "Frontend Engineer", company_name: 'Webase LTD', date_of_application: "02-10-2025", status: "Applied",status_color: 'text-blue-700',
    status_bg_color: 'bg-blue-100', },
  {id: '1', logo:"W", job_title: "Backend Engineer", company_name: 'Snowflake', date_of_application: "02-11-2025", status: "Rejected", status_color: 'text-blue-700',
    status_bg_color: 'bg-blue-100', },
  { id: '1', logo:"W", job_title: "Backend Engineer", company_name: 'Samsung', date_of_application: "07-10-2025", status: "Withdrawn" , status_color: 'text-blue-700',
    status_bg_color: 'bg-blue-100',},
  { id: '1', logo:"W", job_title: "Database Engineer", company_name: 'Databricks', date_of_application: "04-23-2025", status: "Offer",    status_color: 'text-blue-700',
    status_bg_color: 'bg-blue-100',},
  { id: '1', logo:"W", job_title: "UI Engineer", company_name: 'Google', date_of_application: "02-10-2025", status: "Applied" ,    status_color: 'text-blue-700',
    status_bg_color: 'bg-blue-100',},

]

const page = () => {
  return (
      <div className='flex flex-col gap-3'>
      <h1>Applications</h1>
      <p>Manage and track your job search progress</p>
      <section className='flex flex-wrap gap-3'>
         <Card title='Total Applications' numOfApplications='27'>
       <FiUsers className='text-blue-600'/>
      </Card>
       <Card title='Active Applications' numOfApplications='8'>
           <FiCheckCircle className='text-green-600'/>
      </Card>

       <Card title='Interview Scheduled' numOfApplications='3'>
           <FiCalendar className='text-purple-600'/>
      </Card>
      </section>
      <section className='flex justify-between '>
        <input type="text" name="search" id="search" placeholder='Search by company or role ...' className='p-2  border rounded w-3/4' />
        <select name="status" id="status" className='border rounded'>
          <option value="all"> All Statuses</option>
          <option value="interviewing">Interviewing</option>
          <option value="applied">Applied</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </section>
      
      <section className='mt-3'>
        {jobApplications.map((app, index) => (
          <ApplicationCard
            key={index}
        logo={app.logo}
       job_title={app.job_title}
        company_name={app.company_name}
      date_of_application={app.date_of_application}
     status={app.status}
     status_color={app.status_color}
            status_bg_color={app.status_bg_color}
          />
        ))}
      </section>
    </div>
  )
}

export default page