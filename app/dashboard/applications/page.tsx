'use client';
import React, { useState } from 'react'
import Card from '@/app/components/Card'
import { FiUsers, FiCheckCircle, FiCalendar} from 'react-icons/fi'
import ApplicationCard, { Status } from '@/app/components/applications/ApplicationCard';

type JobApplication = {
  id: string;
  logo: string;
  job_title: string;
  company_name: string;
  date_of_application: string;
  status: Status;
};

const jobApplications:JobApplication[] = [
  { id: '1', logo:"W", job_title: "Frontend Engineer", company_name: 'Webase LTD', date_of_application: "02-10-2025", status: "applied"},
  {id: '1', logo:"W", job_title: "Backend Engineer", company_name: 'Snowflake', date_of_application: "02-11-2025", status: "rejected"},
  { id: '1', logo:"W", job_title: "Backend Engineer", company_name: 'Samsung', date_of_application: "07-10-2025", status: "withdrawn" },
  { id: '1', logo:"W", job_title: "Database Engineer", company_name: 'Databricks', date_of_application: "04-23-2025", status: "offer"},
  { id: '1', logo: "W", job_title: "UI Engineer", company_name: 'Google', date_of_application: "02-10-2025", status: "applied" },
  { id: '1', logo:"W", job_title: "Frontend Engineer", company_name: 'Webase LTD', date_of_application: "02-10-2025", status: "applied"},
  {id: '1', logo:"W", job_title: "Backend Engineer", company_name: 'Snowflake', date_of_application: "02-11-2025", status: "rejected"},
  { id: '1', logo:"W", job_title: "Backend Engineer", company_name: 'Samsung', date_of_application: "07-10-2025", status: "withdrawn" },
  { id: '1', logo:"W", job_title: "Database Engineer", company_name: 'Databricks', date_of_application: "04-23-2025", status: "offer"},
  { id: '1', logo: "W", job_title: "UI Engineer", company_name: 'Google', date_of_application: "02-10-2025", status: "applied" },
    { id: '1', logo:"W", job_title: "UI Engineer", company_name: 'Google', date_of_application: "02-10-2025", status: "interview"},


]

const page = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedStatus, setSelectedStatus] = useState('all');


  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  }

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedStatus(e.target.value);
  }

  const filteredApplications = selectedStatus == 'all' ? jobApplications : jobApplications.filter((application) => application.status === selectedStatus);

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
        <select name="status" id="status" className='border rounded' onChange={handleChange}>
          <option value="all"> All Statuses</option>
          <option value="interview">Interviewing</option>
          <option value="applied">Applied</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </section>
      
      <section className='mt-3'>
        {filteredApplications.slice(0,visibleCount).map((app, index) => (
          <ApplicationCard
            key={index}
        logo={app.logo}
       job_title={app.job_title}
        company_name={app.company_name}
      date_of_application={app.date_of_application}
     status={app.status}
          />
        ))}
      </section>
      {visibleCount < filteredApplications.length && (
         <button type='button' className='p-2 text-white bg-blue-600 rounded w-max mx-auto cursor-pointer' onClick={loadMore}>Load More Applications</button>
      )}
    </div>
  )
}

export default page