import React, { Fragment } from 'react';
import "./ProductCard.css";
import { Link } from 'react-router-dom';


const TeachersCard = ({ data }) => {
    // const {data}=props




    return (
        <Fragment>
            <Link>
                <div className="ProductCardContainer text-dark">
                    <img className='cardImage' src={data.img || data.avatar.url} alt="roto" />
                    <div className='ProductInfo text-black dark:text-gray-500'>
                        <h1 className='text-black dark:text-white'>{data.name}</h1>
                        <p className='text-sm text-left p-0'>{data.dagignation}</p>
                        <p className='text-sm text-left p-0'>{data.phone}</p>
                        <p className='text-sm text-left p-0'>
                            <Link to={`/email/${data.email}`} title="For send email... Click on it">{data.email}</Link>
                        </p>
                    </div>
                </div>

            </Link>

        </Fragment>
    )
}

export default Object.assign(TeachersCard, {});
