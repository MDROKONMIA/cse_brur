import React, { Fragment, useEffect, useRef, useState } from 'react';
import "./LoginSignUp.css";
// import { MailOutlineOutlined, LockOpen, FaceOutlined, EmailOutlined, } from "@mui/icons-material";
import { AiOutlineMail } from 'react-icons/ai';
import { IoIosUnlock } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Layout/loader/Loader";
import { Avatar } from 'flowbite-react';


const LoginSignUp = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector(state => state.user);
    // console.log(`Login page----Is auth: ${isAuthenticated}`);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const swictherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(null);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }
    const { name, email, password } = user;
    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.append("avatar", avatar);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            swictherTab.current.classList.add("shiftToNeutral");
            swictherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            swictherTab.current.classList.add("shiftToRight");
            swictherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }


    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, isAuthenticated, navigate, redirect])
    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className='LoginSignUpContainer'>
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signup_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={swictherTab}></button>
                        </div>

                        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                            <div className='loginEmail'>
                                <AiOutlineMail />
                                <input
                                    type="email" placeholder='Enter your email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                                <IoIosUnlock />
                                <input
                                    type="password" placeholder='Enter your password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot"> Forgot Password</Link>
                            <input type={"submit"} value={"Login"} className="loginBtn" />
                        </form>

                        {/* Register FORM */}
                        < form className='signUpForm' ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit} >
                            <div className='signUpName'>
                                <FaRegUserCircle />
                                <input type={"text"} placeholder="Enter your name" required name='name' value={name} onChange={registerDataChange} />
                            </div>
                            <div className='signUpEmail'>
                                <AiOutlineMail />
                                <input type={"eamail"} placeholder="Enter your email" required name='email' value={email} onChange={registerDataChange} />
                            </div>
                            <div className='signUpPassword'>
                                <IoIosUnlock />
                                <input type={"password"} placeholder="Enter your password" required name='password' value={password} onChange={registerDataChange} />
                            </div>
                            <div id='registerImage'>
                                <Avatar img={avatarPreview} rounded />
                                <input type={"file"} placeholder="Enter your image" required name='avatar' accept='image/*' onChange={registerDataChange} />
                            </div>
                            <input type={"submit"} value="Register" className='signUpBtn' />
                        </form>


                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default LoginSignUp

