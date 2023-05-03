import React, { Fragment } from 'react'
import { cseLogo } from '../../logo'
import MetaData from '../Layout/MetaData';

export const Vision = () => {
    return (
        <Fragment>
            <MetaData title="Mission & Vission" />
            <div className='w-full p-3'>
                <div className='lg:flex mb-2'>
                    <div className='w-full hidden lg:block lg:w-1/5 bg-black  items-center '>
                        <div className='h-full flex items-center'>
                            <img src={cseLogo} alt="cse logo" />
                        </div>
                    </div>
                    <div className='w-full lg:w-4/5'>
                        <div className='w-full border-l-gray-700 border-l-2'>
                            <div className='pl-2 '>
                                <p className="text-4xl text-center font-cursive border-b-2 mb-2">Vison</p>
                                <h2 className='text-lg font-semibold mb-2 dark:text-gray-300'>The vision of the university is to create skilled manpower by standard education and research to lead the nation at present and future in different fields of humanity.</h2>

                                <ul className="space-y-1 text-gray-800 list-disc list-inside dark:text-gray-400">
                                    <li >Develop adequate infrastructure facilities to enable smooth running of academic actives through ensuring quality.</li>
                                    <li>
                                        Accommodate as much as 8250 students by the year 2023-2024.
                                    </li>
                                    <li>
                                        Increase the number of departments to 33
                                    </li>
                                    <li>
                                        Produce competent teacher and researchers in respective subjects taught in the university.
                                    </li>
                                    <li>
                                        Publish standard journals, books, periodicals and circulate them to different universities and other relevant agencies.
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className='w-full  border-l-gray-700 border-l-2'>
                            <div className='pl-2 '>
                                <p className="text-4xl text-center font-cursive border-b-2 mb-2">Mission</p>
                                <h2 className='text-lg font-semibold mb-2 dark:text-gray-300'>Begum Rokeya University is established to cope and gain equality with the advanced world in various fields of higher education and with a view to creating and extending opportunities of higher education, research and study in national level.
                                    This university will be a center of excellence for acquiring & disseminating knowledge.</h2>

                                <ul className="space-y-1 text-gray-800 list-disc list-inside dark:text-gray-400">
                                    <li >Impart need oriented and mordent technology based education.</li>
                                    <li>
                                        To attain educational excellence in the faculties and disseminate knowledge acquired in respective fields
                                    </li>
                                    <li>
                                        Undertake fundamental and applied research in the relevant field of human knowledge.
                                    </li>
                                    <li>
                                        Setup academic museum, laboratories and research centers for promotion of teaching, training and extension of research.
                                    </li>
                                    <li>
                                        Arrange seminars, conferences, workshops and training for teachers and staff
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
