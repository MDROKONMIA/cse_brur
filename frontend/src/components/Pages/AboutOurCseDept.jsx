import React, { Fragment } from 'react'
import { cseLogo } from '../../logo'
import MetaData from "../Layout/MetaData"

const AboutOurCseDept = () => {
  return (
   <Fragment>
    <MetaData title="About"/>
    <div className='w-full p-3'>
      <p className="text-4xl text-center font-cursive">About</p>
      <div className='lg:flex mb-2'>
        <div className='w-full hidden lg:block lg:w-1/5 bg-black  items-center '>
          <div className='h-full flex items-center'>
            <img src={cseLogo} alt="cse logo" />
          </div>
        </div>
        <div className='w-full lg:w-4/5  border-l-gray-700 border-l-2'>
          <div className='pl-2 '>
            <p className='text-justify  text-gray-800 dark:text-gray-300'>The Department of Computer Science & Engineering was established on 12 October, 2008 as one of the six founding departments Begum Rokeya University, Rangpur started its journey with.
              Initially started under the faculty of Science & Engineering, the department now operates under the faculty of Engineering & Technology, one of the two faculties the faculty of Science & Engineering was split into later.</p><br />
            <p className='text-justify text-gray-800 dark:text-gray-300'>This department laying into Faculty of engineering and technology. This department situtated in 2nd Floor on  academic building #2 at the university campus. The virtual calssroom of university in this department.
            </p>
          </div>
        </div>
      </div>
    </div>
   </Fragment>
  )
}

export default AboutOurCseDept