import React, { Fragment } from 'react'
import { cseLogo, vcroom } from '../../logo'
import MetaData from "../Layout/MetaData";

const VirtualClassRoom = () => {
    return (
        <Fragment>
            <MetaData title={"VC room"}/>
            <div className='w-full p-3'>

                <div className='lg:flex mb-2'>
                    <div className='w-full hidden lg:block lg:w-1/5 bg-black  items-center '>
                        <div className='h-full flex items-center'>
                            <img src={cseLogo} alt="cse logo" />
                        </div>
                    </div>
                    <div className='w-full lg:w-4/5'>
                        <div className='w-full border-l-gray-700 border-l-2'>
                            <p className="text-4xl text-center font-cursive border-b-2">Virtual Class Room</p>
                            <div className='pl-2 '>
                                <div className='grid grid-cols-4 gap-4 mt-2'>
                                    <div className='relative'>
                                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Virtual Class Room</h2>
                                        <img class="h-auto max-w-full rounded-lg" src={vcroom} alt="" />
                                    </div>
                                </div>
                                <h2 className='text-lg font-bold'>Objectative:</h2>
                                <p className='text-justify  text-gray-800 dark:text-gray-300'>
                                    Virtual lab is defined as a virtual teaching and learning environment aimed at developing students laboratory skills.
                                    They are one of the most important e-learning tools. They are located on the Internet, where thestudent can conduct many experiments
                                    without any constraints to place or time, in contrast to the constraints of real labs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default VirtualClassRoom