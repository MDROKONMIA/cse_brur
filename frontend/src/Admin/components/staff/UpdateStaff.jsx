import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  clearErrors, getStaffDetails, updateStaff } from "../../../actions/staffAction";
import FormInput from "../FormInput";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { STAFF_UPDATE_RESET } from "../../../constants/staffContants";
import { Button } from "flowbite-react";

function UpdateStaff() {
  const { staffId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, staff } = useSelector((state) => state.staffDetails);
  const { isUpdated, error: updateError, message } = useSelector((state) => state.updateOrDeleteStaff);
  // console.log(staff);


  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [phone, setPhone] = useState("");
  const [dagignation, setDagignation] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [status, setStatus] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("dagignation", dagignation);
    myForm.set("address", address);
    myForm.set("status", status);
    myForm.set("join_date", joinDate);
    myForm.append("avatar", avatar);

    dispatch(updateStaff(staffId, myForm));
  };

  // console.log(teacher._id!==id)
  useEffect(() => {
    if (staff && staff._id !== staffId) {
      dispatch(getStaffDetails(staffId))
    } else {
      setName(staff.name);
      setEmail(staff.email)
      setAvatarPreview(staff.avatar.url);
      setAddress(staff.address);
      setJoinDate(staff.join_date);
      setDagignation(staff.dagignation);
      setStatus(staff.status);
      setPhone(staff.phone);
      // setAvatar(teacher.avatar.url);
    }
    if (error) {
      toast(error)
      dispatch(clearErrors());
    }
    if (updateError) {
      toast(updateError)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      toast(message)
      navigate('/admin/all-staffs')
      dispatch({ type: STAFF_UPDATE_RESET })
    }

  }, [dispatch, error, isUpdated, message, navigate, updateError, staffId, staff]);



  const createImagesChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="text-black text-center text-3xl mb-2 border-b-2 dark:text-white ">Edit Staff  Information</div>
      <form className="w-full" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">

          <FormInput id="1"
            name="name"
            type="text"
            minlength={3}
            maxlength={30}
            value={name}
            placeholder="Enter Name"
            errorMessage=
            "Username should be 3-20 characters and shouldn't include any special character!"
            label="Name"
            pattern="{3,20}$"
            required={true}
            onChange={e => setName(e.target.value)} />

          <FormInput id="2"
            name="email"
            value={email}
            type="email"
            placeholder="Email"
            errorMessage="It should be a valid email address!"
            label="Email"
            required={true}
            onChange={e => setEmail(e.target.value)} />
          <FormInput
            id="3"
            name="joinDate"
            label="Join Date"
            value={joinDate.substring(0, 10)}
            type="date"
            placeholder="Join Date"
            onChange={e => setJoinDate(e.target.value)} required={true} />

          <div>
            <label
              htmlFor="dagignation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Dagignation
            </label>
            <select
              id="dagignation"
              name="dagignation"
              className={inputClass}
              onChange={e => setDagignation(e.target.value)}
              value={dagignation}
            >
              <option selected>Select Satus</option>
              <option value="M.L.S.S">M.L.S.S</option>
              <option value="Lab Attendent (Higher scale)">Lab Attendent (Higher scale)</option>
              <option value="Lab Assistant">Lab Assistant</option>
              <option value="Seminer Assistant">Seminer Assistant</option>
              <option value="Seminer Attendent">Seminer Attendent</option>
              <option value="Sr. Oficce assistant computer operator">
                Sr. Oficce assistant computer operator
              </option>
              <option value="Oficce assistant computer operator">
                Sr. Oficce assistant computer operator
              </option>
            </select>
          </div>

          <div>
            <label

              htmlFor="default"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <select id="default" name="status" className={inputClass} onChange={e => setStatus(e.target.value)} value={status}>
              <option selected>Select Satus</option>
              <option value="0">On Study Leave</option>
              <option value="1">On Duty</option>
            </select>
          </div>

          <FormInput id="6"
            name="phone"
            placeholder="Enter the 11 digit phone number"
            label="Phone"
            value={phone}
            errorMessage="Phone number must be 11 digit with start"
            pattern="^\+?(88)?0?1[3456789][0-9]{8}"
            onChange={e => setPhone(e.target.value)} required={true} />
          <FormInput id="4"
            name="avatar"
            type="file"
            className={`block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0
            file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400`}
            accept='image/*.jpg'
            preview={true}
            avatarPreview={avatarPreview}
            label="Avatar"
            onChange={createImagesChange} />
          <FormInput id={5}
            name="address"
            type="textarea"
            label="Address"
            required={true}
            errorMessage="Must be select field..."
            onChange={e => setAddress(e.target.value)}
            value={address} />
        </div>

        <div className="flex justify-between">
          <Button
            type="submit"
            gradientMonochrome={"success"}
            className="w-full"
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
}

export default UpdateStaff;
