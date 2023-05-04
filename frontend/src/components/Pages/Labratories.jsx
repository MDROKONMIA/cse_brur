import React, { Fragment } from 'react'
import { cseLogo, lab_1, lab_2, lab_3, lab_4 } from '../../logo';
import MetaData from "../Layout/MetaData";

const Labratories = () => {
    return (
        <Fragment>
            <MetaData title={"Lab"} />
            <div className='w-full p-3'>

                <div className='lg:flex mb-2'>
                    <div className='w-full hidden lg:block lg:w-1/5 bg-black  items-center '>
                        <div className='h-full flex items-center'>
                            <img src={cseLogo} alt="cse logo" />
                        </div>
                    </div>
                    <div className='w-full lg:w-4/5'>
                        <div className='w-full border-l-gray-700 border-l-2'>
                            <p className="text-4xl text-center font-cursive border-b-2">Hardware Lab</p>
                            <div className='pl-2 '>
                                <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2'>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Lab-1</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={lab_1} alt="" />
                                    </div>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Lab-1</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={lab_2} alt="" />
                                    </div>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Lab-1</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={lab_3} alt="" />
                                    </div>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Lab-1</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={lab_4} alt="" />
                                    </div>
                                </div>
                                <h2 className='text-lg font-bold dark:text-white'>Objectative:</h2>
                                <p className='text-justify  text-gray-800 dark:text-gray-300'>
                                    The main objective of the lab is to provide the students the knowledge of computer hardware, the processors, memories, motherboards, different add-on cards, and other peripherals like printers, plotters and the scanners.
                                    The students are trained for the assembly and disassembly of PCs.
                                    Another important objective is to impart knowledge about the troubleshooting and fault finding the computers and the peripherals.
                                </p>
                            </div>
                        </div>
                        <div className='w-full border-l-gray-700 border-l-2'>
                            <p className="text-4xl text-center font-cursive border-b-2">Software Lab</p>
                            <div className='pl-2 '>
                                <div className='grid grid-cols-4 gap-4 mt-2'>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Lab-1</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={lab_1} alt="" />
                                    </div>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Lab-1</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={lab_2} alt="" />
                                    </div>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Lab-1</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={lab_3} alt="" />
                                    </div>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Lab-1</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={lab_4} alt="" />
                                    </div>
                                </div>

                                <h2 className='text-lg font-bold dark:text-white'>Objectative:</h2>
                                <p className='text-justify  text-gray-800 dark:text-gray-300'>
                                    This laboratory is satisfying the need of experiments required, the laboratory also provides research facilities to help undergraduate students prepare
                                    their graduation projects and graduate students prepare their graduation theses.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Labratories;
