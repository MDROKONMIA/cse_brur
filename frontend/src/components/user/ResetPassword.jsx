import React, { Fragment, useEffect } from 'react';
import "./ResetPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Loader from "../Layout/loader/Loader";
import { IoIosUnlock, IoMdLock } from 'react-icons/io'
import MetaData from '../Layout/MetaData';
import { clearErrors, resetPassword, } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'; 

const ResetPassword = () => {
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { error, success, loading } = useSelector(state => state.forgotPassword);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('password', newPassword);
        myForm.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(params.token ,myForm));
    }

    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast("Password Updated successfully");
            navigate('/login') 
        }
    }, [dispatch, error, success, navigate])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={"Reset Password"} />
                    <div className='resetPasswordContainer'>
                        <div className="resetPasswordBox">
                            <h2 className='resetPasswordHeading'>Update Password</h2>
                            < form className='resetPasswordForm' encType="multipart/form-data" onSubmit={updatePasswordSubmit} >
                                <div className='loginPassword'>
                                    <IoIosUnlock />
                                    <input name='newPassword' type="password" placeholder='Enter your new password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className='loginPassword'>
                                    <IoMdLock />
                                    <input name='confirmPassword' type="password" placeholder='Enter your confirm password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type={"submit"} value="Update" className='resetPasswordBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default ResetPassword