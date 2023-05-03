import React, { Fragment, useEffect,  useState } from 'react';
import "./UpdateProfile.css";
import {  FaceOutlined, EmailOutlined, } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../layout/loader/Loader";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

const UpadateProfile = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState();

    const updateProfileSubmit = (e) => { 
        e.preventDefault();

        const myForm = new FormData(); 
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            toast(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast("Profile Update successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, user])

    return (
      <Fragment>
        {loading ? <Loader/>:
                <Fragment>
                    <MetaData title={"Update profile"} />
                    <div className='updateProfileContainer'>
                        <div className="updateProfileBox">
                            <h2 className='updateProfileHeading'>Update Profile</h2>
                            < form className='updateProfileForm' encType="multipart/form-data" onSubmit={updateProfileSubmit} >
                                <div className='updateProfileName'>
                                    <FaceOutlined />
                                    <input type={"text"} placeholder="Enter your name" required name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>
                                <div className='updateProfileEmail'>
                                    <EmailOutlined />
                                    <input type={"eamail"} placeholder="Enter your email" required name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                                <div id='updateProfileImage'>
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type={"file"} placeholder="Enter your image" name='avatar' accept='image/*' onChange={updateProfileDataChange} />
                                </div>
                                <input type={"submit"} value="Update Profile" className='updateProfileBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>}
      </Fragment>
    )
}

export default UpadateProfile