import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import Loader from '../layout/loader/Loader'
import "./Profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    // console.log(user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={`${user.name}'s Profile -- Ecommerce`} />
                    <div className="profileContainer">
                        <div>
                            <h2>My Profile</h2>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined on</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>
                            <div>
                                <Link to={"/orders"}>My Oredrs</Link>
                                <Link to={"/password/update"}>Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Profile