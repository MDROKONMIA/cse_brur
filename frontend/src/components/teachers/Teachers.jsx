import React, { Fragment, useEffect, useState } from 'react'
// import { MizanSir, SobujSir, SonjoySir, AzadSir, ZasimUddinSir, FaridSir, MarjiaSultanaMam, ProdipSir, IliasPramanikSir } from '../../TeachersPhoto/TeacherchPhoto'
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllTeachers } from '../../actions/allAction';
import Loader from '../Layout/loader/Loader';
import TeacherCard from './TeacherCard';
import MetaData from '../Layout/MetaData';
import { Pagination } from 'flowbite-react';
import { useParams } from 'react-router-dom';

const Teachers = () => {
    // const data = [
    //     { name: "Prof.Dr. Abu Kalam Md. Farid Ul Islam", dagignation: "Professor  ", phone: "01712135849", email: "farid_ru@yahoo.com", img: FaridSir },
    //     { name: "Dr. Md. Mizanur Rahoma", dagignation: "Professor", phone: "01738240159", email: "mizan@brur.ac.bd", img: MizanSir },
    //     { name: "Dr. Md. Zasim Uddin", dagignation: "Associate Professor", phone: "+8801302947535", email: "zasim@brur.ac.bd", img: ZasimUddinSir },
    //     { name: "Dr. Md. Ileas Pramanik", dagignation: "Associate Professor", phone: "01762929641", email: "ileas@gmail.com", img: IliasPramanikSir },
    //     { name: "Prodip Kumar Sarkar", dagignation: "Associate Professor", phone: "01719865262", email: "prodip@brur.ac.bd", img: ProdipSir },
    //     { name: "Md. Shamsuzzaman", dagignation: "Assistant Professor", phone: "+8801717467709", email: "szaman_409@yahoo.com", img: SobujSir },
    //     {
    //         name: "Md. Abul Kalam Azad (On Study Leave)", dagignation: "Assistant Professor", phone: "+8801710504692", email: "akazadth@gmail.com", img: AzadSir
    //     },
    //     { name: "Sanjoy Kumar Saha (On Study Leave)", dagignation: "Assistant Professor", phone: "+8801915139510", email: "sanjoy@brur.ac.bd", img: SonjoySir },
    //     { name: "Marzia Sultana", dagignation: "Lecturer", phone: "+8801763676302", email: "marjia.brur.cse@gmail.com", img: MarjiaSultanaMam },
    // ]
    const dispatch = useDispatch();
    const keyword = useParams().keyword;

    const { error, teachers, loading, teachersCount, resultPerPage } = useSelector(state => state.teachers);

    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (e) => { setCurrentPage(e); }


    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
        dispatch(getAllTeachers(keyword, currentPage));
    }, [error, dispatch, currentPage, keyword])
    return (
        <Fragment>

            <MetaData title={"Teacher"} />
            {loading === true && !teachers ? (<Loader />) : (<Fragment>
                <div className='px-3  items-center justify-center mt-10'>
                    <h1 className='text-6xl text-center mb-2 border-b-2 border-black dark:text-gray-300'>Teachers</h1>
                    <div className='flex flex-wrap items-center m-auto justify-center'>
                        {teachers ? teachers.map(el => (<TeacherCard data={el} />)) : ""}
                    </div>

                </div>

            </Fragment>)}

            {resultPerPage < teachersCount && (
                <div className="text-center mb-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(teachersCount/resultPerPage)}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </Fragment>
    )
}

export default Teachers