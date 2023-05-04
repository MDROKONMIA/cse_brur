import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../Layout/loader/Loader';
// import officestaffphoto from '../../OfiiceStaffsPhoto';
import TeacherCard from './TeacherCard';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllStaffs } from '../../actions/staffAction';
import MetaData from "../Layout/MetaData";
import { useParams } from 'react-router-dom';
import { Pagination } from 'flowbite-react';

const OfficeStaffs = () => {
  const loading = false;
  const dispatch = useDispatch();
  const keyword = useParams().keyword;

  // const data = [
  //   { name: "Most. Khadiza Aktar Bohni", dagignation: "Sr. Office Assistant cum Computer Operator", phone: "01722-304283", email: "sample@gmail.com", img: officestaffphoto },
  //   { name: "Md. Abu Taher Mondol", dagignation: "Seminar Assistant", phone: "01718613094", email: "sample@gmail.com", img: officestaffphoto },
  //   { name: "Md. Saju Mia", dagignation: "Seminar Attendent (Higher Skell)", phone: "01718938159", email: "sample@gmail.com", img: officestaffphoto },
  //   { name: "Md. Mohiul Islam", dagignation: "Lab Attendent (Higher Skell)", phone: "01722820518", email: "sample@gmail.com", img: officestaffphoto },
  //   { name: "Azmeri Aktar Shibli", dagignation: "Lab Attendent (Higher Skell)", phone: "01723673287", email: "sample@gmail.com", img: officestaffphoto },
  //   { name: "Md. Sajedul Islam", dagignation: "Lab Attendent (Higher Skell)", phone: "01718410368", email: "sample@gmail.com", img: officestaffphoto },
  //   { name: "Most. Hena Khatun", dagignation: "Lab Attendent (Higher Skell)", phone: "01792761031", email: "sample@gmail.com", img: officestaffphoto },
  //   { name: "Md. Ershad Mia", dagignation: "M.L.S.S", phone: "01751404156", email: "sample@gmail.com", img: officestaffphoto },
  //   { name: "Md. Golap mia", dagignation: "M.L.S.S", phone: "01761193974", email: "sample@gmail.com", img: officestaffphoto },

  // ]
  const { error, staffs, staffsCount, resultPerPage } = useSelector(state => state.staffs);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (e) => { setCurrentPage(e); }

  useEffect(() => {
    if (error) {
        dispatch(clearErrors());
    }
    dispatch(getAllStaffs(keyword, currentPage));
}, [error, dispatch, keyword, currentPage])
  return (
    <Fragment>
      <MetaData title={"Staff"}/>
      {loading === true && !staffs ? (<Loader />) : (<Fragment>
        <div className='p-3  items-center justify-center mt-10'>
          <h1 className='text-6xl text-center mb-2 border-b-2 border-black '>Office Staffs</h1>
          <div className='flex flex-wrap items-center m-auto justify-center'>
            {staffs ? staffs.map(el => (<TeacherCard data={el} />)) : ""}
          </div>

        </div></Fragment>)}
      
        {resultPerPage < staffsCount && (
          <div className="text-center mb-2">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(staffsCount / resultPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        )}
    </Fragment>
  )

}

export default OfficeStaffs