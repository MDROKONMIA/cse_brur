import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewTeacher, clearErrors } from "../../../actions/allAction";
import FormInput from "../FormInput";

function AddTeacher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, message } = useSelector((state) => state.addNewTeacher);

  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [phone, setPhone] = useState("");
  const [dagignation, setDagignation] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [status, setStatus] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi");

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("dagignation", dagignation);
    myForm.set("address", address);
    myForm.set("status", status);
    myForm.set("join_date", joinDate);
    myForm.append("avatar", avatar);

    dispatch(addNewTeacher(myForm));
  };

  useEffect(() => {
    if (error) {
      toast(error)
      dispatch(clearErrors());
    }
    if (success) {
      toast(message)
      navigate("/admin/all-teachers");
      dispatch(clearErrors());
    }
  }, [error, dispatch, success, message, navigate]);


   return (
    <form className="w-full" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <FormInput id="1"
          name="name"
          type="text"
          minlength={3}
          maxlength={30}
          placeholder="Enter Name"
          errorMessage=
          "Username should be 3-20 characters and shouldn't include any special character!"
          label="Name"
          pattern="{3,20}$"
          required={true}
          onChange={(e) => setName(e.target.value)} />

        <FormInput id="2"
          name="email"
          type="email"
          placeholder="Email"
          errorMessage="It should be a valid email address!"
          label="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)} />

        <FormInput
          id="3"
          name="joinDate"
          label="Join Date"
          type="date"
          placeholder="Join Date"
          onChange={(e) => setJoinDate(e.target.value)} required={true} />


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
          >
            <option selected>Select Dagignation</option>
            <option value="Professor">Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Lecturer">Lecturer</option>
          </select>
        </div>


        <div>
          <label

            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <select id="default" name="status" className={inputClass} onChange={e => setStatus(e.target.value)}>
            <option selected>Select Satus</option>
            <option value="0">On Study Leave</option>
            <option value="1">On Duty</option>
          </select>
        </div>


        <FormInput id="6"
          name="phone"
          placeholder="Enter the 11 digit phone number"
          label="Phone"
          errorMessage="Phone number must be 11 digit with start"
          pattern="^\+?(88)?0?1[3456789][0-9]{8}"
          onChange={e => setPhone(e.target.value)} required={true} />
        <FormInput id="4"
          name="avatar"
          type="file"
          className={`block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0
            file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400`}
          required={true}
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
          onChange={e => setAddress(e.target.value)} />
      </div>

      <div className="flex justify-between">
        <Button
          type="submit"
          gradientMonochrome={"success"}
          className="w-full"
        >
          Add New Teacher
        </Button>
      </div>
    </form>
  );
}

export default AddTeacher;
