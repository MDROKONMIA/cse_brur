import React, { Fragment } from 'react';
import "./ProductCard.css";


const TeachersCard = ({ data }) => {
    return (
        <Fragment>
                <div className="ProductCardContainer text-dark">
                    <img className='cardImage' src={data.img || data.avatar.url} alt='' />
                    <div className='ProductInfo text-black dark:text-gray-500'>
                        <h1 className='text-black dark:text-white'>{data.name}</h1>
                        <p className='text-sm text-left p-0'>{data.dagignation}</p>
                        <p className='text-sm text-left p-0'>{data.phone}</p>
                        <p className='text-sm text-left p-0'>
                            <a href={`mailto:${data.email}`} title="For send email... Click on it">{data.email}</a>
                        </p>
                    </div>
                </div>

        </Fragment>
    )
}

export default Object.assign(TeachersCard, {});
