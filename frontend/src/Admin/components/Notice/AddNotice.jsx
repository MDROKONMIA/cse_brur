
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNotice, clearErrors } from "../../../actions/noticeAction";

function AddNotice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [file, setFile] = useState();
  const { error, success, message } = useSelector(state => state.addNewNotice);
  console.log(message, error, success)
  const fileHandler = (e) => {
    if (e.target.name === "file") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFile(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('file', file);
    // console.log(file);

    dispatch(addNotice(myForm));

  };

  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(clearErrors())
    }
    if (success) {
      toast(message);
      navigate("/admin/all-notices");
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, success, message, error]);

  return (
    <>
      <div className="text-black text-center text-3xl mb-2 border-b-2 dark:text-white uppercase ">
        Add Notice
      </div>
      <form
        className="w-full"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" className="text-lg" />
            </div>
            <TextInput
              id="title"
              type="text"
              sizing="md"
              placeholder="Enter the notice title ...."
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file" value="File" className="text-lg" />
            </div>
            <FileInput id="file" name="file" required onChange={fileHandler} />
            {/* <FileInput id="file" name="file" required onChange={e=>setFile(e.target.files[0])} /> */}
          </div>
        </div>

        <div className="flex justify-between w-full">
          <Button
            type="submit"
            gradientMonochrome={"success"}
            className="w-full"
          >
            Publish Notice
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddNotice;
