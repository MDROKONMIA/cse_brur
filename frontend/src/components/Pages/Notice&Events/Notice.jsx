import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layout/loader/Loader';
import { Link, useParams } from 'react-router-dom';
import { cseLogo } from '../../../logo';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';
import { clearErrors, getAllNotice } from '../../../actions/noticeAction';
import MetaData from '../../Layout/MetaData';
// import Pagination from 'react-js-pagination';
import { Pagination } from 'flowbite-react';




const Notice = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  // const { data, error, loading, success } = useSelector(state => state.notice)
  const { error, notices, loading, resultPerPage, noticesCount, filteredNoticesCount } = useSelector((state) => state.allNotices);

  const onPageChange = (e) => {
    console.log(e);
    setCurrentPage(e);
  };
  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAllNotice(keyword, currentPage))
  }, [dispatch, error, currentPage, keyword])
  let count = filteredNoticesCount;
  return (
    <Fragment>
      <MetaData title={"Notice"} />
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
                {resultPerPage < count && (
                  <div className="text-center mb-2">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.round(noticesCount/resultPerPage)}
                      onPageChange={onPageChange}
                    />
                  </div>
                )}
              </div>
            </div></>}
        </div>
      </div></Fragment>)}
    </Fragment>
  )
}

export default Notice