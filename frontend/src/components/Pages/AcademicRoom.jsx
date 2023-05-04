import React, { Fragment } from 'react'
import { classroom_1, classroom_2, classroom_3, classroom_4 } from '../../logo'
import MetaData from "../Layout/MetaData";

const AcademicRoom = () => {
    return (
        <Fragment>
           <MetaData title="Class Room"/>
           <div className='px-3'>
                <h2 className='font-cursive text-4xl text-center mb-2 border-b-2 dark:text-gray-300'>Academic Class Room</h2>

                <p className='text-xl text-gray-700 dark:text-gray-300 mb-2'>The Department has 4 class rooms, 4 semantic lab rooms and Virtual Class (V.C) room.</p>
                <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className='relative'>
                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Class room-1</h2>
                        <img class="h-auto max-w-full rounded-lg" src={classroom_1} alt="" />
                    </div>
                    <div className='relative'>
                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Class room-1</h2>
                        <img class="h-auto max-w-full rounded-lg" src={classroom_2} alt="" />
                    </div>
                    <div className='relative'>
                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Class room-1</h2>
                        <img class="h-auto max-w-full rounded-lg" src={classroom_3} alt="" />
                    </div>
                    <div className='relative'>
                        <h2 className='absolute top-0 left-0 p-2 font-semibold uppercase'>Class room-1</h2>
                        <img class="h-auto max-w-full rounded-lg" src={classroom_4} alt="" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AcademicRoom