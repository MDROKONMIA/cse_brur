import { Carousel as FlowbiteCarousel } from 'flowbite-react'
import { achivment_1, achivment_2, achivment_3, achivment_4, achivment_5, achivment_6, achivment_7, banner, cseLogo } from '../logo/index'
import React, { Fragment, useEffect } from 'react'
import { MizanSir } from "../TeachersPhoto/TeacherchPhoto"
import Carousel from 'react-multi-carousel'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './Layout/MetaData'
import Loader from './Layout/loader/Loader'
import { Link } from 'react-router-dom'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { getAllNotice } from '../actions/noticeAction'



const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, notices } = useSelector(state => state.allNotices);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    if (notices === undefined) {
      dispatch(getAllNotice());
    }
  }, [dispatch, notices])

  return (
    <>
      {/* <div className='banner w-full '> */}
      {/* <img src={banner} width={"100%"} height={"200px"}/> */}
      {/* <p className='wedding font-serif text-white'>Well Come</p> */}
      {/* </div> */}
      <MetaData title={"Home page"} />

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <FlowbiteCarousel>
          <img
            src={banner}
            alt="..."
          />
          <img
            src={cseLogo}
            alt="..."
          />
        </FlowbiteCarousel>
      </div>

      <div className='px-3'>
        <div className='md:flex mt-2 items-center'>
          <div className='w-2/5 text-center'>
            <img className="m-auto" src={MizanSir} alt="Department Head" />
          </div>
          <div className='w-full md:w-3/5'>
            <h1 className='text-4xl md:text-6xl font-extrabold text-blue-800 dark:text-gray-300'>Head of the Department</h1>
            <h2 className='text-xl md:text-2xl font-bold my-1 dark:text-white'>Dr. Md. Mizanur Rahoman</h2>
            <p className='text-gray-600 text-lg md:text-xl dark:text-gray-300'>Professor</p>
            <br />
            <p className='dark: text-gray-400 text-justify'> Welcome to the department of <span className='text-primary_bg dark:text-white cursor-pointer'>Computer Science & Engineering</span>,
              Begum Rokeya University, Rangpur. The Department of Computer Science and Engineering was
              established on 12 October, 2008. It is one of the founding department among six, Begum Rokeya University,
              Rangpur started its journey with. Since the beginning of its establishment, the department has been able to
              attract the very best students who secure topmost merit positions in the undergraduate admission test every year.
              In the last eight years, CSE, BRUR prepared some talented graduates and they
              are playing important role both in the academic sector and industry. The department is conducting
              its activities with the motto to prepare future technology leaders and innovators of the country as well as
              throughout the globe in the domain of Computer Science and Engineering.
            </p>

          </div>
        </div>
      </div>

      <h2 className='dark:text-white text-4xl text-center font-cursive'>Notices</h2>
      {loading ? (<Loader />) : (<Fragment><div className='px-3 mb-2'>
        <div className='row'>
          {notices && <>
            <div className='w-full hidden lg:block lg:w-1/5 bg-black  items-center '>
              <div className='h-full flex items-center'>
                <img src={cseLogo} alt="cse logo" />
              </div>
            </div>
            <div className='xl:w-4/5 lg:w-4/5 w-full pl-2'>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className=" h-16 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Publish Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        PDF
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices &&
                      notices.map((element) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >{element.date.substring(0, 10)}
                          </th>
                          <td className="px-6 py-4">{element.title}</td>
                          <td className="px-6 py-4"><Link to={element.file.url}><BsFillFileEarmarkPdfFill size={"2rem"} color="" /></Link></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div></>}
        </div>
      </div></Fragment>)}

      <div className='bg-gray-50 dark:bg-gray-900 mt-2'>
        <h1 className='text-center font-cursive text-gray-700 dark:text-gray-300 border-b-2 text-4xl py-2'>Achivments</h1>
        <Carousel responsive={responsive} infinite={true} autoPlay={true} pauseOnHover={true} arrows={false}>
          <div className='px-1'> <img src={achivment_1} alt="Achivment-1" /></div>
          <div className='px-1'> <img src={achivment_2} alt="Achivment-1" /></div>
          <div className='px-1'> <img src={achivment_3} alt="Achivment-1" /></div>
          <div className='px-1'> <img src={achivment_4} alt="Achivment-1" /></div>
          <div className='px-1'> <img src={achivment_5} alt="Achivment-1" /></div>
          <div className='px-1'> <img src={achivment_6} alt="Achivment-1" /></div>
          <div className='px-1'> <img src={achivment_7} alt="Achivment-1" /></div>
        </Carousel>
      </div>

    </>
  )
}

export default HomePage