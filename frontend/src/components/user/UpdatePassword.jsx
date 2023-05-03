import React, { Fragment, useEffect } from 'react';
import "./UpdatePassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Loader from "../layout/loader/Loader";
import { VpnKey, LockOpen, Lock } from '@mui/icons-material';
import MetaData from '../layout/MetaData';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_SUCCESS } from '../../constants/userConstants';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.profile); 
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('oldPassword', oldPassword);
        myForm.set('newPassword', newPassword);
        myForm.set('confirmPassword', confirmPassword);

        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast("Password change successfully");
            navigate('/account')
            dispatch({ type: UPDATE_PASSWORD_SUCCESS })
        }
    }, [dispatch, error, isUpdated, navigate])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={"Update Password"} />
                    <div className='updateProfileContainer'>
                        <div className="updateProfileBox">
                            <h2 className='updateProfileHeading'>Update Password</h2>
                            < form className='updateProfileForm' encType="multipart/form-data" onSubmit={updatePasswordSubmit} >
                                <div className='loginPassword'>
                                    <VpnKey />
                                    <input name='oldPassword' type="password" placeholder='Enter your old password' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className='loginPassword'>
                                    <LockOpen />
                                    <input name='newPassword' type="password" placeholder='Enter your new password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className='loginPassword'>
                                    <Lock />
                                    <input name='confirmPassword' type="password" placeholder='Enter your confirm password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type={"submit"} value="Change" className='updateProfileBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default UpdatePassword