import React, { Fragment, useEffect, useState } from 'react';
import "./ForgotPassword.css";
// import { EmailOutlined, } from "@mui/icons-material"; 
import { AiOutlineMail } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Layout/loader/Loader";
import MetaData from '../Layout/MetaData';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { error, message, loading } = useSelector(state => state.forgotPassword);

    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        console.log(email)
        dispatch(forgotPassword(myForm));

    }

    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast(message);
        }

    }, [dispatch, error, message])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={"Forgot Password"} />
                    <div className='forgotPasswordContainer'>
                        <div className="forgotPasswordBox">
                            <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                            <form className='forgotPasswordForm' onSubmit={forgotPasswordSubmit} >
                                <div className='forgotPasswordEmail'>
                                    <AiOutlineMail />
                                    <input type={"email"} placeholder="Enter your email" required name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <input type={"submit"} value="Send" className='forgotPasswordBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default ForgotPassword